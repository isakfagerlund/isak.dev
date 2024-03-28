import { api } from "~/trpc/server";
import { AllResturants } from "../_components/BurgerList";
import { S3Bucket, s3 } from "~/server/s3/client";
import { ListObjectsCommand } from "@aws-sdk/client-s3";

export default async function Burgers({
  searchParams,
}: {
  searchParams: { country: string | undefined };
}) {
  const { Contents: images } = await s3.send(
    new ListObjectsCommand({ Bucket: S3Bucket, Prefix: `burgers` }),
  );
  const allBurgers = await api.burger.getAllPublished();
  const allCountries = allBurgers.map((burger) => burger.country);
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
      <AllResturants
        burgers={allBurgers}
        allCountries={allCountriesUnique}
        searchParamCountry={countryWithEmojji}
        images={images}
      />
    </>
  );
}
