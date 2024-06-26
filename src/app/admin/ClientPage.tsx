"use client";
import { DataTable } from "./data-table";
import { AddBurger } from "./AddBurger";
import { AddCafe } from "./AddCafe";
import { burgerColumns } from "./burgerColumns";
import { cafeColumns } from "./cafeColumns";
import { api } from "~/trpc/react";

export default function ClientPage() {
  const { data: allBurgers, refetch: refetchBurgers } =
    api.burger.getAll.useQuery();
  const { data: allCafes, refetch: refetchCafes } = api.cafes.getAll.useQuery();

  if (!allBurgers || !allCafes) {
    return null;
  }

  return (
    <>
      <AddBurger refetchBurgers={refetchBurgers} />
      <DataTable columns={burgerColumns} data={allBurgers} />
      <AddCafe refetchCafes={refetchCafes} />
      <DataTable columns={cafeColumns} data={allCafes} />
    </>
  );
}
