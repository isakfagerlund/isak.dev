import { type ClassValue, clsx } from "clsx";
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
