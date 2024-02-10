"use client";

import Button from "@/components/ui/button/button";
import { CartContext } from "@/store/cart-store";
import { NotificationContext } from "@/store/notification-store";
import { ProductType } from "@/types";
import { FC, useCallback, useContext, useMemo, useState } from "react";

interface ProductCartButtonProps {
  item: ProductType;
}

const ProductCartButton: FC<ProductCartButtonProps> = ({
  item,
}: ProductCartButtonProps) => {
  const [number, setNumber] = useState(0);
  const { addItem } = useContext(CartContext);
  const { toggle } = useContext(NotificationContext);

  const handleClick = useCallback((action: string) => {
    if (action === "+") {
      setNumber(prev => prev + 1);
    } else {
      setNumber(prev => {
        return Math.max(prev - 1, 0);
      });
    }
  }, []);

  const cartData = useMemo(() => {
    if (number > 0) {
      return { ...item, quantity: number };
    }

    return item;
  }, [number, item]);

  return (
    <>
      <div className="inline-flex items-center gap-16px mt-32">
        <button
          type="button"
          className="w-[123px] h-[64px] border-[1px] border-solid border-[#9F9F9F] flex justify-between items-center rounded-[10px] px-14"
        >
          <span
            className="w-[20px] text-20 justify-center flex items-center"
            onClick={() => handleClick("-")}
          >
            -
          </span>
          {number}
          <span
            className="w-[20px] text-20 justify-center  h-[20px] flex items-center"
            onClick={() => handleClick("+")}
          >
            +
          </span>
        </button>
        <Button
          onClick={() => {
            addItem(cartData);
            setNumber(0);
            toggle("add", true);
          }}
          size="default"
        >
          Add to cart
        </Button>
      </div>
    </>
  );
};

export default ProductCartButton;
