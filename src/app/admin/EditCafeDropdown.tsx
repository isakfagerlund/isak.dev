"use client";

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "~/app/_components/ui/button";
import { Dialog, DialogTrigger } from "~/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { type SelectCafe } from "~/server/db/types";
import { EditCafe } from "./EditCafe";

export const EditCafeDropdown = ({ cafe }: { cafe: SelectCafe }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem
              onClick={() => setOpen(true)}
              className="cursor-pointer"
            >
              Edit Cafe
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditCafe cafe={cafe} setOpen={setOpen} />
    </Dialog>
  );
};
