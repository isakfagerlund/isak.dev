import { api } from "~/trpc/server";
import { AllResturants } from "../_components/BurgerList";

export default async function Burgers({
  searchParams,
}: {
  searchParams: { country: string | undefined };
}) {
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
      <p className="pb-6 font-light lowercase text-slate-500">
        These are all my biased opinions based on nothing more than taste, vibes
        and experience. 
      </p>
      <AllResturants
        burgers={allBurgers}
        allCountries={allCountriesUnique}
        searchParamCountry={countryWithEmojji}
      />
    </>
  );
}
