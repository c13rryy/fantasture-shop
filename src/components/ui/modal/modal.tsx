"use client";

import { disableScroll } from "@/helpers/disableScroll";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  toggle: () => void;
}

const Modal = ({ children, isOpen, toggle }: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  const modalWindow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
    if (isOpen) {
      disableScroll(isOpen);
    }

    return () => {
      disableScroll(false);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        toggle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, toggle]);

  useOnClickOutside(modalWindow, () => toggle());

  if (!isOpen) {
    return null;
  }

  return mounted
    ? createPortal(
        <div className="fixed inset-[0] flex justify-end overflow-y-auto items-start z-[130] bg-[#000] bg-opacity-25 backdrop-blur-sm">
          <div
            ref={modalWindow}
            className="mds:w-[417px] w-full modal-animation bg-white sm:p-27 p-17"
          >
            {children}
          </div>
        </div>,
        document.getElementById("modal")!
      )
    : null;
};

export default Modal;
