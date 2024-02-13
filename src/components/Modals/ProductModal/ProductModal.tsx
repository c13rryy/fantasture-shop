"use client";

import ProductColors from "@/components/ProductComponents/ProductColors/ProductColors";
import { Icon } from "@/components/ui/Icon/Icon";
import Button from "@/components/ui/button/button";
import Typo from "@/components/ui/typography/typo";
import { disableScroll } from "@/helpers/disableScroll";
import ProductSize from "@/components/ProductComponents/ProductSize/ProductSize";
import { ModalContext } from "@/store/modal-store";
import { CartContext } from "@/store/cart-store";
import { NotificationContext } from "@/store/notification-store";
import { ProductType } from "@/types";
import { Color, Size } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

interface MissingData {
  productColor: Color[];
  productSize: Size[];
}

interface ProductModalProps {
  item: ProductType;
}

const ProductModal: FC<ProductModalProps> = ({ item }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [productColor, setProductColor] = useState<string | undefined>();
  const [productSize, setProductSize] = useState<string | undefined>();
  const { productOpen, productModalToggle } = useContext(ModalContext);
  const { addItem } = useContext(CartContext);
  const { toggle } = useContext(NotificationContext);

  useEffect(() => {
    setIsMounted(true);
    if (productOpen[item.id]) {
      disableScroll(productOpen[item.id]);
    }

    return () => {
      disableScroll(false);
    };
  }, [item.id, productOpen]);
  const {
    data: missingData,
    refetch,
    isFetched,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["missing-query"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/missing-data?id=${item.id}`);

      return data as MissingData;
    },
    enabled: false,
  });

  const handleProductSize = useCallback(
    (size: string) => setProductSize(size),
    []
  );

  const handleProductColor = useCallback(
    (color: string) => setProductColor(color),
    []
  );

  const cartData = useMemo(
    () => ({ ...item, color: productColor, size: productSize }),
    [item, productColor, productSize]
  );
  useEffect(() => {
    if (productOpen[item.id]) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id, productOpen]);

  useEffect(() => {
    if (isError) {
      toast.error("Could not fetch missing data");
    }
  }, [isError]);

  if (!productOpen[item.id]) {
    return null;
  }

  return isMounted
    ? createPortal(
        <div className="bg-[#0000008a] fixed flex justify-center items-center inset-[0] z-[150]">
          <div className="bg-white mds:w-[500px] w-full mds:m-[0px] m-20 rounded-[20px] product-amimation mds:p-20 p-14">
            <div className="flex justify-between">
              <Typo tag="h4" text="Select the missing data" />
              <button
                onClick={() => {
                  productModalToggle(item.id);
                }}
              >
                <Icon icon="close" size={20} />
              </button>
            </div>
            <div className="border-t-[1px] border-solid mt-6">
              <div className="mt-10 flex xs:flex-row flex-col xs:items-center items-start gap-24px">
                <div className="relative h-[200px] xs:w-[200px] w-full rounded-[10px] bg-grey_2">
                  <Image
                    src={item.imageUrl}
                    alt="product-image"
                    fill
                    className="object-cover rounded-[10px]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-6px">
                  <Typo type="sectionP" color="grey_3" text={item.name} />
                  {isLoading && (
                    <div className="w-[122px] flex justify-center items-center h-[138px]">
                      <div className="animate-spin">
                        <Icon icon="loader" size={24} />
                      </div>
                    </div>
                  )}
                  {isFetched && (
                    <ProductColors
                      onSelectColor={handleProductColor}
                      colors={missingData?.productColor}
                    />
                  )}
                  {isFetched && (
                    <ProductSize
                      onSelectSize={handleProductSize}
                      sizes={missingData?.productSize}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex xs:flex-row flex-col xs:mt-[0px] mt-20  xs:gap-6px gap-10px xs:justify-end justify-start">
              <Button
                onClick={() => productModalToggle(item.id)}
                size="subscribe"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  if (!productColor || !productSize)
                    return toast.error("Pick all missing data");
                  if (productColor && productOpen) {
                    addItem(cartData);
                    productModalToggle(item.id);
                    toggle("add", true);
                  }
                }}
                size="subscribe"
              >
                Add
              </Button>
            </div>
          </div>
        </div>,
        document.getElementById("product-modal")!
      )
    : null;
};

export default ProductModal;
