import Image from "next/image";

import { tickets } from "~/server/db/schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { FrostCard } from "./FrostCard";

export default async function BrunchPage() {
  const visitors = await db.query.tickets.findFirst({
    where: eq(tickets.id, 1),
  });

  return (
    <main className="flex h-dvh items-center justify-center text-white sm:p-7">
      <Image
        src="/brunch-bg.jpg"
        alt="bg image"
        width={1280}
        height={832}
        className="bg-img absolute left-0 top-0 h-dvh w-full select-none object-cover"
      />
      <FrostCard visitors={visitors?.visitors} />
    </main>
  );
}
