import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  PHOTO_SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  getPhotoLibrary,
  loginToPhotoLibrary,
  logoutFromPhotoLibrary,
  type PhotoAlbum,
} from "@/lib/photos.server";

export const Route = createFileRoute("/photos/")({
  component: PhotosPage,
  loader: () => getPhotoLibrary(),
  head: () => ({
    meta: [
      {
        title: "photos – isak.dev",
      },
    ],
  }),
});

type SlideshowState = {
  album: PhotoAlbum;
  index: number;
  isPlaying: boolean;
};

function PhotosPage() {
  const { categories, isAuthenticated } = Route.useLoaderData();
  const login = useServerFn(loginToPhotoLibrary);
  const logout = useServerFn(logoutFromPhotoLibrary);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [slideshow, setSlideshow] = useState<SlideshowState | null>(null);

  const albumOptions = useMemo(
    () =>
      categories.flatMap((category) =>
        category.albums.map((album) => ({
          id: album.id,
          title: album.title,
        })),
      ),
    [categories],
  );

  const currentPhoto = useMemo(() => {
    if (!slideshow) {
      return null;
    }
    return slideshow.album.photos[slideshow.index] ?? null;
  }, [slideshow]);

  const startSlideshow = useCallback(
    (album: PhotoAlbum) => {
      if (!isAuthenticated) {
        setLoginError("Log in to view the full-screen slideshow.");
        return;
      }
      setSlideshow({ album, index: 0, isPlaying: true });
    },
    [isAuthenticated],
  );

  const nextSlide = useCallback(() => {
    setSlideshow((current) => {
      if (!current) {
        return current;
      }
      const nextIndex = (current.index + 1) % current.album.photos.length;
      return { ...current, index: nextIndex };
    });
  }, []);

  const previousSlide = useCallback(() => {
    setSlideshow((current) => {
      if (!current) {
        return current;
      }
      const previousIndex =
        (current.index - 1 + current.album.photos.length) %
        current.album.photos.length;
      return { ...current, index: previousIndex };
    });
  }, []);

  useEffect(() => {
    if (!slideshow || !slideshow.isPlaying) {
      return;
    }

    const timer = window.setInterval(() => {
      nextSlide();
    }, 4000);

    return () => window.clearInterval(timer);
  }, [nextSlide, slideshow]);

  useEffect(() => {
    if (!slideshow) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSlideshow(null);
      }
      if (event.key === "ArrowRight") {
        nextSlide();
      }
      if (event.key === "ArrowLeft") {
        previousSlide();
      }
      if (event.key === " ") {
        setSlideshow((current) =>
          current ? { ...current, isPlaying: !current.isPlaying } : current,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, previousSlide, slideshow]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError(null);

    const result = await login({ data: { password } });

    if (!result.ok || !result.token) {
      setLoginError(result.message ?? "Unable to sign in.");
      return;
    }

    document.cookie = `${PHOTO_SESSION_COOKIE}=${encodeURIComponent(
      result.token,
    )}; Max-Age=${result.maxAgeSeconds ?? SESSION_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
    window.location.reload();
  };

  const handleLogout = async () => {
    await logout();
    document.cookie = `${PHOTO_SESSION_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="sticky top-0 z-20 border-b border-neutral-200/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              to="/"
              className="text-sm font-semibold uppercase tracking-widest text-neutral-400"
            >
              isak.dev
            </Link>
            <h1 className="mt-2 text-3xl font-semibold lowercase tracking-tight">
              photos
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Private photo library. Public visitors only see blurred previews.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {isAuthenticated ? (
              <div className="flex flex-col items-start gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm">
                <p className="font-medium text-neutral-700">
                  Logged in — full-resolution access unlocked.
                </p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border border-neutral-300 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-700 transition hover:border-neutral-400"
                >
                  Log out
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleLogin}
                className="flex w-full flex-col gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm md:w-80"
              >
                <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Enter password
                </label>
                <div className="flex flex-col gap-3 md:flex-row">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Photo library password"
                    className="w-full rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-700 outline-none transition focus:border-neutral-400"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-neutral-800"
                  >
                    Unlock
                  </button>
                </div>
                {loginError ? (
                  <p className="text-xs font-medium text-rose-600">
                    {loginError}
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12">
        {categories.map((category) => (
          <section key={category.id} className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold lowercase">
                {category.title}
              </h2>
              {category.description ? (
                <p className="mt-1 text-sm text-neutral-500">
                  {category.description}
                </p>
              ) : null}
            </div>

            <div className="space-y-12">
              {category.albums.map((album) => (
                <article
                  key={album.id}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="relative w-full overflow-hidden rounded-2xl border border-neutral-100 lg:w-80">
                      <img
                        src={album.coverSrc}
                        alt={`${album.title} cover`}
                        className={`h-56 w-full object-cover transition ${
                          album.coverBlurred ? "blur-md" : ""
                        }`}
                        loading="lazy"
                      />
                      {album.coverBlurred ? (
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/40" />
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                          <span>{album.date}</span>
                          <span>•</span>
                          <span>{album.photoCount} photos</span>
                        </div>
                        <h3 className="mt-2 text-xl font-semibold">
                          {album.title}
                        </h3>
                        {album.description ? (
                          <p className="mt-2 text-sm text-neutral-500">
                            {album.description}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => startSlideshow(album)}
                          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                            isAuthenticated
                              ? "bg-neutral-900 text-white hover:bg-neutral-800"
                              : "cursor-not-allowed border border-neutral-200 text-neutral-400"
                          }`}
                          disabled={!isAuthenticated}
                        >
                          Play slideshow
                        </button>
                        {!isAuthenticated ? (
                          <span className="text-xs text-neutral-400">
                            Sign in to watch the full-screen slideshow.
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
                    {album.photos.map((photo) => (
                      <figure
                        key={photo.id}
                        className="mb-4 break-inside-avoid overflow-hidden rounded-2xl"
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          className={`w-full rounded-2xl object-cover transition ${
                            photo.blurred ? "blur-md" : ""
                          }`}
                        />
                      </figure>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-3xl border border-dashed border-neutral-200 bg-neutral-50 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold">Bulk upload</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Upload multiple files into a selected album. Variants and
                metadata are generated automatically.
              </p>
            </div>
            {!isAuthenticated ? (
              <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                Login required
              </span>
            ) : null}
          </div>
          <form className="mt-4 grid gap-4 md:grid-cols-[1fr_auto_auto]">
            <select
              disabled={!isAuthenticated}
              className="rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600 disabled:cursor-not-allowed disabled:bg-neutral-100"
            >
              {albumOptions.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
              ))}
            </select>
            <input
              type="file"
              multiple
              disabled={!isAuthenticated}
              className="rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600 file:mr-4 file:rounded-full file:border-0 file:bg-neutral-200 file:px-3 file:py-1 file:text-xs file:font-semibold file:uppercase file:text-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-100"
            />
            <button
              type="button"
              disabled={!isAuthenticated}
              className="rounded-2xl bg-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:bg-neutral-300"
            >
              Start upload
            </button>
          </form>
        </section>
      </main>

      {slideshow && currentPhoto ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/95 p-6 text-white">
          <div className="absolute right-6 top-6 flex items-center gap-2 text-xs uppercase tracking-wide">
            <span>
              {slideshow.index + 1} / {slideshow.album.photos.length}
            </span>
            <span>•</span>
            <span>{slideshow.album.title}</span>
          </div>

          <img
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl"
          />

          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
            <button
              type="button"
              onClick={previousSlide}
              className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition hover:border-white"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() =>
                setSlideshow((current) =>
                  current
                    ? { ...current, isPlaying: !current.isPlaying }
                    : current,
                )
              }
              className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition hover:border-white"
            >
              {slideshow.isPlaying ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition hover:border-white"
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => setSlideshow(null)}
              className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition hover:border-white"
            >
              Exit
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
