import { Icon } from "@/components/ui/Icon/Icon";
import classNames from "classnames";

type Props = {
  isReversed?: boolean;
  className?: string;
  onClick: () => void;
};

const SliderArrow = ({ isReversed, className, onClick }: Props) => {
  return (
    <button
      type="button"
      className={classNames(
        "flex-shrink-0 bg-white rounded-[50%] flex justify-center items-center w-[48px] h-[48px] transition-opacity duration-300 hover:opacity-60",
        isReversed && "relative rotate-180",
        className
      )}
      onClick={onClick}
      aria-label="navigation"
    >
      <Icon size={24} height={40} viewBox="0 0 24 24" icon="swiperArrow" />
    </button>
  );
};

export default SliderArrow;
