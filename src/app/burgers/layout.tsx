import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link href="/burgers">
        <h1 className="py-6 lowercase">Isak&apos;s Burger recommendations</h1>
      </Link>
      {children}
    </>
  );
}
