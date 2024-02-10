"use client";

import Typo from "@/components/ui/typography/typo";
import Link from "next/link";
import toast from "react-hot-toast";

export const useCustomToast = () => {
  const loginToast = () => {
    toast.custom(t => (
      <div
        className={`flex bg-[#fff] rounded-[16px] p-17 flex-col gap-12px border-[1px] border-solid ${
          t.visible ? "toast-animation-down" : "opacity-0"
        }`}
      >
        <Typo
          tag="h4"
          text="You need to be logged in to do that."
          color="error"
        />
        <button onClick={() => toast.dismiss(t.id)}>
          <Link
            className="bg-black_1 text-white_1 p-10 w-[80px] flex justify-center rounded-[8px]"
            href="/sign-in"
          >
            Log in
          </Link>
        </button>
      </div>
    ));
  };

  return { loginToast };
};
