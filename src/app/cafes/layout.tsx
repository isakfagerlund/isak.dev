import Link from "next/link";

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
