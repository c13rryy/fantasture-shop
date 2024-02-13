"use client";

import { updateName } from "@/actions/updateName";
/* import Button from "@/components/ui/button/button"; */
import Input from "@/components/ui/input/input";
import Typo from "@/components/ui/typography/typo";
import { User } from "@prisma/client";
import { FC, useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import SubmitButton from "../SubmitButton/SubmitButton";

interface UserNameFormProps {
  user: Pick<User, "id" | "username">;
}

const UserNameForm: FC<UserNameFormProps> = ({ user }) => {
  const [state, formAction] = useFormState(updateName, {
    errors: "",
  });

  /*   const { pending } = useFormStatus(); */

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
      toast.success("Your username has been updated.");
    }
  }, [state]);

  return (
    <div>
      <Typo
        tag="h3"
        text="Please enter a display name you are comfortable with."
      />
      <form
        className="flex flex-col gap-16px mds:w-[500px] w-full sm:mt-30 mt-17"
        action={formAction}
      >
        <Input
          label="Name"
          name="name"
          id="name"
          type="text"
          defaultValue={user?.username ?? ""}
        />
        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default UserNameForm;
