"use client";

import ProductColors from "@/components/ProductComponents/ProductColors/ProductColors";
import Button from "@/components/ui/button/button";
import ProductSize from "@/components/ProductComponents/ProductSize/ProductSize";
import { CartContext } from "@/store/cart-store";
import { NotificationContext } from "@/store/notification-store";
import { ProductType } from "@/types";
import { Color, Size } from "@prisma/client";
import { FC, useCallback, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";

interface ProductCharacteristicProps {
  item: ProductType | null;
  colors: Color[];
  sizes: Size[];
}

const ProductCharacteristic: FC<ProductCharacteristicProps> = ({
  item,
  colors,
  sizes,
}) => {
  const [number, setNumber] = useState(0);
  const [productColor, setProductColor] = useState<string | null>(null);
  const [productSize, setProductSize] = useState<string | null>(null);
  const { addItem, items: cartItems } = useContext(CartContext);
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

  const handleProductSize = useCallback(
    (size: string) => setProductSize(size),
    []
  );

  const handleProductColor = useCallback(
    (color: string) => setProductColor(color),
    []
  );

  const check = useMemo(
    () => cartItems.find(el => el.id === item?.id),
    [item, cartItems]
  );

  const cartData = useMemo(() => {
    if (item && productColor && productSize) {
      if (number > 0) {
        return {
          ...item,
          quantity: number,
          color: productColor,
          size: productSize,
        };
      }

      return { ...item, color: productColor, size: productSize };
    }
  }, [number, item, productSize, productColor]);

  return (
    <div>
      <div className="flex flex-col gap-10px">
        <ProductColors
          disableButton={check}
          colors={colors}
          onSelectColor={handleProductColor}
        />
        <ProductSize
          disableButton={check}
          sizes={sizes}
          onSelectSize={handleProductSize}
        />
      </div>
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
            if (!productColor || !productSize)
              return toast.error("Pick all missing data");
            if (cartData && productColor && productSize) {
              addItem(cartData);
            }
            if (!check) {
              toggle("add", true);
            }
            setNumber(0);
          }}
          size="default"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCharacteristic;
