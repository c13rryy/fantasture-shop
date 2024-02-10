import Image, { StaticImageData } from "next/image";
import ProductItemHover from "./ProductItemHover/ProductItemHover";
import { forwardRef } from "react";
import { ProductType } from "@/types";
import Typo from "@/components/ui/typography/typo";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import { Icon } from "@/components/ui/Icon/Icon";
import ProductModal from "@/components/Modals/ProductModal/ProductModal";

interface ProductItemProps {
  title: string;
  description: string;
  price: string;
  imgSrc: string | StaticImageData;
  productId: string;
  isSubscribed: boolean | null;
  discount?: string;
  cartItem: ProductType;
  voteAmt: number;
}

const ProductItem = forwardRef<HTMLDivElement, ProductItemProps>(
  (
    {
      title,
      description,
      price,
      imgSrc,
      productId,
      isSubscribed,
      cartItem,
      discount,
      voteAmt,
    },
    ref
  ) => {
    return (
      <>
        <div ref={ref} className="relative">
          <div>
            <div className="relative mds:h-[301px] h-[250px]   bg-grey_2">
              <Image
                src={imgSrc}
                alt={title}
                fill
                sizes="100vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-8px w-[132px] pb-22 mt-10">
              <h4 className="text-24 font-semibold leading-7 text-grey_3">
                {title}
              </h4>
              <p className="text-16 font-medium leading-6 text-grey_4">
                {description}
              </p>
              <ProductPrice type="page" discount={discount} price={price} />
            </div>
          </div>
          <ProductItemHover isSubscribed={isSubscribed} productId={productId} />
          {discount && (
            <div className="absolute top-8px right-8px w-[45px] h-[45px] flex justify-center items-center rounded-[50%] bg-[#f31e1e9a]">
              <Typo type="mediumP" text={`${discount}%`} color="white" />
            </div>
          )}

          <div className="absolute top-8px left-8px flex items-center justify-center gap-6px bg-grey_3 w-[65px] py-4 rounded-[8px]">
            <Typo
              tag="h4"
              text={parseFloat(voteAmt.toFixed(1))}
              color="white"
            />
            <div>
              <Icon icon="star" size={24} color="#d09e23" fill="#d09e23" />
            </div>
          </div>
        </div>
        <ProductModal item={cartItem} />
      </>
    );
  }
);

ProductItem.displayName = "ProductItem";

export default ProductItem;
