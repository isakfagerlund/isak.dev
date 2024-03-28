"use client";
import { ClerkProvider } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <ClerkProvider
        appearance={{
          elements: {
            footer: "hidden",
          },
        }}
      >
        <header className="flex justify-between py-2">
          <h2>Admin page</h2>
          {/* <UserButton /> */}
        </header>
        {children}
      </ClerkProvider>
    </div>
  );
}
