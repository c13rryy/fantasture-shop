import Link from "next/link";
import { Icon } from "../ui/Icon/Icon";
import Button from "../ui/button/button";
import { useContext, useMemo } from "react";
import { ModalContext } from "@/store/modal-store";
import { Session } from "next-auth";
import { CartContext } from "@/store/cart-store";

interface HeaderActionProp {
  session: Session | null;
  closeMenu?: () => void;
}

const HeaderActions = ({ session, closeMenu }: HeaderActionProp) => {
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
            <button
              aria-label="open-profile"
              onClick={() => toggle("accountModal")}
            >
              <Icon icon="profile" size={28} viewBox="0 0 28 28" />
            </button>
          </div>

          <div className="flex">
            <button aria-label="search" onClick={() => toggle("searchModal")}>
              <Icon icon="search" size={28} viewBox="0 0 28 28" />
            </button>
          </div>

          <div className="flex">
            <button
              aria-label="subscribe-modal"
              onClick={() => toggle("subModal")}
            >
              <Icon icon="headerLike" size={28} viewBox="0 0 28 28" />
            </button>
          </div>

          <div className="flex relative">
            <button aria-label="cart" onClick={() => toggle("cartModal")}>
              <Icon icon="cart" size={28} viewBox="0 0 28 28" />
            </button>

            <span className="absolute z-20 -right-[6px] bg-grey_1 text-white text-[10px] w-[15px] h-[15px] flex justify-center items-center rounded-[50%] font-normal -top-[11px]">
              {cartTotal}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center xl:justify-start justify-center gap-16px">
          <div className="flex">
            <button aria-label="search" onClick={() => toggle("searchModal")}>
              <Icon icon="search" size={28} viewBox="0 0 28 28" />
            </button>
          </div>
          <Link onClick={closeMenu} href="/sign-in">
            <Button aria-label="sign-in" classes="xl:w-fit w-full" size="small">
              Sign In
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default HeaderActions;
