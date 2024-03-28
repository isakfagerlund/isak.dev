"use client";

import { useCallback, useState } from "react";
import { ResturantCard } from "./ResturantCard";
import Link from "next/link";
import { type SelectBurger } from "~/server/db/types";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CountrySelect } from "./CountrySelect";
import { type _Object } from "@aws-sdk/client-s3";

export function AllResturants({
  burgers,
  allCountries,
  searchParamCountry,
  images,
}: {
  burgers: SelectBurger[];
  allCountries: string[];
  searchParamCountry: string | undefined;
  images: _Object[] | undefined;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filteredBurgers, setFilteredBurgers] = useState(
    burgers.filter((burger) =>
      searchParamCountry ? burger.country === searchParamCountry : true,
    ),
  );
  const [country, setCountry] = useState<string | undefined>(
    searchParamCountry,
  );
  const [isFiltered, setisFiltered] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const filterByCountry = (value: string) => {
    setCountry(value);
    const onlyCountryName = value.split(" ")[0];
    if (onlyCountryName) {
      router.push(
        pathname + "?" + createQueryString("country", onlyCountryName),
      );
      setFilteredBurgers(burgers.filter((burger) => burger.country === value));
      if (isFiltered) {
        setisFiltered(false);
      } else {
        setisFiltered(true);
      }
    }
  };

  const handleClear = () => {
    setFilteredBurgers(burgers);
    setCountry(undefined);
    router.push(pathname);
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex gap-2">
        <CountrySelect
          filterByCountry={filterByCountry}
          country={country}
          allCountries={allCountries}
          handleClear={handleClear}
        />
      </div>
      {filteredBurgers ? (
        <div className="grid h-full w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBurgers.map((burger) => (
            <Link key={burger.id} href={`/burgers/${burger.id}`}>
              <ResturantCard burger={burger} images={images} />
            </Link>
          ))}
        </div>
      ) : (
        <p>You have no burgers yet.</p>
      )}
    </div>
  );
}
