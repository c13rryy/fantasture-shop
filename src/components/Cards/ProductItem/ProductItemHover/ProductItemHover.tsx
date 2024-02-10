import { Icon } from "@/components/ui/Icon/Icon";
import SubscribeButton from "./SubscribeButton/SubscribeButton";
import Link from "next/link";
import CartButton from "@/components/CartButton/CartButton";

interface ProductItemHoverProps {
  productId: string;
  isSubscribed: boolean | null;
}

const ProductItemHover = ({
  productId,
  isSubscribed,
}: ProductItemHoverProps) => {
  return (
    <div className="absolute top-[0px] bg-customGray duration-1000 hover:opacity-[1] transition-opacity hover:duration-1000 hover:transition-opacity opacity-0  left-[0px] w-full h-full flex flex-col items-center justify-center gap-24px">
      <CartButton productId={productId} />
      <div className="flex gap-[20px] items-center">
        <div className="cursor-pointer flex items-center gap-[2px]">
          <Icon icon="share" size={16} viewBox="0 0 16 16" />
          <span className="text-white text-16 font-semibold leading-6">
            Share
          </span>
        </div>
        <SubscribeButton isSubscribed={isSubscribed} productId={productId} />
      </div>
      <Link
        className="text-white_3 bg-none hover:bg-black_1 p-14 duration-700 hover:duration-700 rounded-[20px] flex items-center gap-4px font-semibold"
        href={`/shop/${productId}`}
      >
        More details
        <Icon icon="arrow" size={24} />
      </Link>
    </div>
  );
};

export default ProductItemHover;
