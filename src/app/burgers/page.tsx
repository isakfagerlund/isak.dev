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
    <AllResturants
      burgers={allBurgers}
      allCountries={allCountriesUnique}
      searchParamCountry={countryWithEmojji}
    />
  );
}
