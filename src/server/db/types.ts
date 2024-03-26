import { type cafes, type burgers } from "./schema";

export type FoodTested = {
  name: string;
  price: string;
};

export type Image = string;

export type SelectBurger = typeof burgers.$inferSelect;
export type InsertBurger = typeof burgers.$inferInsert;

export type SelectCafe = typeof cafes.$inferSelect;
export type InsertCafe = typeof cafes.$inferInsert;
