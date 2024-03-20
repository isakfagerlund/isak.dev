import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link href="/burgers">
        <h1 className="py-6">Isak&apos;s Burgers</h1>
      </Link>
      {children}
    </>
  );
}
