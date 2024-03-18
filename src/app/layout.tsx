import "~/styles/globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "isak.dev",
  description: "Isak Fagerlund - Software Engineer",
  icons: [{ rel: "icon", url: "/sparkles.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          footer: "hidden",
        },
      }}
    >
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <main className="container m-auto">
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </main>
        </body>
        <SpeedInsights />
        <Analytics />
      </html>
    </ClerkProvider>
  );
}
