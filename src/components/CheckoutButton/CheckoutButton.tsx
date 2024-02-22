"use client";

import { useSearchParams } from "next/navigation";
import Button from "../ui/button/button";
import { useContext, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { CartContext } from "@/store/cart-store";
import { useMutation } from "@tanstack/react-query";
import { CheckoutPayload } from "@/lib/validators/checkout";
import axios from "axios";

interface CheckoutButtonProps {}

const CheckoutButton = ({}: CheckoutButtonProps) => {
  const searchParams = useSearchParams();
  const { items, clearCart } = useContext(CartContext);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");
      clearCart();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const productData = useMemo(
    () =>
      items.map(item => ({
        productId: item.id,
        quantity: item.quantity ?? 0,
      })),
    [items]
  );

  const { mutate: checkout } = useMutation({
    mutationFn: async () => {
      const payload: CheckoutPayload = {
        productData,
      };

      const { data } = await axios.post("/api/products/checkout", payload);

      return data as Location;
    },
    onSuccess: data => {
      window.location = data;
    },
  });
  return (
    <Button onClick={() => checkout()} classes="w-full" size="large">
      Checkout
    </Button>
  );
};

export default CheckoutButton;
