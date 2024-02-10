"use client";

import { Icon } from "@/components/ui/Icon/Icon";
import Button from "@/components/ui/button/button";
import classNames from "classnames";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...rest }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      toast.error("Could not auth with google");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className={classNames("flex justify-center w-full", className)}
      {...rest}
    >
      <Button isLoading={isLoading} onClick={loginWithGoogle} size="auth">
        <Icon icon="google" size={24} viewBox="0 0 48 48" />
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
