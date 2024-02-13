"use client";

import { FC, useContext, useMemo } from "react";
import Button from "../../../../ui/button/button";
import { ModalContext } from "@/store/modal-store";
import { CartContext } from "@/store/cart-store";

interface CartButtonProps {
  productId: string;
}

const CartButton: FC<CartButtonProps> = ({ productId }) => {
  const { items, increaseQuantity } = useContext(CartContext);
  const { productModalToggle } = useContext(ModalContext);

  const cartItem = useMemo(
    () => items.find(el => el.id === productId),
    [productId, items]
  );

  return (
    <Button
      onClick={() => {
        if (cartItem?.color && cartItem?.size) {
          increaseQuantity(productId);
        }

        if (!cartItem) {
          productModalToggle(productId);
        }
      }}
      classes="bg-white border-none text-[#B88E2F] duration-700 hover:duration-700 hover:bg-[#B88E2F] hover:text-white"
      size="custom"
    >
      Add to cart
    </Button>
  );
};

export default CartButton;
