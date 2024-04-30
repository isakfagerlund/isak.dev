import { tickets } from "~/server/db/schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { FrostCard } from "./FrostCard";

export default async function BrunchPage() {
  const visitors = await db.query.tickets.findFirst({
    where: eq(tickets.id, 1),
  });

  return <FrostCard visitors={visitors?.visitors} />;
}
