import ProductPrice from "@/components/ProductComponents/ProductPrice/ProductPrice";
import Typo from "@/components/ui/typography/typo";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface MiniProductProps {
  imgSrc: string | StaticImageData;
  title: string;
  description: string;
  price: string;
  discount?: string;
}

const MiniProduct: FC<MiniProductProps> = ({
  imgSrc,
  title,
  description,
  price,
  discount,
}) => {
  return (
    <div className="flex gap-24px mt-10 border-solid items-center">
      <div className="relative w-[100px] h-[100px] rounded-[16px] bg-grey_2">
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
        <Typo type="mediumP" text={description} />
        <ProductPrice type="modal" discount={discount} price={price} />
      </div>
    </div>
  );
};

export default MiniProduct;
