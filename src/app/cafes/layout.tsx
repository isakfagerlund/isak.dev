import Link from "next/link";
import { type Metadata } from "next/types";

export const metadata = {
  title: "isak.dev - cafes",
  description: "Isak Fagerlund - Cafe recommendations",
  icons: [{ rel: "icon", url: "/sparkles.svg" }],
} satisfies Metadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link href="/cafes">
        <h1 className="pt-6 text-xl lowercase">Isak&apos;s cafe list</h1>
      </Link>
      {children}
    </>
  );
}
