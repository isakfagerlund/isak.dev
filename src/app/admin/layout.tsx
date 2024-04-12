"use client";

import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useKindeBrowserClient();

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <header className="flex justify-between py-2">
        <h2>Admin page</h2>
        {!user ? (
          <LoginLink>Sign in</LoginLink>
        ) : (
          <LogoutLink>Log out</LogoutLink>
        )}
      </header>
      {children}
    </div>
  );
}
