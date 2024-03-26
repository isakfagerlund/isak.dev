import { api } from "~/trpc/server";
import { CafeList } from "../_components/CafeList";

export default async function Cafes({
  searchParams,
}: {
  searchParams: { country: string | undefined };
}) {
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
      <p className="pb-6 font-light lowercase text-slate-500">
        my personal recommendations if you need to find a great cup of coffee.
      </p>
      <CafeList
        cafes={allCafes}
        allCountries={allCountriesUnique}
        searchParamCountry={countryWithEmojji}
      />
    </>
  );
}
