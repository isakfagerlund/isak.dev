import Link from "next/link";
import { BurgerIcon } from "./_components/BurgerIcon";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
      <div className="container flex flex-col items-center justify-center gap-2 px-4 py-16 ">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Isak Fagerlund
        </h1>
        <p className="tracking-tight text-slate-500">Software engineer</p>
      </div>
      <div className="absolute bottom-3 right-3 ">
        <Link href="/burgers" className="flex items-center gap-2">
          <p className="text-xs text-slate-500">Burgers</p>
          <BurgerIcon color />
        </Link>
      </div>
    </main>
  );
}
