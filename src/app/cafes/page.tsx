import { api } from "~/trpc/server";
import { CafeList } from "../_components/CafeList";
import { S3Bucket, s3 } from "~/server/s3/client";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { sortS3ImagesByDate } from "~/lib/utils";

export default async function Cafes({
  searchParams,
}: {
  searchParams: { country: string | undefined };
}) {
  const [s3Response, allCafes] = await Promise.all([
    s3.send(new ListObjectsCommand({ Bucket: S3Bucket, Prefix: `cafes` })),
    api.cafes.getAllPublished(),
  ]);

  const { Contents: images } = s3Response;
  const allCountries = allCafes.map((cafe) => cafe.country);
  const allCountriesUnique = [...new Set(allCountries)].filter(
    Boolean,
  ) as string[];
  const countryWithEmojji = allCountriesUnique.find(
    (c) =>
      searchParams.country &&
      c.toLocaleLowerCase().includes(searchParams.country.toLocaleLowerCase()),
  );

  return (
    <>
      <p className="pb-6 font-light lowercase text-slate-500">
        my personal recommendations if you need to find a great cup of coffee.
      </p>
      <CafeList
        cafes={allCafes}
        allCountries={allCountriesUnique}
        searchParamCountry={countryWithEmojji}
        images={sortS3ImagesByDate(images)}
      />
    </>
  );
}
