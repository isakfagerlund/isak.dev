import {
  DeleteObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { eq } from "drizzle-orm";
import { z } from "zod";
import sharp from "sharp";
import {
  UpdateBurgerSchema,
  InsertBurgerSchema,
  SelectBurgerSchema,
} from "~/lib/utils";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { burgers } from "~/server/db/schema";
import { type InsertBurger } from "~/server/db/types";
import { S3Bucket, s3 } from "~/server/s3/client";

export const burgerRouter = createTRPCRouter({
  postImage: publicProcedure
    .input(z.object({ file: z.any(), burgerId: z.number() }))
    .mutation(async ({ input }) => {
      const data = await sharp(input.file as Uint8Array)
        .resize({ width: 800 })
        .toFormat("webp")
        .toBuffer();

      await s3.send(
        new PutObjectCommand({
          Bucket: S3Bucket,
          Key: `burgers/${input.burgerId}/${crypto.randomUUID()}.webp`,
          Body: data,
        }),
      );
    }),

  getImages: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const { Contents: images } = await s3.send(
        new ListObjectsCommand({
          Bucket: S3Bucket,
          Prefix: `burgers/${input.id}/`,
        }),
      );

      return images;
    }),

  deleteImage: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: S3Bucket,
        Key: input,
      }),
    );
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
