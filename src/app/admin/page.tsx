"use client";
import { DataTable } from "./data-table";
import { AddBurger } from "./AddBurger";
import { AddCafe } from "./AddCafe";
import { burgerColumns } from "./burgerColumns";
import { cafeColumns } from "./cafeColumns";
import { api } from "~/trpc/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function BurgersAdmin() {
  const { data: allBurgers, refetch: refetchBurgers } =
    api.burger.getAll.useQuery();
  const { data: allCafes, refetch: refetchCafes } = api.cafes.getAll.useQuery();
  const { permissions } = useKindeBrowserClient();

  if (!permissions?.permissions?.includes("edit")) {
    return (
      <div className="flex flex-col gap-3 pb-2">
        <p>You are note allowed to access this page</p>
      </div>
    );
  }

  if (!allBurgers || !allCafes) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 pb-2">
      <AddBurger refetchBurgers={refetchBurgers} />
      <DataTable columns={burgerColumns} data={allBurgers} />
      <AddCafe refetchCafes={refetchCafes} />
      <DataTable columns={cafeColumns} data={allCafes} />
    </div>
  );
}
