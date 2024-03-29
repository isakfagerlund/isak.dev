import { api } from "~/trpc/server";
import { CafeList } from "../_components/CafeList";
import { S3Bucket, s3 } from "~/server/s3/client";
import { ListObjectsCommand } from "@aws-sdk/client-s3";

export default async function Cafes({
  searchParams,
}: {
  searchParams: { country: string | undefined };
}) {
  const { Contents: images } = await s3.send(
    new ListObjectsCommand({ Bucket: S3Bucket, Prefix: `cafes` }),
  );
  const allCafes = await api.cafes.getAllPublished();
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
      <CafeList
        cafes={allCafes}
        allCountries={allCountriesUnique}
        searchParamCountry={countryWithEmojji}
        images={images}
      />
    </>
  );
}
