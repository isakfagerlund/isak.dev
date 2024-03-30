import { ListObjectsCommand } from "@aws-sdk/client-s3";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BackButton } from "~/app/_components/BackButton";
import { MapButton } from "~/app/_components/MapButton";
import { Rating } from "~/app/_components/Rating";
import { createImageUrlFromObjectKey } from "~/lib/utils";
import { S3Bucket, s3 } from "~/server/s3/client";

import { api } from "~/trpc/server";

export default async function Burger({ params }: { params: { id: string } }) {
  const burger = await api.burger.getById({ id: params.id });
  const { Contents: images } = await s3.send(
    new ListObjectsCommand({
      Bucket: S3Bucket,
      Prefix: `burgers/${params.id}`,
    }),
  );

  if (!burger) {
    return notFound();
  }

  return (
    <>
      <BackButton href="/burgers" />
      <div className="m-auto flex max-w-[600px] flex-col gap-6 pb-3 pt-6">
        <section>
          <p className="lowercase text-slate-500">
            {burger.country?.split(" ")[0]}, {burger.city}{" "}
            {burger.country?.split(" ")[1]}
          </p>
          <h1 className="scroll-m-20 pb-3 text-4xl font-extrabold lowercase tracking-tight lg:text-5xl">
            {burger.resturantName}
          </h1>
          <div className="flex w-full justify-between gap-2">
            <Rating rating={burger.rating ?? 0} />
            <MapButton
              name={burger.resturantName}
              city={burger.city}
              address={burger.address}
            />
          </div>
          <p className="mt-3 pb-2 leading-7">
            {burger.description ?? "Review coming soon"}
          </p>
        </section>
        {images?.map((image) => (
          <Image
            key={image.Key}
            priority
            className="h-[300px] w-full rounded-lg border border-slate-100 object-cover"
            alt="burger"
            src={createImageUrlFromObjectKey(image.Key ?? "")}
            width={500}
            height={500}
          />
        ))}
      </div>
    </>
  );
}
