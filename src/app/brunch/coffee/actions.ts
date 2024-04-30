"use server";

import { db } from "~/server/db";
import { orders } from "~/server/db/schema";

export default async function submitOrder(values: {
  name: string;
  order: string;
  milk: string;
}) {
  try {
    await db
      .insert(orders)
      .values({ name: values.name, order: `${values.milk} - ${values.order}` });
  } catch (error) {
    throw new Error("Submiting order did not work");
  }
}
