import { type SelectBurger } from "~/server/db/schema";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Rating } from "./Rating";
import Image from "next/image";
import { shimmer, toBase64 } from "~/lib/utils";

type ResturantCardProps = {
  burger: SelectBurger;
};

export const ResturantCard = ({ burger }: ResturantCardProps) => {
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
        {burger?.images?.[0] ? (
          <Image
            priority
            className="h-full w-full rounded-lg border border-slate-100 object-cover"
            alt="burger"
            src={burger.images[0]}
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
