import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Spearhead — Your AI Marketing Team",
    template: "%s — Spearhead",
  },
  description:
    "Spearhead turns marketing data into actionable strategies and executes campaigns with one intelligent platform.",
  openGraph: {
    title: "Spearhead — Your AI Marketing Team",
    description:
      "Turn marketing data into actionable strategies and execute campaigns with one intelligent platform.",
    type: "website",
    siteName: "Spearhead",
  },
};

export const viewport: Viewport = {
  themeColor: "#090b09",
};

/* Applies the persisted theme before first paint to prevent a flash
   of the wrong theme (§10). Default theme is dark. */
const themeInit = `(function(){try{var t=localStorage.getItem("spearhead-theme");if(t==="light"){document.documentElement.classList.add("light")}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
