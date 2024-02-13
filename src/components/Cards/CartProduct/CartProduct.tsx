import ProductPrice from "@/components/ProductComponents/ProductPrice/ProductPrice";
import Typo from "@/components/ui/typography/typo";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface CartProductProps {
  imgSrc: string | StaticImageData;
  title: string;
  description: string;
  price: string;
  discount?: string;
  color: string;
  size: string;
}

const CartProduct: FC<CartProductProps> = ({
  imgSrc,
  title,
  description,
  price,
  discount,
  color,
  size,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex sm:gap-24px gap-12px mt-10 border-solid items-center">
        <div className="relative xl:w-[200px] xl:h-[200px] mds:w-[150px] mds:h-[150px] w-[100px] h-[100px] rounded-[16px] bg-grey_2">
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover rounded-[16px]"
          />
        </div>
        <div className="flex flex-col gap-10px">
          <Typo type="sectionP" text={title} />
          <Typo type="mediumP" text={description} color="grey_3" />
          <div className="flex items-center gap-10px">
            <div
              className={`w-[30px] h-[30px] rounded-[50%]`}
              style={{ background: color }}
            />
            <div className="bg-[#F9F1E7] px-6 py-[2px] rounded-[2px] w-fit cursor-pointer">
              <Typo type="mediumP" text={size} />
            </div>
          </div>
        </div>
      </div>
      <ProductPrice type="page" discount={discount} price={price} />
    </div>
  );
};

export default CartProduct;
