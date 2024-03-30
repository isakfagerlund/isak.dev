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
import { Textarea } from "~/app/_components/ui/textarea";
import { InsertCafeSchema } from "~/lib/utils";
import { useState } from "react";
import { RefreshCcwIcon } from "lucide-react";

export function AddCafe({ refetchCafes }: { refetchCafes: () => unknown }) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof InsertCafeSchema>>({
    resolver: zodResolver(InsertCafeSchema),
  });

  const { mutate, isPending } = api.cafes.addCafe.useMutation({
    onSuccess: () => {
      setOpen(false);
      refetchCafes();
    },
  });

  function handleSubmit(values: z.infer<typeof InsertCafeSchema>) {
    mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex w-full justify-between py-2">
        <h3 className="text-xl font-bold">Cafes</h3>
        <Button onClick={() => setOpen(true)}>Add new Cafe</Button>
      </div>
      <DialogContent className="max-h-[95%] overflow-y-scroll sm:max-h-[80%] sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add a new cafe</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="cafeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cafe name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit">
              {isPending ? (
                <RefreshCcwIcon className="animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
