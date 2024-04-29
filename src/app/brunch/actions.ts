"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { tickets } from "~/server/db/schema";

export async function increaseTicket() {
  await db
    .update(tickets)
    .set({
      visitors: sql`${tickets.visitors} + 1`,
    })
    .where(eq(tickets.id, 1));

  revalidatePath("/brunch");
}
