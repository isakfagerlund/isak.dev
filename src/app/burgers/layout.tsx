import Link from "next/link";
import { type Metadata } from "next/types";

export const metadata = {
  title: "isak.dev - burgers",
  description: "Isak Fagerlund - Favorite Burgers",
  icons: [{ rel: "icon", url: "/sparkles.svg" }],
} satisfies Metadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link href="/burgers">
        <h1 className="pt-6 text-xl lowercase">
          Isak&apos;s Burger recommendations
        </h1>
      </Link>
      <p className="pb-6 font-light lowercase text-slate-500">
        These are all my biased opinions based on nothing more than taste, vibes
        and experience. 
      </p>
      {children}
    </>
  );
}
