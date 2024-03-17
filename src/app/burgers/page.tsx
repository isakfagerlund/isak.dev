import { api } from "~/trpc/server";
import { AllResturants } from "../_components/BurgerList";

export default async function Burgers() {
  const allBurgers = await api.burger.getAll();
  const allCountries = allBurgers.map((burger) => burger.country);
  const allCountriesUnique = [...new Set(allCountries)].filter(
    Boolean,
  ) as string[];

  return (
    <>
      <h1 className="py-8">Isaks Burgers</h1>
      <AllResturants burgers={allBurgers} allCountries={allCountriesUnique} />
    </>
  );
}
