/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState } from "react";

type ModalType = "cartModal" | "subModal" | "accountModal" | "searchModal";

interface ProductModalProps {
  [key: string]: boolean;
}
export const ModalContext = createContext<{
  open: {
    cartModal: boolean;
    subModal: boolean;
    accountModal: boolean;
    searchModal: boolean;
  };
  productOpen: ProductModalProps;
  toggle: (modalType: ModalType) => void;
  productModalToggle: (activeId: string) => void;
}>({
  open: {
    cartModal: false,
    subModal: false,
    accountModal: false,
    searchModal: false,
  },
  toggle: (modalType: ModalType) => {},
  productModalToggle: (activeId: string) => {},
  productOpen: {},
});

export function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState({
    cartModal: false,
    subModal: false,
    accountModal: false,
    searchModal: false,
  });

  const [productOpen, setProductOpen] = useState<ProductModalProps>({});

  function handleToggle(modalType: ModalType) {
    setIsOpen(prev => {
      if (modalType === "cartModal") {
        return { ...prev, cartModal: !prev.cartModal };
      }

      if (modalType === "subModal") {
        return { ...prev, subModal: !prev.subModal };
      }

      if (modalType === "accountModal") {
        return { ...prev, accountModal: !prev.accountModal };
      }

      if (modalType === "searchModal") {
        return { ...prev, searchModal: !prev.searchModal };
      }

      return prev;
    });
  }

  function productModalToggle(id: string) {
    setProductOpen(prevState => ({
      ...prevState,
      [id]: !prevState[id], // инвертируем состояние модального окна для данного продукта
    }));
  }

  const modalCtx = {
    toggle: handleToggle,
    open: isOpen,
    productModalToggle,
    productOpen,
  };

  return (
    <ModalContext.Provider value={modalCtx}>{children}</ModalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(ModalContext);
