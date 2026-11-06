import { NextRequest } from "next/server";

/* §8.2/§8.3 — Waitlist API.
   Server-side validation, basic spam protection, rate limiting, and
   Supabase persistence. If Supabase credentials are not configured the
   route responds 503 `not_configured` and never fakes success —
   see .env.example and README for the required configuration. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ALLOWED_ATTRIBUTION = new Set([
  "performance_analytics",
  "ai_strategy",
  "campaign_execution",
  "hero",
  "general",
]);

/* Basic in-memory rate limit: 5 submissions per 15 minutes per IP. */
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    hits.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  hits.set(ip, timestamps);
  /* occasional cleanup */
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t > RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  /* spam protection: honeypot + minimum interaction time.
     Both return an OK-looking response so bots learn nothing. */
  const honeypot = typeof body.honeypot === "string" ? body.honeypot.trim() : "";
  if (honeypot !== "") {
    return json({ ok: true }, 200);
  }
  const elapsedMs = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if (elapsedMs > 0 && elapsedMs < 1500) {
    return json({ ok: true }, 200);
  }

  if (rateLimited(clientIp(request))) {
    return json({ error: "rate_limited" }, 429);
  }

  /* server-side validation (§8.2) */
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email) {
    return json({ error: "empty_email" }, 422);
  }
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return json({ error: "invalid_email" }, 422);
  }

  /* attribution (§8.3) — whitelisted values only */
  const useCaseSource =
    typeof body.use_case_source === "string" &&
    ALLOWED_ATTRIBUTION.has(body.use_case_source)
      ? body.use_case_source
      : "general";
  const signupSource =
    typeof body.signup_source === "string" &&
    ALLOWED_ATTRIBUTION.has(body.signup_source)
      ? body.signup_source
      : "general";

  /* persistence — Supabase REST (§8.3). The service_role key is preferred;
     the public anon key also works when the table's RLS grants an
     insert-only policy (see README "Waitlist database setup"). */
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      "[waitlist] SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY) are not configured. Submissions are " +
        "rejected until the backend is connected — see README.",
    );
    return json({ error: "not_configured" }, 503);
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email,
        use_case_source: useCaseSource,
        signup_source: signupSource,
      }),
    });

    if (response.ok) {
      return json({ ok: true }, 200);
    }

    /* unique violation → duplicate email (§8.2) */
    if (response.status === 409) {
      return json({ error: "duplicate" }, 409);
    }

    let detail = "";
    try {
      const payload = await response.json();
      detail =
        typeof payload?.message === "string" ? payload.message : JSON.stringify(payload);
      if (detail.includes("23505")) {
        return json({ error: "duplicate" }, 409);
      }
    } catch {
      /* non-JSON error body */
    }
    console.error("[waitlist] Supabase insert failed:", response.status, detail);
    return json({ error: "server_error" }, 502);
  } catch (error) {
    console.error("[waitlist] Supabase request failed:", error);
    return json({ error: "server_error" }, 502);
  }
}
