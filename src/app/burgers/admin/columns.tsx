"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type SelectBurger } from "~/server/db/schema";
import { EditDropdown } from "./EditDropdown";

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

      return <EditDropdown burger={burger} />;
    },
  },
];
