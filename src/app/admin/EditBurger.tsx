"use client";
import { Button } from "~/app/_components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/app/_components/ui/dialog";
import { Input } from "~/app/_components/ui/input";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { UpdateBurgerSchema } from "~/lib/utils";
import { type Dispatch, type SetStateAction } from "react";
import { type SelectBurger } from "~/server/db/types";
import { Checkbox } from "~/app/_components/ui/checkbox";

export function EditBurger({
  burger,
  setOpen,
}: {
  burger: SelectBurger;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof UpdateBurgerSchema>>({
    resolver: zodResolver(UpdateBurgerSchema),
    defaultValues: { ...burger, rating: burger.rating?.toString() },
  });

  const { mutate } = api.burger.updateBurger.useMutation({
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  function handleSubmit(values: z.infer<typeof UpdateBurgerSchema>) {
    mutate(values);
  }

  return (
    <DialogContent className="max-h-[95%] overflow-y-scroll sm:max-h-[80%] sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>Edit Resturant</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormLabel className="cursor-pointer">Is Published</FormLabel>
                <FormControl>
                  <Checkbox
                    onCheckedChange={field.onChange}
                    checked={field.value ?? false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </DialogContent>
  );
}
