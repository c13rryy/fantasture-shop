import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import Textarea from "@/components/ui/textarea/textarea";
import { FC } from "react";

interface CartFormProps {}

const CartForm: FC<CartFormProps> = ({}) => {
  return (
    <form className="flex flex-col gap-[36px]">
      <Input label="Your name" name="userName" id="userName" type="text" />
      <Input label="Your email" name="userEmail" id="userEmail" type="email" />
      <Textarea label="Message" name="userMessage" id="userMessage" />
      <Button size="large">Submit</Button>
    </form>
  );
};

export default CartForm;
