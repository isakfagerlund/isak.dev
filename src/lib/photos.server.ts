import { createHmac, timingSafeEqual } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const PHOTO_LIBRARY_PASSWORD =
  process.env.PHOTO_LIBRARY_PASSWORD ?? "letmein";
const PHOTO_LIBRARY_SECRET =
  process.env.PHOTO_LIBRARY_SECRET ?? "development-only-secret";

export const PHOTO_SESSION_COOKIE = "photo_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export type Photo = {
  id: string;
  alt: string;
  src: string;
  blurred: boolean;
};

export type PhotoAlbum = {
  id: string;
  title: string;
  date: string;
  description?: string;
  coverSrc: string;
  coverBlurred: boolean;
  photoCount: number;
  photos: Photo[];
};

export type PhotoCategory = {
  id: string;
  title: string;
  description?: string;
  albums: PhotoAlbum[];
};

type RawPhoto = {
  id: string;
  alt: string;
  fullSrc: string;
  blurSrc: string;
};

type RawAlbum = {
  id: string;
  title: string;
  date: string;
  description?: string;
  coverPhotoId: string;
  photos: RawPhoto[];
};

type RawCategory = {
  id: string;
  title: string;
  description?: string;
  albums: RawAlbum[];
};

const PHOTO_LIBRARY: RawCategory[] = [
  {
    id: "trips",
    title: "Trips",
    description: "Road miles, mountain air, and long golden hours.",
    albums: [
      {
        id: "dolomites-2024",
        title: "Dolomites – Autumn 2024",
        date: "2024-10-12",
        description: "Soft morning haze, jagged peaks, espresso stops.",
        coverPhotoId: "dolomites-1",
        photos: [
          {
            id: "dolomites-1",
            alt: "Sunrise over alpine peaks",
            fullSrc:
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=85",
            blurSrc:
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=120&q=20",
          },
          {
            id: "dolomites-2",
            alt: "Mountain ridge with low clouds",
            fullSrc:
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85",
            blurSrc:
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=120&q=20",
          },
          {
            id: "dolomites-3",
            alt: "Trail winding through wildflowers",
            fullSrc:
              "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=85",
            blurSrc:
              "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=120&q=20",
          },
          {
            id: "dolomites-4",
            alt: "Cabin near rocky cliffs",
            fullSrc:
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=85",
            blurSrc:
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=120&q=20",
          },
          {
            id: "dolomites-5",
            alt: "Golden hour valley light",
            fullSrc:
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=85",
            blurSrc:
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=120&q=20",
          },
        ],
      },
      {
        id: "lisbon-2023",
        title: "Lisbon – Summer 2023",
        date: "2023-07-09",
        description: "Azulejos, tram rides, and late-night pastel de nata.",
        coverPhotoId: "lisbon-1",
        photos: [
          {
            id: "lisbon-1",
            alt: "Pastel buildings in Lisbon",
            fullSrc:
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
            blurSrc:
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=120&q=20",
          },
          {
            id: "lisbon-2",
            alt: "Tram on a hillside",
            fullSrc:
              "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1600&q=80",
            blurSrc:
              "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=120&q=20",
          },
          {
            id: "lisbon-3",
            alt: "Sunset over the river",
            fullSrc:
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
            blurSrc:
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=120&q=20",
          },
          {
            id: "lisbon-4",
            alt: "Cafe table with espresso",
            fullSrc:
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
            blurSrc:
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=120&q=20",
          },
        ],
      },
    ],
  },
  {
    id: "everyday",
    title: "Everyday",
    description: "Quiet moments, daily rituals, and familiar rooms.",
    albums: [
      {
        id: "weekend-light",
        title: "Weekend Light",
        date: "2024-03-02",
        description: "Soft interiors and slow morning light.",
        coverPhotoId: "weekend-1",
        photos: [
          {
            id: "weekend-1",
            alt: "Sunlit desk with coffee",
            fullSrc:
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=85",
            blurSrc:
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=120&q=20",
          },
          {
            id: "weekend-2",
            alt: "Plant by the window",
            fullSrc:
              "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85",
            blurSrc:
              "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=120&q=20",
          },
          {
            id: "weekend-3",
            alt: "Notebook with handwritten notes",
            fullSrc:
              "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=1600&q=85",
            blurSrc:
              "https://images.unsplash.com/photo-1488998427799-e3362cec87c3?auto=format&fit=crop&w=120&q=20",
          },
          {
            id: "weekend-4",
            alt: "Vinyl record spinning",
            fullSrc:
              "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=85",
            blurSrc:
              "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=120&q=20",
          },
          {
            id: "weekend-5",
            alt: "Open book on a blanket",
            fullSrc:
              "https://images.unsplash.com/photo-1455885666463-18f7d8a3692c?auto=format&fit=crop&w=1600&q=85",
            blurSrc:
              "https://images.unsplash.com/photo-1455885666463-18f7d8a3692c?auto=format&fit=crop&w=120&q=20",
          },
        ],
      },
    ],
  },
];

