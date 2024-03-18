"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
import { type SelectBurger } from "~/server/db/schema";
import { EditBurger } from "./EditBurger";

export const columns: ColumnDef<SelectBurger>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "resturantName",
    header: "Resturant Name",
  },
  {
    accessorKey: "rating",
    header: () => <div className="text-right">Rating</div>,
    cell: ({ row }) => {
      const rating: string = row.getValue("rating");
      return <div className="font-medium">{rating}/5</div>;
    },
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const images: string = row.getValue("images");
      return <div className="max-w-xs truncate">{images}</div>;
    },
  },
  {
    accessorKey: "testedFood",
    header: "Tested Food",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const burger = row.original;

      return (
        <Dialog>
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
                <DropdownMenuItem className="cursor-pointer">
                  Edit Resturant
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditBurger burger={burger} />
        </Dialog>
      );
    },
  },
];
