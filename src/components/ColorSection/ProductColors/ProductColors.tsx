"use client";

import { Icon } from "@/components/ui/Icon/Icon";
import Typo from "@/components/ui/typography/typo";
import { Color } from "@prisma/client";
import { FC, useState } from "react";

interface ProductColorsProps {
  colors: Color[] | undefined;
  onSelectColor: (color: string) => void;
}

const ProductColors: FC<ProductColorsProps> = ({ colors, onSelectColor }) => {
  const [activeColor, setActiveColor] = useState<string>("");
  const isColorActive = (colorValue: string) => activeColor === colorValue;

  const handleClick = (colorValue: string) => {
    setActiveColor(() => {
      return isColorActive(colorValue) ? "" : colorValue;
    });
    onSelectColor(colorValue);
  };
  return (
    <div>
      <Typo text="Color" type="sectionP" color="grey_3" />
      <div className="flex items-center gap-16px mt-[12px]">
        {colors?.map(color => (
          <button
            key={color.id}
            className="w-[30px] h-[30px] flex justify-center items-center rounded-[50%]"
            onClick={() => handleClick(color.value)}
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
