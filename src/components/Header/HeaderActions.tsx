import Link from "next/link";
import { Icon } from "../ui/Icon/Icon";
import Button from "../ui/button/button";
import { useContext, useMemo } from "react";
import { ModalContext } from "@/store";
import { Session } from "next-auth";
import { CartContext } from "@/store/cart-store";

interface HeaderActionProp {
  session: Session | null;
}

const HeaderActions = ({ session }: HeaderActionProp) => {
  const { toggle } = useContext(ModalContext);
  const { items } = useContext(CartContext);

  const cartTotal = useMemo(() => {
    if (items) {
      return items.reduce(
        (totalNumber, item) => totalNumber + (item.quantity ?? 0),
        0
      );
    }

    return 0;
  }, [items]);
  return (
    <>
      {session?.user ? (
        <div className="flex items-center xl:justify-start justify-center lg:gap-[45px] gap-32px">
          <div className="flex">
            <button onClick={() => toggle("accountModal")}>
              <Icon icon="profile" size={28} viewBox="0 0 28 28" />
            </button>
          </div>

          <div className="flex">
            <button onClick={() => toggle("searchModal")}>
              <Icon icon="search" size={28} viewBox="0 0 28 28" />
            </button>
          </div>

          <div className="flex">
            <button onClick={() => toggle("subModal")}>
              <Icon icon="headerLike" size={28} viewBox="0 0 28 28" />
            </button>
          </div>

          <div className="flex relative">
            <button onClick={() => toggle("cartModal")}>
              <Icon icon="cart" size={28} viewBox="0 0 28 28" />
            </button>

            <span className="absolute z-20 -right-[6px] bg-grey_1 text-white text-[10px] w-[15px] h-[15px] flex justify-center items-center rounded-[50%] font-normal -top-[11px]">
              {cartTotal}
            </span>
          </div>
        </div>
      ) : (
        <Link href="/sign-in">
          <Button size="small">Sign In</Button>
        </Link>
      )}
    </>
  );
};

export default HeaderActions;
