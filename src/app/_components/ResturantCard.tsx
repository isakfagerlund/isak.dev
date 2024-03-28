import { Card, CardContent, CardHeader } from "./ui/card";
import { Rating } from "./Rating";
import Image from "next/image";
import { createImageUrlFromObjectKey, shimmer, toBase64 } from "~/lib/utils";
import { type SelectBurger } from "~/server/db/types";
import { type _Object } from "@aws-sdk/client-s3";

type ResturantCardProps = {
  burger: SelectBurger;
  images: _Object[] | undefined;
};

export const ResturantCard = ({ burger, images }: ResturantCardProps) => {
  const resturantImages = images?.filter((image) =>
    image.Key?.includes(`burgers/${burger.id}/`),
  );

  return (
    <Card>
      <CardHeader className="flex-row justify-between p-4">
        <div>
          <p className="font-semibold lowercase">{burger.resturantName}</p>
          <p className="font-light lowercase text-gray-600">
            {burger.city} {burger.country?.split(" ")[1]}
          </p>
        </div>
        <Rating rating={burger.rating ?? 0} />
      </CardHeader>

      <CardContent className="h-[172px] px-4 pb-4 pt-0">
        {resturantImages?.[0] ? (
          <Image
            priority
            className="h-full w-full rounded-lg border border-slate-100 object-cover"
            alt="burger"
            src={createImageUrlFromObjectKey(resturantImages[0].Key ?? "")}
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
            width={500}
            height={500}
          />
        ) : (
          "No Images"
        )}
      </CardContent>
    </Card>
  );
};
