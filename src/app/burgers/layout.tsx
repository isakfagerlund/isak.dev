import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
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
