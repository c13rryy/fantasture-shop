"use client";

import MiniProduct from "@/components/Cards/MiniProduct/MiniProduct";
import Modal from "@/components/ui/modal/modal";
import Typo from "@/components/ui/typography/typo";
import { ModalContext } from "@/store/modal-store";
import { FC, startTransition, useContext, useMemo, useState } from "react";
import { Product } from "@prisma/client";
import { Icon } from "@/components/ui/Icon/Icon";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { SubPayload } from "@/lib/validators/subscribe";
import Button from "@/components/ui/button/button";
import { CartContext } from "@/store/cart-store";
import ProductModal from "../ProductModal/ProductModal";
import { ProductType } from "@/types";
import toast from "react-hot-toast";

interface SubscribeModalProps {
  subData: Product[];
}

const SubscribeModal: FC<SubscribeModalProps> = ({ subData }) => {
  const { open, toggle, productModalToggle } = useContext(ModalContext);
  const { items } = useContext(CartContext);
  const [cartData, setCartData] = useState<null | ProductType>(null);

  const router = useRouter();
  const pathname = usePathname();

  const { mutate: unsubscribe, isPending } = useMutation({
    mutationFn: async ({ productId }: SubPayload) => {
      const payload: SubPayload = {
        productId,
      };

      const { data } = await axios.post("/api/product/subscribe", payload);

      return data as string;
    },
    onSuccess: data => {
      startTransition(() => {
        router.refresh();
      });

      if (data === "Delete") {
        return toast.success("You successfully usubscribed from this product");
      }
    },
  });

  function closeModal() {
    toggle("subModal");
  }

  const productIds = useMemo(() => subData.map(el => el.id), [subData]);
  return (
    <>
      <Modal isOpen={open.subModal} toggle={closeModal}>
        <div className="flex justify-between  items-center">
          <Typo tag="h3" text="Subscriptions" />
          <button
            onClick={() => {
              closeModal();
            }}
          >
            <Icon icon="close" size={24} />
          </button>
        </div>
        <div className="h-[500px] overflow-y-auto custom-scroll">
          <div className="border-t-[1px] flex flex-col gap-16px border-solid mt-14">
            {subData.length > 0 ? (
              subData.map(product => {
                const checkCart = items.find(el => el.id === product.id);
                return (
                  <div
                    className="flex items-center border-b-[1px] pb-10 justify-between"
                    key={product.id}
                  >
                    <MiniProduct
                      imgSrc={product.imageUrl}
                      title={product.name}
                      description={product.description}
                      price={product.price}
                      discount={product.discount ?? ""}
                    />
                    <div className="flex flex-col-reverse gap-8px pr-4">
                      <button
                        disabled={isPending}
                        onClick={() =>
                          unsubscribe({
                            productId: product.id,
                          })
                        }
                      >
                        <Icon icon="trash" size={24} />
                      </button>
                      <button
                        className="relative"
                        disabled={!!checkCart}
                        onClick={() => {
                          if (
                            pathname.slice(1) === "cart" ||
                            pathname.slice(1) === "contact" ||
                            pathname.slice(1).includes("shop/")
                          ) {
                            setCartData(product);
                          }
                          productModalToggle(product.id);
                          toggle("subModal");
                        }}
                      >
                        <Icon icon="cart" size={24} viewBox="0 0 28 29" />
                        <div className="absolute -top-[9px] -right-[4px]">
                          <Icon
                            icon={checkCart ? "cart-tick" : "cart-empty"}
                            size={13}
                            color={checkCart ? "#008000" : "#FF0000"}
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center mt-[170px] flex-col gap-10px">
                <Typo tag="h4" text="Subscribe to products" />
                <Icon icon="bot" size={60} />
                <Button classes="mt-20" size="small" onClick={closeModal}>
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
        {subData.length > 0 && (
          <div>
            <Button
              onClick={() => unsubscribe({ productId: productIds })}
              size="large"
              classes="w-full"
            >
              Unsubscribe from all
            </Button>
          </div>
        )}
      </Modal>
      {cartData && <ProductModal item={cartData} />}
    </>
  );
};

export default SubscribeModal;
