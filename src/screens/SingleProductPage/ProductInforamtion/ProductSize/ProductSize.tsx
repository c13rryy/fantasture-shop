"use client";

import Typo from "@/components/ui/typography/typo";
import { Size } from "@prisma/client";
import classNames from "classnames";
import { FC, useState } from "react";

interface ProductSizeProps {
  sizes: Size[] | undefined;
  onSelectSize: (size: string) => void;
}

const ProductSize: FC<ProductSizeProps> = ({ sizes, onSelectSize }) => {
  const [activeSize, setActiveSize] = useState<string>("");
  const isSizeActive = (sizeName: string) => activeSize === sizeName;

  const handleClick = (sizeName: string) => {
    setActiveSize(() => {
      return isSizeActive(sizeName) ? "" : sizeName;
    });

    onSelectSize(sizeName);
  };

  return (
    <div>
      <Typo text="Size" type="sectionP" color="grey_3" />
      <div className="flex items-center gap-16px">
        {sizes?.map(item => (
          <button
            type="button"
            onClick={() => handleClick(item.sizeValue)}
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
