"use client";

import Button from "@/components/ui/button/button";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button isLoading={pending} disabled={pending} type="submit" size="large">
      Submit
    </Button>
  );
};

export default SubmitButton;
