import { calculateDiscountPrice, currencyFormatter } from "@/lib/utils";
import classNames from "classnames";
import { FC } from "react";

interface ProductPriceProps {
  price: string;
  discount?: string;
  type: "page" | "modal";
}

const ProductPrice: FC<ProductPriceProps> = ({ price, discount, type }) => {
  return (
    <div className="flex flex-col gap-6px">
      <span
        className={classNames(
          "text-grey_3 ",
          {
            "line-through": discount,
          },
          {
            "text-20 font-semibold": type === "page",
          },
          {
            "text-16  font-medium": type === "modal",
          }
        )}
      >
        {currencyFormatter.format(parseInt(price))}
      </span>
      {discount && (
        <span
          className={classNames(
            "text-grey_3 leading-7",
            {
              "text-20 font-semibold": type === "page",
            },
            {
              "text-16  font-medium": type === "modal",
            }
          )}
        >
          {currencyFormatter.format(
            Number(price) - calculateDiscountPrice(price, discount)
          )}
        </span>
      )}
    </div>
  );
};

export default ProductPrice;
