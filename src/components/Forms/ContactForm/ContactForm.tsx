"use client";

import { getInTouch } from "@/actions/getInTouch";
import Input from "@/components/ui/input/input";
import Textarea from "@/components/ui/textarea/textarea";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SubmitButton from "../SubmitButton/SubmitButton";

const CartForm = () => {
  const [state, formAction] = useFormState(getInTouch, {
    errors: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (typeof state?.errors === "string" && state.errors) {
      toast.error(state.errors);
    }

    if (state?.errors && typeof state.errors !== "string") {
      if (Object.keys(state?.errors).length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [key, value] of Object.entries(state.errors)) {
          toast.error(value[0]);
        }
      }
    }

    if (!state) {
      toast.success("Email sent successfully!");
      router.push("/");
    }
  }, [state, router]);

  return (
    <form className="flex flex-col gap-[36px]" action={formAction}>
      <Input
        label="Your name"
        name="userName"
        id="userName"
        type="text"
        required
      />
      <Input
        label="Your email"
        name="userEmail"
        id="userEmail"
        type="email"
        required
      />
      <Textarea label="Message" name="userMessage" id="userMessage" required />
      <SubmitButton />
    </form>
  );
};

export default CartForm;
