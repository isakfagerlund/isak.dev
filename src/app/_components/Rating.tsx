import { BurgerIcon } from "./BurgerIcon";

export const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-end gap-1">
      <BurgerIcon color={rating > 0} />
      <BurgerIcon color={rating > 1} />
      <BurgerIcon color={rating > 2} />
      <BurgerIcon color={rating > 3} />
      <BurgerIcon color={rating > 4} />
    </div>
  );
};
