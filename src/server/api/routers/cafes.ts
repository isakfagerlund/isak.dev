import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { eq } from "drizzle-orm";
import { cafes } from "~/server/db/schema";
import { z } from "zod";
import { InsertCafeSchema, UpdateCafeSchema } from "~/lib/utils";
import { InsertBurger, type InsertCafe } from "~/server/db/types";
import { S3Bucket, s3 } from "~/server/s3/client";
import {
  DeleteObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";

export const cafesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(cafes);
  }),

  getAllPublished: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(cafes).where(eq(cafes.isPublished, true));
  }),

  postImage: publicProcedure
    .input(z.object({ file: z.any(), cafeId: z.number() }))
    .mutation(async ({ input }) => {
      const data = await sharp(input.file as Uint8Array)
        .resize({ width: 800 })
        .toFormat("webp")
        .toBuffer();

      await s3.send(
        new PutObjectCommand({
          Bucket: S3Bucket,
          Key: `cafes/${input.cafeId}/${crypto.randomUUID()}.webp`,
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
          Prefix: `cafes/${input.id}`,
        }),
      );

      return images ?? [];
    }),

  deleteImage: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: S3Bucket,
        Key: input,
      }),
    );
  }),

  updateCafe: publicProcedure
    .input(UpdateCafeSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(cafes)
        .set(input as InsertBurger)
        .where(eq(cafes.id, input.id));
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
