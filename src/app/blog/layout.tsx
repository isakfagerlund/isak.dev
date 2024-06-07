export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container relative flex h-dvh flex-col border-8 border-orange-400 bg-blue-800 p-5 text-white md:text-lg">
      {children}
    </main>
  );
}
