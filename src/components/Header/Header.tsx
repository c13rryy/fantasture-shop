"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "../ui/Icon/Icon";
import HeaderActions from "./HeaderActions";
import NavBar from "./NavBar";
import HeaderButton from "./HeaderButton";
import HeaderMenu from "./HeaderMenu";
import Typo from "../ui/typography/typo";
import useScroll from "@/hooks/useScroll";
import classNames from "classnames";
import Link from "next/link";
import { Session } from "next-auth";
import UserAccountMenu from "../Modals/UserAccountMenu/UserAccountMenu";

interface HeaderProp {
  session: Session | null;
}

const Header = ({ session }: HeaderProp) => {
  const [open, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);

  const value = useScroll();

  useEffect(() => {
    if (value.y > 200) {
      setShow(false);
    } else {
      setShow(true);
    }

    if (value.lastY > value.y) {
      setShow(true);
    }
  }, [value.lastY, value.y]);

  const handleOpen = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <header
        className={classNames(
          "lg:px-56 xl:px-34 sm:px-24 px-17 z-[80] w-full shadow-lg bg-white h-[100px] flex items-center justify-between fixed",
          {
            " -translate-y-full transition-all duration-500": !show,
          },
          {
            "translate-y-0 transition-all duration-500": show,
          }
        )}
      >
        <div>
          <Link href="/" className="flex items-center gap-6px">
            <Icon icon="logo" size={52} height={45} viewBox="0 0 52 45" />
            <Typo text="Fantasture" type="logo" color="[#000]" />
          </Link>
        </div>
        <div className="xl:block hidden">
          <NavBar />
        </div>
        <div className="xl:block hidden">
          <HeaderActions session={session} />
        </div>
        <div className="xl:hidden block">
          <HeaderButton onToggle={handleOpen} isOpen={open} />
        </div>
      </header>
      <HeaderMenu session={session} isOpen={open} closeMenu={handleClose} />
      {session?.user && <UserAccountMenu user={session?.user} />}
    </>
  );
};

export default Header;
