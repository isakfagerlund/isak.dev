import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { eq } from "drizzle-orm";
import { cafes } from "~/server/db/schema";
import { z } from "zod";
import { InsertCafeSchema } from "~/lib/utils";
import { type InsertCafe } from "~/server/db/types";

export const cafesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(cafes);
  }),

  getAllPublished: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(cafes).where(eq(cafes.isPublished, true));
  }),

  addCafe: publicProcedure
    .input(InsertCafeSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(cafes).values(input as InsertCafe);
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(cafes)
        .where(eq(cafes.id, parseInt(input.id)));

      return result[0];
    }),
});
