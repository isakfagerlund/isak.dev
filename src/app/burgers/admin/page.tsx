import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { api } from "~/trpc/server";

export default async function BurgersAdmin() {
  const { sessionClaims } = auth();
  const allBurgers = await api.burger.getAll();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  return (
    <div>
      <DataTable columns={columns} data={allBurgers} />
    </div>
  );
}
