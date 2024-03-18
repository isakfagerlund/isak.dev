"use client";
import { useState } from "react";
import { Button } from "~/app/_components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/app/_components/ui/dialog";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { type SelectBurger } from "~/server/db/schema";
import { api } from "~/trpc/react";

export function EditBurger({ burger }: { burger: SelectBurger }) {
  const [name, setName] = useState(burger?.resturantName ?? "");
  const { mutate } = api.burger.updateBurger.useMutation();

  function handleSubmit() {
    mutate({ ...burger, resturantName: name });
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when youre done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="resturantName" className="text-right">
            Resturant name
          </Label>
          <Input
            onChange={(e) => setName(e.target.value)}
            id="resturantName"
            defaultValue={name ?? ""}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="rating" className="text-right">
            Rating
          </Label>
          <Input
            id="rating"
            type="number"
            min={1}
            max={5}
            defaultValue={burger?.rating ?? ""}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit} type="submit">
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
