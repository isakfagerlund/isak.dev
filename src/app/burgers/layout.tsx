export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="py-8">Isaks Burgers</h1>
      {children}
    </>
  );
}
