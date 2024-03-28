import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table";
import { api } from "~/trpc/server";
import { AddBurger } from "./AddBurger";
import { AddCafe } from "./AddCafe";
import { burgerColumns } from "./burgerColumns";
import { cafeColumns } from "./cafeColumns";

export default async function BurgersAdmin() {
  const { sessionClaims } = auth();
  const allBurgers = await api.burger.getAll();
  const allCafes = await api.cafes.getAll();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-3 pb-2">
      <AddBurger />
      <DataTable columns={burgerColumns} data={allBurgers} />
      <AddCafe />
      <DataTable columns={cafeColumns} data={allCafes} />
    </div>
  );
}
