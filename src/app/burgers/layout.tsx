import Link from "next/link";
import { type Metadata } from "next/types";

export const metadata = {
  title: "isak.dev - burgers",
  description: "Isak Fagerlund - Favorite Burgers",
  icons: [{ rel: "icon", url: "/sparkles.svg" }],
} satisfies Metadata;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link href="/burgers">
        <h1 className="pt-6 text-xl lowercase">
          Isak&apos;s Burger recommendations
        </h1>
      </Link>
      {children}
    </>
  );
}
