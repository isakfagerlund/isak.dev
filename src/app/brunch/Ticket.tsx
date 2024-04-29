"use client";

import { TicketCheck } from "lucide-react";
import { increaseTicket } from "./actions";
import { Button } from "../_components/ui/button";
import { toast } from "sonner";

export const Ticket = ({ visitors }: { visitors: number }) => {
  const parsedVisitors = () => {
    if (visitors < 10) {
      return "00" + visitors;
    } else if (visitors < 100) {
      return "0" + visitors;
    } else {
      return visitors;
    }
  };

  return (
    <Button
      onClick={async () => {
        await increaseTicket();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        toast("Ticket number increased using React Server Actions");
      }}
      variant="ghost"
      className="absolute right-4 flex cursor-pointer gap-2 opacity-60"
    >
      <TicketCheck />
      <p>#{parsedVisitors()}</p>
    </Button>
  );
};
