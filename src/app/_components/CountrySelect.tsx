import { X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CountrySelectProps {
  country: string | undefined;
  filterByCountry: (value: string) => void;
  handleClear: () => void;
  allCountries: string[];
}

export const CountrySelect = ({
  country,
  filterByCountry,
  handleClear,
  allCountries,
}: CountrySelectProps) => (
  <>
    <Select
      value={country}
      key={country}
      onValueChange={(value) => filterByCountry(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="country" />
      </SelectTrigger>
      <SelectContent>
        {allCountries?.map(
          (country) =>
            country && (
              <SelectItem key={country} value={country}>
                {country.toLocaleLowerCase()}
              </SelectItem>
            ),
        )}
      </SelectContent>
    </Select>
    {country && (
      <Button onClick={handleClear} variant="outline" size="icon">
        <X className="h-4 w-4" />
      </Button>
    )}
  </>
);
