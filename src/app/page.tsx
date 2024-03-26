import Link from "next/link";
import { BurgerIcon } from "./_components/BurgerIcon";
import { Coffee } from "lucide-react";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
      <div className="container flex flex-col items-center justify-center gap-2 px-4 py-16 ">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Isak Fagerlund
        </h1>
        <p className="tracking-tight text-slate-500">Developer</p>
      </div>
      <div className="absolute bottom-3 right-3 ">
        <Link href="/burgers" className="flex items-center gap-2">
          <p className="text-xs text-slate-500">Burgers</p>
          <BurgerIcon color />
        </Link>
      </div>

      <div className="absolute bottom-3 left-3 ">
        <Link href="/cafes" className="flex items-center gap-2">
          <Coffee strokeWidth={1} color="#64748b" size={18} />
          <p className="text-xs text-slate-500">Cafes</p>
        </Link>
      </div>
    </main>
  );
}
