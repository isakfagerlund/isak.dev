import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { burgers } from "~/server/db/schema";

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
});
