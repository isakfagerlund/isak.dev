import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowBigLeft } from "lucide-react";

export const BackButton = ({ href }: { href: string }) => {
  return (
    <div className="fixed bottom-3 right-5 z-10 sm:hidden">
      <Button asChild variant="default">
        <Link href={href}>
          <ArrowBigLeft />
        </Link>
      </Button>
    </div>
  );
};
