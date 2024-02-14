"use client";

import Button from "@/components/ui/button/button";
import { FormEvent, useRef } from "react";
import toast from "react-hot-toast";

const FooterForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Successfully subscribed");
    ref.current?.reset();
  };
  return (
    <form
      ref={ref}
      className="flex xl:items-center items-end xl:flex-row flex-col gap-12px"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <input
          placeholder="Enter Your Email Address"
          className="outline-none border-b-[1px]  border-solid border-black_1 pb-10 text-14 leading-normal xl:w-[200px] w-full font-normal text-grey_2"
          id="email"
          name="email"
          type="email"
        />
      </div>

      <Button type="submit" size="subscribe">
        SUBSCRIBE
      </Button>
    </form>
  );
};

export default FooterForm;
