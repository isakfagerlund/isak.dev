import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type InsertBurger, burgers } from "~/server/db/schema";

const InsertBurgerSchema = z.object({
  id: z.number(),
  resturantName: z.string().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  rating: z.number().nullable(),
  description: z.string().nullable(),
  address: z.string().nullable(),
  country: z.string().nullable(),
  images: z.array(z.string()).nullable(),
});

export const burgerRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(burgers);
  }),

  updateBurger: publicProcedure
    .input(InsertBurgerSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(burgers)
        .set(input as InsertBurger)
        .where(eq(burgers.id, input.id));
    }),
});
