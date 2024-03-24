import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

import { api } from "~/trpc/server";

export default async function BurgersAdmin() {
  const allBurgers = await api.burger.getAll();

  return (
    <div className="flex flex-col">
      <ClerkProvider>
        <header className="flex justify-between py-2">
          <h2>Admin page</h2>
          <UserButton />
        </header>
        <DataTable columns={columns} data={allBurgers} />
      </ClerkProvider>
    </div>
  );
}
