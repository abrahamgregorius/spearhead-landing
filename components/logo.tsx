import Link from "next/link";

/* Spearhead brand mark — a lime spearhead symbol + wordmark. */
export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M12 2 21 21l-9-5-9 5L12 2z" fill="#A3E635" />
      <path d="M12 2 21 21l-9-5V2z" fill="#84CC16" />
    </svg>
  );
}

export function Logo({
  wordmark = "spearhead",
  size = 22,
  className = "",
}: {
  wordmark?: string | null;
  size?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={size} />
      {wordmark !== null && (
        <span className="text-[15px] font-semibold tracking-[-0.01em]">
          {wordmark}
        </span>
      )}
    </span>
  );
}

/* Wordmark as a link back to the top of the page. */
export function LogoLink({
  wordmark = "spearhead",
  size = 22,
  className = "",
  href = "#hero",
}: {
  wordmark?: string | null;
  size?: number;
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Spearhead — back to top"
      className={`inline-flex items-center transition-opacity hover:opacity-80 ${className}`}
    >
      <Logo wordmark={wordmark} size={size} />
    </Link>
  );
}
