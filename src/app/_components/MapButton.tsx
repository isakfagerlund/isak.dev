import { Map } from "lucide-react";
import { Button } from "~/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";

export const MapButton = ({
  name,
  address,
  city,
}: {
  name: string | null;
  address: string | null;
  city: string | null;
}) => (
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
          href={`https://www.google.com/maps/search/?api=1&query=${name}+${address}+${city}`}
          target="_blank"
          className="cursor-pointer"
        >
          Google maps
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <a
          href={`https://maps.apple.com/?q=${name}+${address}+${city}`}
          target="_blank"
          className="cursor-pointer"
        >
          Apple Maps
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
