import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  UpdateBurgerSchema,
  InsertBurgerSchema,
  SelectBurgerSchema,
} from "~/lib/utils";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { burgers } from "~/server/db/schema";
import { type InsertBurger } from "~/server/db/types";

export const burgerRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(burgers)
        .where(eq(burgers.id, parseInt(input.id)));

      return result[0];
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(burgers);
  }),

  getAllPublished: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(burgers).where(eq(burgers.isPublished, true));
  }),

  updateBurger: publicProcedure
    .input(UpdateBurgerSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(burgers)
        .set(input as InsertBurger)
        .where(eq(burgers.id, input.id));
    }),

  addBurger: publicProcedure
    .input(InsertBurgerSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(burgers).values(input as InsertBurger);
    }),

  deleteBurger: publicProcedure
    .input(SelectBurgerSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(burgers).where(eq(burgers.id, input.id));
    }),
});
