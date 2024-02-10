"use client";

import MiniProduct from "@/components/Cards/MiniProduct/MiniProduct";
import ProductQuantityButton from "@/components/ProductQuantityButton/ProductQuantityButton";
import { Icon } from "@/components/ui/Icon/Icon";
import Button from "@/components/ui/button/button";
import Modal from "@/components/ui/modal/modal";
import Typo from "@/components/ui/typography/typo";
import { calculateDiscountPrice, currencyFormatter } from "@/lib/utils";
import { ModalContext } from "@/store";
import { CartContext } from "@/store/cart-store";
import { NotificationContext } from "@/store/notification-store";
import Link from "next/link";
import { useContext, useMemo } from "react";

const CartModal = () => {
  const { open, toggle } = useContext(ModalContext);
  const { items, clearCart, deleteItem } = useContext(CartContext);
  const { toggle: openNotification } = useContext(NotificationContext);

  const totalPrice = useMemo(
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

  function closeModal() {
    toggle("cartModal");
  }
  return (
    <Modal isOpen={open.cartModal} toggle={closeModal}>
      <div className="flex justify-between border-b-[1px] border-solid pb-20 items-center">
        <Typo tag="h3" text="Cart" />
        <button
          onClick={() => {
            closeModal();
          }}
        >
          <Icon icon="close" size={24} />
        </button>
      </div>
      <div className="h-[500px] overflow-y-auto custom-scroll">
        {items.length === 0 && (
          <div className="flex items-center flex-col mt-[150px] gap-10px">
            <Typo tag="h4" text="Cart is empty" />
            <Icon icon="bot" size={60} />
            <Button classes="mt-20" size="small" onClick={closeModal}>
              Close
            </Button>
          </div>
        )}
        <div>
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-center border-b-[1px] pb-10 justify-between"
            >
              <div className="flex flex-col gap-12px">
                <MiniProduct
                  imgSrc={item.imageUrl}
                  title={item.name}
                  description={item.description}
                  price={item.price}
                  discount={item.discount ?? ""}
                />
                <ProductQuantityButton type="modal" item={item} />
              </div>

              <div className="flex flex-col-reverse gap-8px">
                <button
                  onClick={() => {
                    deleteItem(item.id);
                    openNotification("delete", true);
                  }}
                >
                  <Icon icon="trash" size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {items.length > 0 && (
        <div className="flex flex-col gap-12px">
          <div className="flex justify-between items-center">
            <Typo tag="h4" text="Total price" />
            <Typo
              type="sectionP"
              text={currencyFormatter.format(totalPrice)}
              color="grey_3"
            />
          </div>
          <div className="mt-30 flex flex-col gap-24px w-full">
            <Button onClick={() => closeModal()} classes="w-full" size="large">
              <Link href="/cart">Cart details</Link>
            </Button>
            <Button
              onClick={() => {
                clearCart();
                openNotification("delete", true);
              }}
              classes="w-full"
              size="large"
            >
              Clear cart
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CartModal;
