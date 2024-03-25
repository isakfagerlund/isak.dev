/* eslint-disable @next/next/no-img-element */

"use client";
import { Button } from "~/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/app/_components/ui/dialog";
import { Input } from "~/app/_components/ui/input";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { type z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { useRouter } from "next/navigation";
import { Textarea } from "~/app/_components/ui/textarea";
import { InsertBurgerSchema, cn } from "~/lib/utils";
import { CircleXIcon } from "lucide-react";
import { useState } from "react";

export function AddBurger() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof InsertBurgerSchema>>({
    resolver: zodResolver(InsertBurgerSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    // @ts-expect-error you are suppose to use array of objects, but this still works
    name: "images",
  });

  const { mutate } = api.burger.addBurger.useMutation({
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  function handleSubmit(values: z.infer<typeof InsertBurgerSchema>) {
    mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex w-full justify-end py-2">
        <Button onClick={() => setOpen(true)}>Add new Burger</Button>
      </div>
      <DialogContent className="max-h-[95%] overflow-y-scroll sm:max-h-[80%] sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add new burger</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="resturantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resturant name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <FormField
                    control={form.control}
                    name={`images.${index}`}
                    render={({ field }) => (
                      <div className="flex items-center gap-4">
                        <FormItem className="w-full">
                          <FormLabel className={cn(index !== 0 && "sr-only")}>
                            Images
                          </FormLabel>
                          <FormControl>
                            <Textarea {...field} value={field?.value ?? ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        <img
                          alt=""
                          className="h-full w-[50px] object-cover"
                          src={field.value}
                        />
                        <Button
                          variant="destructive"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          <CircleXIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append("")}
              >
                Add Image url
              </Button>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
