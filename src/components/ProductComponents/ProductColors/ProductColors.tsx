"use client";

import { Icon } from "@/components/ui/Icon/Icon";
import Typo from "@/components/ui/typography/typo";
import { ProductType } from "@/types";
import { Color } from "@prisma/client";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface ProductColorsProps {
  colors: Color[] | undefined;
  onSelectColor: (color: string) => void;
  disableButton?: ProductType;
}

const ProductColors: FC<ProductColorsProps> = ({
  colors,
  onSelectColor,
  disableButton,
}) => {
  const [activeColor, setActiveColor] = useState<string>("");
  const isColorActive = (colorValue: string) => activeColor === colorValue;

  const handleClick = (colorValue: string) => {
    setActiveColor(() => {
      return isColorActive(colorValue) ? "" : colorValue;
    });
    onSelectColor(activeColor === colorValue ? "" : colorValue);
  };
  return (
    <div>
      <Typo text="Color" type="sectionP" color="grey_3" />
      <div className="flex items-center gap-16px mt-[12px]">
        {colors?.map(color => (
          <button
            key={color.id}
            className="w-[30px] h-[30px] flex justify-center items-center rounded-[50%]"
            onClick={() => {
              if (disableButton)
                return toast.error("item is already in the cart");
              if (!disableButton) {
                handleClick(color.value);
              }
            }}
            style={{
              background: color.value,
            }}
          >
            {" "}
            {isColorActive(color.value) && (
              <Icon icon="cart-tick" size={16} />
            )}{" "}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductColors;
