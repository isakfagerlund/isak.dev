import { ListObjectsCommand } from "@aws-sdk/client-s3";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BackButton } from "~/app/_components/BackButton";
import { MapButton } from "~/app/_components/MapButton";
import { createImageUrlFromObjectKey, sortS3ImagesByDate } from "~/lib/utils";
import { S3Bucket, s3 } from "~/server/s3/client";

import { api } from "~/trpc/server";

export default async function Cafe({ params }: { params: { id: string } }) {
  const [cafe, { Contents: images }] = await Promise.all([
    api.cafes.getById({ id: params.id }),
    s3.send(
      new ListObjectsCommand({
        Bucket: S3Bucket,
        Prefix: `cafes/${params.id}/`,
      }),
    ),
  ]);

  const sortedImages = sortS3ImagesByDate(images);

  if (!cafe) {
    return notFound();
  }

  return (
    <>
      <BackButton href="/cafes" />
      <div className="m-auto flex max-w-[600px] flex-col gap-6 pb-3 pt-6">
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
        {sortedImages?.map((image) => (
          <Image
            key={image.Key}
            priority
            className="h-[300px] w-full rounded-lg border border-slate-100 object-cover"
            alt="burger"
            src={createImageUrlFromObjectKey(image.Key ?? "")}
            width={500}
            height={500}
          />
        )) ?? <p>No images yet</p>}
      </div>
    </>
  );
}
