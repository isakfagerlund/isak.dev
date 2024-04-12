import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ClientPage from "./ClientPage";
import { redirect } from "next/navigation";

export default async function Admin() {
  const { getPermissions } = getKindeServerSession();
  const permissions = await getPermissions();

  if (!permissions?.permissions?.includes("edit")) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-3 pb-2">
      <ClientPage />
    </div>
  );
}
