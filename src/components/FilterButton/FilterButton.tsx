import { FilterButtonProps } from "@/types";
import Button from "../ui/button/button";
import Typo from "../ui/typography/typo";

const FilterButton = ({ title, onClick, isActive }: FilterButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border-r border-r-grey_2 flex justify-center"
    >
      <Button size="filter">
        <Typo
          type="labelM"
          text={title}
          color={isActive ? "black_1" : "grey_3"}
        />
      </Button>
    </div>
  );
};

export default FilterButton;
