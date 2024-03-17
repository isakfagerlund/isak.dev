// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { blob, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `isak.dev_${name}`);

type FoodTested = {
  name: string;
  price: string;
};

type Image = string;

export const burgers = createTable("burger", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  resturantName: text("resturant_name", { length: 256 }),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: int("updatedAt", { mode: "timestamp" }),
  rating: int("rating", { mode: "number" }).notNull(),
  description: text("description"),
  address: text("address"),
  country: text("country", { length: 256 }),
  testedFood: text("tested_food", { mode: "json" }).$type<FoodTested[]>(),
  images: text("images", { mode: "json" }).$type<Image[]>(),
});

export type SelectBurger = typeof burgers.$inferSelect;
export type InsertBurger = typeof burgers.$inferInsert;
