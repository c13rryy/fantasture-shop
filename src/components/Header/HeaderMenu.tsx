import { NAVBAR_LINKS } from "@/data/navigations";
import classNames from "classnames";
import Link from "next/link";
import HeaderActions from "./HeaderActions";
import { Session } from "next-auth";
import { useContext, useEffect } from "react";
import { ModalContext } from "@/store/modal-store";

interface HeaderMenuProps {
  isOpen: boolean;
  closeMenu: () => void;
  session: Session | null;
}

const HeaderMenu = ({ isOpen, closeMenu, session }: HeaderMenuProps) => {
  const { open } = useContext(ModalContext);

  useEffect(() => {
    if (open) {
      closeMenu();
    }
  }, [closeMenu, open]);
  return (
    <nav
      className={classNames(
        "fixed inset-[0] z-[60] flex flex-col  overflow-y-auto  transition-all duration-500  justify-between pt-120  bg-[#fff]  px-22 md:hidden",
        {
          "pointer-events-none invisible opacity-0": !isOpen,
        }
      )}
    >
      <ul className="flex flex-col gap-32px pt-22">
        {NAVBAR_LINKS.map(item => (
          <li key={item.value}>
            <Link
              onClick={() => closeMenu()}
              href={`${item.href}`}
              aria-label={`Go to the ${item.value} page`}
            >
              <h3 className="text-black_1 text-24 uppercase font-semibold leading-6">
                {item.value}
              </h3>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mb-56">
        <HeaderActions closeMenu={closeMenu} session={session} />
      </div>
    </nav>
  );
};

export default HeaderMenu;
