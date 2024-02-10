"use client";

import CartProduct from "@/components/Cards/CartProduct/CartProduct";
import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import ProductQuantityButton from "@/components/ProductQuantityButton/ProductQuantityButton";
import Button from "@/components/ui/button/button";
import Section from "@/components/ui/section/section";
import Typo from "@/components/ui/typography/typo";
import { calculateDiscountPrice, currencyFormatter } from "@/lib/utils";
import { CartContext } from "@/store/cart-store";
import { NotificationContext } from "@/store/notification-store";
import classNames from "classnames";
import Link from "next/link";
import { useContext, useMemo } from "react";

const CartInfo = () => {
  const { items, clearCart } = useContext(CartContext);
  const { toggle } = useContext(NotificationContext);

  const cartTotal = useMemo(
    () =>
      items.reduce((value, cartItem) => {
        if (cartItem.discount) {
          return (
            value +
            calculateDiscountPrice(cartItem.price, cartItem.discount) *
              (cartItem.quantity ?? 1)
          );
        }
        return value + parseInt(cartItem.price) * (cartItem.quantity ?? 1);
      }, 0),
    [items]
  );

  const averageDiscount = useMemo(() => {
    const discount = items.reduce(
      (value, carItem) =>
        value + parseInt(carItem.discount ? carItem.discount : "0"),
      0
    );

    if (discount !== 0) {
      const productWithDiscount = items.filter(el => el.discount);

      return discount / productWithDiscount.length;
    }

    return 0;
  }, [items]);
  return (
    <Section>
      <MaxWidthWrapper
        className={classNames("xh:w-full w-[95%]", {
          "flex items-center flex-col": items.length === 0,
        })}
      >
        {items.length === 0 && (
          <>
            <Typo tag="h2" text={"Your cart is empty"} />
            <div className="flex flex-col justify-center sm:gap-24px gap-16px sm:mt-24 mt-[16px]">
              <Typo
                type="mediumP"
                text="To find products use search-bar or click for button"
                color="grey_3"
              />
              <Link
                className="p-10 bg-black_1 rounded-[15px] flex justify-center text-white font-semibold "
                href="/shop"
              >
                Shopping
              </Link>
            </div>
          </>
        )}
        {items.length > 0 && (
          <div className="grid xl:grid-cols-[1fr,400px] grid-cols-1 xl:gap-56px sm:gap-32px gap-[20px] sm:mt-20 mt-14">
            <div>
              <div className="flex justify-between items-center sm:mb-20 mb-14">
                <Typo tag="h2" text="Cart" />
                <Button
                  size="subscribe"
                  onClick={() => {
                    clearCart();
                    toggle("delete", true);
                  }}
                >
                  Clear Cart
                </Button>
              </div>
              <div className="border-t-[1px] border-b-[1px] sm:py-20 py-14 flex flex-col gap-24px border-solid">
                {items.map(item => (
                  <div className="flex flex-col gap-16px" key={item.id}>
                    <CartProduct
                      imgSrc={item.imageUrl}
                      title={item.name}
                      description={item.description}
                      price={item.price}
                      discount={item.discount ?? ""}
                      color={item.color ?? ""}
                      size={item.size ?? ""}
                    />
                    <ProductQuantityButton type="page" item={item} />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-20 flex flex-col gap-32px h-fit bg-[#FFD49F] rounded-[20px]">
              <div className="flex items-center justify-between">
                <Typo tag="h2" text="Total" />
                <Typo tag="h3" text={currencyFormatter.format(cartTotal)} />
              </div>
              <div className="flex items-center justify-between">
                <Typo tag="h4" text="Discount" color="grey_3" />
                <Typo
                  type="sectionP"
                  text={
                    averageDiscount > 0
                      ? `${averageDiscount}%`
                      : averageDiscount
                  }
                  color="grey_3"
                />
              </div>
              <Button classes="w-full" size="large">
                Checkout
              </Button>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </Section>
  );
};

export default CartInfo;
