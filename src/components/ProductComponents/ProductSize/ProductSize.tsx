"use client";

import Typo from "@/components/ui/typography/typo";
import { ProductType } from "@/types";
import { Size } from "@prisma/client";
import classNames from "classnames";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface ProductSizeProps {
  sizes: Size[] | undefined;
  onSelectSize: (size: string) => void;
  disableButton?: ProductType;
}

const ProductSize: FC<ProductSizeProps> = ({
  sizes,
  onSelectSize,
  disableButton,
}) => {
  const [activeSize, setActiveSize] = useState<string>("");
  const isSizeActive = (sizeName: string) => activeSize === sizeName;

  const handleClick = (sizeName: string) => {
    setActiveSize(() => {
      return isSizeActive(sizeName) ? "" : sizeName;
    });

    onSelectSize(activeSize === sizeName ? "" : sizeName);
  };

  return (
    <div>
      <Typo text="Size" type="sectionP" color="grey_3" />
      <div className="flex items-center gap-16px">
        {sizes?.map(item => (
          <button
            type="button"
            onClick={() => {
              if (disableButton)
                return toast.error("item is already in the cart");
              if (!disableButton) {
                handleClick(item.sizeValue);
              }
            }}
            className={classNames(
              "w-[30px] h-[30px] flex items-center justify-center rounded-[5px] cursor-pointer",
              {
                "bg-[#F9F1E7]": !isSizeActive(item.sizeValue),
                "bg-[#7F4E25B2] text-white": isSizeActive(item.sizeValue),
              }
            )}
            key={item.id}
          >
            <Typo
              type="customTypo"
              className="text-[13px] font-normal leading-normal uppercase"
              text={item.sizeValue}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSize;
