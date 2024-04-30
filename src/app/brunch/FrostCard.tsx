"use client";

import { Imbue } from "next/font/google";
import { Ticket } from "./Ticket";
import { Button } from "../_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../_components/ui/dropdown-menu";
import { Coffee, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const imbue = Imbue({
  subsets: ["latin"],
  variable: "--font-imbue",
});

export const FrostCard = ({
  visitors,
}: {
  visitors: number | null | undefined;
}) => {
  return (
    <motion.div
      className="cursor-grab"
      drag
      dragConstraints={{
        top: -50,
        left: -50,
        right: 50,
        bottom: 50,
      }}
    >
      <div className="frost-effect z-10 flex h-[400px] w-full max-w-[600px] flex-col justify-between rounded-xl p-4">
        {visitors && <Ticket visitors={visitors} />}
        <div className={`flex flex-col ${imbue.variable}`}>
          <h3
            style={{ fontFamily: "var(--font-imbue)" }}
            className="text-5xl text-[#FFCB13]"
          >
            Saturday
          </h3>
          <h3
            style={{ fontFamily: "var(--font-imbue)" }}
            className="text-5xl opacity-60"
          >
            25th May
          </h3>
          <h5
            className="text-2xl text-[#FFCB13]"
            style={{ fontFamily: "var(--font-imbue)" }}
          >
            11am
          </h5>
        </div>
        <div className="flex w-full flex-col gap-2 font-[100] sm:w-2/3">
          <p>
            you are invited to{" "}
            <span className="font-extralight">Isak&apos;s</span> tech brunch
          </p>
          <hr />
          <p>
            a place to chat about <span className="font-extralight">tech</span>{" "}
            with like minded people while enjoying some delicious{" "}
            <span className="font-extralight">coffee</span>
          </p>
        </div>

        <div className="flex justify-between gap-2">
          <Link className="w-full flex-grow" href="/brunch/coffee">
            <Button
              className="frost-effect-button flex w-full gap-2 font-extralight text-white"
              variant="link"
            >
              ORDER COFFEE <Coffee height={16} width={16} />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="frost-effect-button flex gap-2 font-extralight text-white"
                variant="link"
              >
                GET DIRECTIONS <Navigation height={16} width={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="frost-effect dark w-56 border-none">
              <DropdownMenuLabel>Select Maps option</DropdownMenuLabel>

              <DropdownMenuItem asChild>
                <a
                  href="https://maps.app.goo.gl/cgMkp1gfhjSKDtoG6"
                  target="_blank"
                  className="cursor-pointer"
                >
                  Google maps
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={`https://maps.apple.com/?q=frankfurter+allee+108+berlin`}
                  target="_blank"
                  className="cursor-pointer"
                >
                  Apple Maps
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
};
