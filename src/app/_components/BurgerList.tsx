"use client";

import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { ResturantCard } from "./ResturantCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { X } from "lucide-react";
import Link from "next/link";
import { type SelectBurger } from "~/server/db/types";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function AllResturants({
  burgers,
  allCountries,
  searchParamCountry,
}: {
  burgers: SelectBurger[];
  allCountries: string[];
  searchParamCountry: string | undefined;
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

  return (
    <div className="w-full">
      <div className="mb-2 flex gap-2">
        <Select
          value={country}
          key={country}
          onValueChange={(value) => filterByCountry(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            {allCountries?.map(
              (country) =>
                country && (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ),
            )}
          </SelectContent>
        </Select>
        {country && (
          <Button
            onClick={() => {
              setFilteredBurgers(burgers);
              setCountry(undefined);
              router.push(pathname);
            }}
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {filteredBurgers ? (
        <div className="grid h-full w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBurgers.map((burger) => (
            <Link key={burger.id} href={`/burgers/${burger.id}`}>
              <ResturantCard burger={burger} />
            </Link>
          ))}
        </div>
      ) : (
        <p>You have no burgers yet.</p>
      )}
    </div>
  );
}
