import { CartContext } from "@/store/cart-store";
import { ProductType } from "@/types";
import { FC, useContext } from "react";
import Typo from "../ui/typography/typo";
import { NotificationContext } from "@/store/notification-store";
import classNames from "classnames";

interface ProductQuantityButtonProps {
  item: ProductType;
  type: "modal" | "page";
}

const ProductQuantityButton: FC<ProductQuantityButtonProps> = ({
  item,
  type,
}) => {
  const { increaseQuantity, removeItem } = useContext(CartContext);
  const { toggle } = useContext(NotificationContext);

  return (
    <div
      className={classNames(
        "flex rounded-[16px] w-[100px] justify-center py-[2px] items-center  sm:gap-[14px] gap-8px bg-grey_2",
        { "w-[100px]": type === "modal" },
        {
          "xl:w-[200px] mds:w-[150px] w-[100px]": type === "page",
        }
      )}
    >
      <button
        className="text-white"
        onClick={() => {
          removeItem(item.id);
          if (item.quantity === 1) {
            toggle("delete", true);
          }
        }}
      >
        -
      </button>
      <Typo
        type="mediumP"
        text={item.quantity}
        color="white"
        className="w-[20px] flex justify-center"
      />
      <button className="text-white" onClick={() => increaseQuantity(item.id)}>
        +
      </button>
    </div>
  );
};

export default ProductQuantityButton;