export const getPhotoLibrary = createServerFn({ method: "GET" }).handler(
  ({ request }) => {
    const isAuthenticated = hasValidSession(request);
    return {
      isAuthenticated,
      sessionMaxAgeSeconds: SESSION_MAX_AGE_SECONDS,
      categories: PHOTO_LIBRARY.map((category) =>
        mapCategory(category, isAuthenticated),
      ),
    };
  },
);

export const loginToPhotoLibrary = createServerFn({ method: "POST" })
  .inputValidator(z.object({ password: z.string().min(1) }))
  .handler(({ data }) => {
    if (data.password !== PHOTO_LIBRARY_PASSWORD) {
      return {
        ok: false,
        message: "Incorrect password.",
      } as const;
    }

    return {
      ok: true,
      token: createSessionToken(),
      maxAgeSeconds: SESSION_MAX_AGE_SECONDS,
    } as const;
  });

export const logoutFromPhotoLibrary = createServerFn({ method: "POST" }).handler(
  () => {
    return {
      ok: true,
    } as const;
  },
);

function mapCategory(category: RawCategory, isAuthenticated: boolean): PhotoCategory {
  return {
    id: category.id,
    title: category.title,
    description: category.description,
    albums: category.albums.map((album) => mapAlbum(album, isAuthenticated)),
  };
}

function mapAlbum(album: RawAlbum, isAuthenticated: boolean): PhotoAlbum {
  const coverPhoto = album.photos.find(
    (photo) => photo.id === album.coverPhotoId,
  );
  const cover = coverPhoto ?? album.photos[0];
  const coverSrc = isAuthenticated ? cover.fullSrc : cover.blurSrc;

  return {
    id: album.id,
    title: album.title,
    date: album.date,
    description: album.description,
    coverSrc,
    coverBlurred: !isAuthenticated,
    photoCount: album.photos.length,
    photos: album.photos.map((photo) => ({
      id: photo.id,
      alt: photo.alt,
      src: isAuthenticated ? photo.fullSrc : photo.blurSrc,
      blurred: !isAuthenticated,
    })),
  };
}

function hasValidSession(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = parseCookies(cookieHeader);
  const token = cookies[PHOTO_SESSION_COOKIE];

  if (!token) {
    return false;
  }

  return verifySessionToken(token);
}

function parseCookies(cookieHeader: string): Record<string, string> {
  return cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, cookie) => {
      const [key, ...valueParts] = cookie.split("=");
      if (!key) {
        return acc;
      }
      acc[key] = decodeURIComponent(valueParts.join("="));
      return acc;
    }, {});
}

function createSessionToken(): string {
  const issuedAt = Date.now();
  const payload = {
    iat: issuedAt,
    exp: issuedAt + SESSION_MAX_AGE_SECONDS * 1000,
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );
  const signature = createSignature(payloadBase64);

  return `${payloadBase64}.${signature}`;
}

function verifySessionToken(token: string): boolean {
  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) {
    return false;
  }

  const expectedSignature = createSignature(payloadBase64);
  if (
    signature.length !== expectedSignature.length ||
    !timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    )
  ) {
    return false;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(payloadBase64, "base64url").toString("utf-8"),
    ) as { exp?: number };
    if (!payload.exp) {
      return false;
    }

    return Date.now() <= payload.exp;
  } catch {
    return false;
  }
}

function createSignature(payloadBase64: string): string {
  return createHmac("sha256", PHOTO_LIBRARY_SECRET)
    .update(payloadBase64)
    .digest("base64url");
}
