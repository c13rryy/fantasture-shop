import Banner from "@/components/Banner/Banner";
import CartInfo from "@/screens/CartPage/CartInfo/CartInfo";
import NavigationLogo from "@/screens/CartPage/NavigationLogo/NavigationLogo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "It is cart page",
  openGraph: {
    title: "Your cart",
    description: "We can show all of you products",
    images: [
      {
        url: "https://res.cloudinary.com/drckql7g9/image/upload/v1708117299/bbkkanxgti9ff8js5w1i.webp",
        width: 300,
        height: 300,
      },
    ],
    url: "https://fantasture-shop.vercel.app/cart",
    type: "website",
    siteName: "Fantasture",
  },
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
