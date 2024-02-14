"use client";

import { Icon } from "@/components/ui/Icon/Icon";
import { useCustomToast } from "@/hooks/useCustomToast";
import { SubPayload } from "@/lib/validators/subscribe";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { FC, startTransition, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SubscribeButtonProps {
  productId: string;
  isSubscribed: boolean | null;
}

const SubscribeButton: FC<SubscribeButtonProps> = ({
  productId,
  isSubscribed,
}) => {
  const [isActive, setIsActive] = useState(isSubscribed);
  const { loginToast } = useCustomToast();

  const router = useRouter();
  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: async () => {
      const payload: SubPayload = {
        productId,
      };

      const { data } = await axios.post("/api/product/subscribe", payload);

      return data as string;
    },

    onError: err => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast.error("Could not subscribe to product");
    },
    onSuccess: data => {
      startTransition(() => {
        router.refresh();
      });

      if (data === "Delete") {
        return toast.success("You successfully usubscribed from this product");
      }

      return toast.success("You successfully subscribed to product");
    },
  });

  useEffect(() => {
    setIsActive(isSubscribed);
  }, [isSubscribed]);

  function handleClick() {
    if (typeof isSubscribed === "boolean") {
      setIsActive(prev => !prev);
    }
  }

  return (
    <button
      onClick={() => {
        subscribe();
        handleClick();
      }}
      className="flex cursor-pointer items-center gap-[4px]"
      disabled={isPending}
    >
      <Icon
        icon="like"
        size={16}
        viewBox="0 0 16 16"
        className={classNames(
          { "sub-color transition-all": isActive },
          { "bg-default-icon-color transition-all": !isActive }
        )}
      />
      <span className="text-white text-16 font-semibold leading-6">Like</span>
    </button>
  );
};

export default SubscribeButton;
