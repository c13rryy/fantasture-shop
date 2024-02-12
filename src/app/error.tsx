"use client";

import Button from "@/components/ui/button/button";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();
  return (
    <section className="flex absolute top-[50%] w-full justify-center">
      <div className="flex sm:flex-row flex-col items-center sm:gap-24px gap-16px">
        <h1 className="sm:text-[45px] mds:text-[40px] text-[20px] uppercase font-bold text-black_1">
          Something went wrong!
        </h1>

        <Button
          classes="mds:w-fit w-full"
          onClick={() => {
            router.back();
          }}
          size="subscribe"
        >
          Go back
        </Button>
      </div>
    </section>
  );
}
