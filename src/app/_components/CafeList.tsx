"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { type SelectCafe } from "~/server/db/types";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CountrySelect } from "./CountrySelect";
import { CafeCard } from "./CafeCard";

export function CafeList({
  cafes,
  allCountries,
  searchParamCountry,
}: {
  cafes: SelectCafe[];
  allCountries: string[];
  searchParamCountry: string | undefined;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filteredCafes, setFilteredCafes] = useState(
    cafes.filter((cafe) =>
      searchParamCountry ? cafe.country === searchParamCountry : true,
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
      setFilteredCafes(cafes.filter((cafe) => cafe.country === value));
      if (isFiltered) {
        setisFiltered(false);
      } else {
        setisFiltered(true);
      }
    }
  };

  const handleClear = () => {
    setFilteredCafes(cafes);
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
      {filteredCafes ? (
        <div className="grid h-full w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCafes.map((cafe) => (
            <Link key={cafe.id} href={`/cafes/${cafe.id}`}>
              <CafeCard cafe={cafe} />
            </Link>
          ))}
        </div>
      ) : (
        <p>You have no cafes yet.</p>
      )}
    </div>
  );
}
