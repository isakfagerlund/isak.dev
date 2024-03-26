import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";
import { shimmer, toBase64 } from "~/lib/utils";
import { type SelectCafe } from "~/server/db/types";

type ResturantCardProps = {
  cafe: SelectCafe;
};

export const CafeCard = ({ cafe }: ResturantCardProps) => {
  return (
    <Card>
      <CardHeader className="flex-row justify-between p-4">
        <div>
          <p className="font-semibold lowercase">{cafe.cafeName}</p>
          <p className="font-light lowercase text-gray-600">
            {cafe.city} {cafe.country?.split(" ")[1]}
          </p>
        </div>
      </CardHeader>

      <CardContent className="h-[172px] px-4 pb-4 pt-0">
        {cafe?.images?.[0] ? (
          <Image
            priority
            className="h-full w-full rounded-lg border border-slate-100 object-cover"
            alt="burger"
            src={cafe.images[0]}
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
