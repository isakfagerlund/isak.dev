import { UserButton } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="flex justify-between py-2">
        <h2>isak.dev admin</h2>
        <UserButton />
      </header>
      {children}
    </div>
  );
}
