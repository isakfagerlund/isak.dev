// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  int,
  integer,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import type { FoodTested, Image } from "./types";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `isak.dev_${name}`);

export const burgers = createTable("burger", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  resturantName: text("resturant_name", { length: 256 }),
  createdAt: int("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: int("updatedAt", { mode: "timestamp" }),
  rating: int("rating", { mode: "number" }),
  description: text("description"),
  city: text("city"),
  country: text("country", { length: 256 }),
  testedFood: text("tested_food", { mode: "json" }).$type<FoodTested[]>(),
  images: text("images", { mode: "json" }).$type<Image[]>(),
  address: text("address").default("empty address"),
  isPublished: integer("isPublished", { mode: "boolean" }),
});

export const cafes = createTable("cafes", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  cafeName: text("cafe_name", { length: 256 }),
  description: text("description"),
  city: text("city"),
  country: text("country", { length: 256 }),
  images: text("images", { mode: "json" }).$type<Image[]>(),
  address: text("address").default("empty address"),
  price: text("price"),
  isPublished: integer("isPublished", { mode: "boolean" }),
});

export const tickets = createTable("tickets", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  ticketName: text("ticket_name"),
  visitors: int("visitors"),
});

export const orders = createTable("orders", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  order: text("order").notNull(),
});
