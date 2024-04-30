import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-dvh items-center justify-center text-white sm:p-7">
      <Image
        src="/brunch-bg.jpg"
        alt="bg image"
        width={1280}
        height={832}
        className="bg-img absolute left-0 top-0 h-dvh w-full select-none object-cover"
      />
      {children}
    </main>
  );
}
