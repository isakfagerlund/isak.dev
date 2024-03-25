import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { api } from "~/trpc/server";
import { AddBurger } from "./AddBurger";

export default async function BurgersAdmin() {
  const { sessionClaims } = auth();
  const allBurgers = await api.burger.getAll();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="pb-2">
      <AddBurger />
      <DataTable columns={columns} data={allBurgers} />
    </div>
  );
}
