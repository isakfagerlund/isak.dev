import { api } from "~/trpc/server";
import { AllResturants } from "../_components/BurgerList";
import { S3Bucket, s3 } from "~/server/s3/client";
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { sortS3ImagesByDate } from "~/lib/utils";

export default async function Burgers({
  searchParams,
}: {
  searchParams: { country: string | undefined };
}) {
  const [s3Response, allBurgers] = await Promise.all([
    s3.send(new ListObjectsCommand({ Bucket: S3Bucket, Prefix: `burgers` })),
    api.burger.getAllPublished(),
  ]);

  const { Contents: images } = s3Response;
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
      <p className="pb-6 font-light lowercase text-slate-500">
        These are all my biased opinions based on nothing more than taste, vibes
        and experience. 
      </p>
      <AllResturants
        burgers={allBurgers}
        allCountries={allCountriesUnique}
        searchParamCountry={countryWithEmojji}
        images={sortS3ImagesByDate(images)}
      />
    </>
  );
}
