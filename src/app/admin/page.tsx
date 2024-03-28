"use client";
import { DataTable } from "./data-table";
import { AddBurger } from "./AddBurger";
import { AddCafe } from "./AddCafe";
import { burgerColumns } from "./burgerColumns";
import { cafeColumns } from "./cafeColumns";
import { api } from "~/trpc/react";

export default function BurgersAdmin() {
  const allBurgers = api.burger.getAll.useQuery();
  const allCafes = api.cafes.getAll.useQuery();

  if (!allBurgers.data || !allCafes.data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 pb-2">
      <AddBurger />
      <DataTable columns={burgerColumns} data={allBurgers.data} />
      <AddCafe />
      <DataTable columns={cafeColumns} data={allCafes.data} />
    </div>
  );
}
