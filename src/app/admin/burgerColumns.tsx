"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type SelectBurger } from "~/server/db/types";
import { EditBurgerDropdown } from "./EditBurgerDropdown";

export const burgerColumns: ColumnDef<SelectBurger>[] = [
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
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description: string = row.getValue("description");
      return <div className="max-w-xs truncate">{description}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const burger = row.original;

      return <EditBurgerDropdown burger={burger} />;
    },
  },
];
