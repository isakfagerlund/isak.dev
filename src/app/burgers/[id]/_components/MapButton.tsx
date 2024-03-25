import { Map } from "lucide-react";
import { Button } from "~/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { type SelectBurger } from "~/server/db/types";

export const MapButton = ({ burger }: { burger: SelectBurger }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost">
        <Map color="#333" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Select Maps option</DropdownMenuLabel>

      <DropdownMenuItem asChild>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${burger.resturantName}+${burger.address}+${burger.city}`}
          target="_blank"
          className="cursor-pointer"
        >
          Google maps
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <a
          href={`https://maps.apple.com/?q=${burger.resturantName}+${burger.address}+${burger.city}`}
          target="_blank"
          className="cursor-pointer"
        >
          Apple Maps
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
