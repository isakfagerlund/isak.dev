import "~/styles/globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { type Metadata } from "next";
import { Toaster } from "./_components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "isak.dev",
  description: "Isak Fagerlund - Software Engineer",
  icons: [{ rel: "icon", url: "/sparkles.svg" }],
} satisfies Metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <main className="container m-auto h-dvh">
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </main>
        <Toaster
          toastOptions={{ className: "frost-effect text-white border-none" }}
          theme="light"
        />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
