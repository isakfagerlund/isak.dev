import Image from "next/image";
import { notFound } from "next/navigation";
import { Rating } from "~/app/_components/Rating";
import { api } from "~/trpc/server";

export default async function Burger({ params }: { params: { id: string } }) {
  const burger = await api.burger.getById({ id: params.id });

  if (!burger) {
    return notFound();
  }

  return (
    <div className="m-auto flex h-[calc(100vh-72px)] max-w-[600px] flex-col justify-between pb-3">
      <section>
        <p className="text-slate-500">
          {burger.country?.split(" ")[0]}, {burger.city}{" "}
          {burger.country?.split(" ")[1]}
        </p>
        <h1 className="scroll-m-20 pb-3 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {burger.resturantName}
        </h1>
        <Rating rating={burger.rating ?? 0} />
        <p className="mt-3 pb-2 leading-7">
          {burger.description ?? "Review coming soon"}
        </p>
      </section>
      {burger.images?.map((image) => (
        <Image
          key={image}
          priority
          className="h-[300px] w-full rounded-lg border border-slate-100 object-cover"
          alt="burger"
          src={image}
          width={500}
          height={500}
        />
      ))}
    </div>
  );
}
