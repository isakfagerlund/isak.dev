import { type _Object } from "@aws-sdk/client-s3";
import { type ClassValue, clsx } from "clsx";
import pica from "pica";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function createImageUrlFromObjectKey(key: string) {
  return `https://pub-58ed107eae4b426d8f549f5b11283f63.r2.dev/${key}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f1f5f9" offset="10%" />
      <stop stop-color="#cbd5e1" offset="50%" />
      <stop stop-color="#f1f5f9" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f1f5f9" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="3s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const UpdateBurgerSchema = z.object({
  id: z.number(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  resturantName: z.string().min(2).nullable(),
  rating: z.string().nullable(),
  description: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  address: z.string().nullable(),
  isPublished: z.boolean().nullable(),
});

export const InsertBurgerSchema = z.object({
  resturantName: z.string().min(2).nullable(),
  rating: z.string().nullable(),
  description: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  address: z.string().nullable(),
});

export const SelectBurgerSchema = z.object({
  id: z.number(),
  resturantName: z.string().min(2).nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  rating: z.number().nullable(),
  description: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  address: z.string().nullable(),
  isPublished: z.boolean().nullable(),
});

export const InsertCafeSchema = z.object({
  cafeName: z.string().min(2).nullable(),
  description: z.string().nullable().optional(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  address: z.string().nullable(),
  price: z.string().nullable(),
});

export const UpdateCafeSchema = z.object({
  id: z.number(),
  cafeName: z.string().min(2).nullable(),
  description: z.string().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  address: z.string().nullable(),
  price: z.string().nullable(),
  isPublished: z.boolean().nullable(),
});

export const sortS3ImagesByDate = (images: _Object[] | undefined) =>
  images?.sort((image1, image2) => {
    if (image1.LastModified && image2.LastModified) {
      return image1.LastModified.getTime() - image2.LastModified.getTime();
    } else {
      return 0;
    }
  });

const picaInstance = pica();

export const resizeImage = async (file: File) => {
  const img = new Image();
  img.src = URL.createObjectURL(file);

  await img.decode();

  const canvas = document.createElement("canvas");

  canvas.width = 800;
  canvas.height = (img.height / img.width) * canvas.width; // maintain aspect ratio

  // Resize the image with Pica
  const blob = await picaInstance
    .resize(img, canvas)
    .then((result) => picaInstance.toBlob(result, "image/jpeg", 0.9))
    .then((blob) => {
      return blob;
    });
  return blob;
};
