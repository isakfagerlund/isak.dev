"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type SelectCafe } from "~/server/db/types";
import { EditCafeDropdown } from "./EditCafeDropdown";

export const cafeColumns: ColumnDef<SelectCafe>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "cafeName",
    header: "Name",
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
    accessorKey: "price",
    header: "Price",
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
      const cafe = row.original;

      return <EditCafeDropdown cafe={cafe} />;
    },
  },
];
