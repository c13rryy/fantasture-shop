import Image from "next/image";
import Typo from "../../ui/typography/typo";
import { Suspense } from "react";
import ProductVoteServer from "../ProductVote/ProductVoteServer";
import { Icon } from "../../ui/Icon/Icon";
import { db } from "@/lib/db";
import CommentSection from "../../CommentSection/CommentSection";
import ProductPrice from "../ProductPrice/ProductPrice";
import CharacteristicSection from "../../CharacteristicSection/CharacteristicSection";

interface ProductDetailsProps {
  productId: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  fullDescription?: string;
  discount?: string;
}

const ProductDetails = ({
  productId,
  name,
  price,
  imageUrl,
  description,
  discount,
  fullDescription,
}: ProductDetailsProps) => {
  return (
    <>
      <div className="mt-32 grid sm:grid-cols-2 grid-cols-1 lg:gap-80px gap-40px">
        <div className="relative xl:h-[500px] sm:h-[450px] h-[400px] flex items-center rounded-[10px] bg-[#FDEBD6]">
          <div className="relative xl:h-[391px] mds:h-[370px] h-[300px] w-full">
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="100vw"
              loading="lazy"
              className="object-cover"
            />
          </div>
          {discount && (
            <div className="absolute top-[16px] right-[16px] w-[45px] h-[45px] flex justify-center items-center rounded-[50%] bg-[#f31e1e9a]">
              <Typo type="mediumP" text={`${discount}%`} color="white" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-10px">
          <Typo tag="h2" text={name} />
          <ProductPrice discount={discount} price={price} type="page" />
          <Suspense fallback={<ProductVoteShell />}>
            <ProductVoteServer
              productId={productId}
              getData={async () => {
                return await db.product.findUnique({
                  where: {
                    id: productId,
                  },
                  include: {
                    votes: true,
                  },
                });
              }}
            />
          </Suspense>
          <Typo
            type="customTypo"
            className="text-[13px] font-normal leading-normal"
            text={fullDescription ?? description}
          />
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full">
                <ProductVoteShell />
              </div>
            }
          >
            <CharacteristicSection productId={productId} />
          </Suspense>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <ProductVoteShell />
          </div>
        }
      >
        <CommentSection productId={productId} />
      </Suspense>
    </>
  );
};

function ProductVoteShell() {
  return (
    <div className="flex justify-center w-[50px]">
      <div className="animate-spin">
        <Icon icon="loader" size={24} />
      </div>
    </div>
  );
}

export default ProductDetails;
