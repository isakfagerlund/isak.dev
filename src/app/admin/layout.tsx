"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="flex justify-between py-2">
        <h2>Admin page</h2>
      </header>
      {children}
    </div>
  );
}
