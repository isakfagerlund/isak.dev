"use client";
import { ArrowBigLeft, Coffee } from "lucide-react";
import { Imbue } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/app/_components/ui/form";
import submitOrder from "./actions";
import { useState } from "react";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const drinks = {
  flatWhite: "Flat White",
  cappucchino: "Cappucchino",
  americano: "Americano",
  espresso: "Espresso",
  doubleEspresso: "Double Espresso",
} as const;

interface Order {
  name: string;
  order: string;
  milk: string;
}

const orderPlaced = atomWithStorage<Order | undefined>(
  "orderPlaced",
  undefined,
);

const imbue = Imbue({
  subsets: ["latin"],
  variable: "--font-imbue",
});

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }),
  order: z.string(),
  milk: z.string(),
});

export default function CoffeePage() {
  const [isOrderPlaced, setIsOrderPlaced] = useAtom(orderPlaced);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      order: undefined,
      milk: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await submitOrder(values);
      setLoading(false);
      toast("Your order is placed, I look forward seeing you!");
      setIsOrderPlaced(values);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  if (isOrderPlaced) {
    return (
      <main className="flex h-dvh items-center justify-center text-white sm:p-7">
        <Image
          src="/brunch-bg.jpg"
          alt="bg image"
          width={1280}
          height={832}
          className="bg-img absolute left-0 top-0 h-dvh w-full select-none object-cover"
        />
        <div className="fixed bottom-3 right-5 z-10 sm:hidden">
          <Button asChild className="frost-effect" variant="ghost">
            <Link href="/brunch">
              <ArrowBigLeft />
            </Link>
          </Button>
        </div>
        <div
          className={`frost-effect z-10 flex h-[400px] w-full max-w-[600px] flex-col items-center justify-center gap-4 rounded-xl p-4 ${imbue.variable}`}
        >
          <h3
            style={{ fontFamily: "var(--font-imbue)" }}
            className="text-5xl text-[#FFCB13]"
          >
            Congrats Your Order Is Completed
          </h3>
          <h3
            style={{ fontFamily: "var(--font-imbue)" }}
            className="text-2xl text-[#FFCB13]"
          >
            {isOrderPlaced.name} you ordered a{" "}
            {drinks[isOrderPlaced.order as keyof typeof drinks]}{" "}
            {isOrderPlaced.milk === "none"
              ? null
              : `with  ${isOrderPlaced.milk} milk`}
          </h3>
          <Link href="/brunch">
            <Button
              className="frost-effect-button flex cursor-pointer gap-2 font-extralight text-white"
              variant="link"
            >
              GO BACK
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-dvh items-center justify-center text-white sm:p-7">
      <Image
        src="/brunch-bg.jpg"
        alt="bg image"
        width={1280}
        height={832}
        className="bg-img absolute left-0 top-0 h-dvh w-full select-none object-cover"
      />
      <div className="fixed bottom-3 right-5 z-10 sm:hidden">
        <Button asChild className="frost-effect" variant="ghost">
          <Link href="/brunch">
            <ArrowBigLeft />
          </Link>
        </Button>
      </div>
      <div className="frost-effect z-10 flex h-[400px] w-full max-w-[600px] rounded-xl p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`flex h-full w-full flex-col justify-between ${imbue.variable}`}
          >
            <h3
              style={{ fontFamily: "var(--font-imbue)" }}
              className="text-5xl text-[#FFCB13]"
            >
              Order Coffee Here
            </h3>
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your name here"
                        className="frost-effect border-none font-extralight placeholder:text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="frost-effect border-none font-extralight">
                          <SelectValue placeholder="Select your coffee order" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup className="font-extralight">
                            <SelectLabel>Coffee Order</SelectLabel>
                            <SelectItem value="cappucchino">
                              Cappucchino
                            </SelectItem>
                            <SelectItem value="flatWhite">
                              Flat White
                            </SelectItem>
                            <SelectItem value="americano">Americano</SelectItem>
                            <SelectItem value="espresso">Espresso</SelectItem>
                            <SelectItem value="doubleEspresso">
                              Double Espresso
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="milk"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="frost-effect border-none font-extralight">
                          <SelectValue placeholder="Select your milk" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup className="font-extralight">
                            <SelectLabel>Preffered Milk</SelectLabel>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="cow">Cow</SelectItem>
                            <SelectItem value="oat">Oat</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="frost-effect-button flex cursor-pointer gap-2 font-extralight text-white"
              variant="link"
            >
              SUBMIT ORDER <Coffee height={16} width={16} />
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
