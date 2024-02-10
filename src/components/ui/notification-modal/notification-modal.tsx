"use client";

import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../Icon/Icon";
import Typo from "../typography/typo";
import { NotificationContext } from "@/store/notification-store";

const NotificationModal = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { notification, toggle } = useContext(NotificationContext);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      toggle(null, false);
    }, 700);

    return () => {
      clearTimeout(timeout);
    };
  }, [toggle]);

  if (!notification.open) {
    return null;
  }

  return isMounted
    ? createPortal(
        <div className="fixed z-[150] bottom-0px right-0px">
          <div className="bg-[#FFD49F] m-20 notification-animation rounded-[20px] w-fit p-20">
            <div className="flex items-center gap-8px">
              <Icon
                icon={
                  notification.action === "add" ? "cart-tick" : "cart-empty"
                }
                size={24}
              />
              <Typo
                tag="h4"
                text={
                  notification.action === "add"
                    ? "Successfully added"
                    : "Successfully removed"
                }
              />
            </div>
          </div>
        </div>,
        document.getElementById("notification-modal")!
      )
    : null;
};

export default NotificationModal;
