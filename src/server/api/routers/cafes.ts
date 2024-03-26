import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { eq } from "drizzle-orm";
import { cafes } from "~/server/db/schema";
import { z } from "zod";

export const cafesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(cafes);
  }),

  getAllPublished: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(cafes).where(eq(cafes.isPublished, true));
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
