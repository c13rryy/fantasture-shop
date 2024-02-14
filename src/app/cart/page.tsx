import Banner from "@/components/Banner/Banner";
import CartInfo from "@/screens/CartPage/CartInfo/CartInfo";
import NavigationLogo from "@/screens/CartPage/NavigationLogo/NavigationLogo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "It is cart page",
};

const page = () => {
  return (
    <>
      <NavigationLogo />
      <CartInfo />
      <Banner />
    </>
  );
};

export default page;
