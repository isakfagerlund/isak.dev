import Image from "next/image";
import { notFound } from "next/navigation";
import { MapButton } from "~/app/_components/MapButton";
import { createImageUrlFromObjectKey } from "~/lib/utils";

import { api } from "~/trpc/server";

export default async function Burger({ params }: { params: { id: string } }) {
  const cafe = await api.cafes.getById({ id: params.id });
  const response = await fetch(`http://localhost:3000/api/images/${params.id}`);
  const images = (await response.json()) as { Key: string }[];

  if (!cafe) {
    return notFound();
  }

  return (
    <div className="m-auto flex h-[calc(100vh-72px)] max-w-[600px] flex-col gap-6 pb-3 pt-6">
      <section>
        <div className="flex w-full items-end justify-between gap-2 pb-3">
          <div>
            <p className="lowercase text-slate-500">
              {cafe.country?.split(" ")[0]}, {cafe.city}{" "}
              {cafe.country?.split(" ")[1]}
            </p>
            <h1 className="scroll-m-20 text-4xl font-extrabold lowercase tracking-tight lg:text-5xl">
              {cafe.cafeName}
            </h1>
          </div>
          <MapButton
            name={cafe.cafeName}
            city={cafe.city}
            address={cafe.address}
          />
        </div>
        <p className="mt-3 pb-2 leading-7">
          {cafe.description ?? "Review coming soon"}
        </p>
      </section>
      {images?.map((image) => (
        <Image
          key={image.Key}
          priority
          className="h-[300px] w-full rounded-lg border border-slate-100 object-cover"
          alt="burger"
          src={createImageUrlFromObjectKey(image.Key)}
          width={500}
          height={500}
        />
      )) ?? <p>No images yet</p>}
    </div>
  );
}
