import Banner from "@/components/Banner/Banner";
import GetInTouch from "@/screens/ContactPage/GetInTouch/GetInTouch";
import NavigationLogo from "@/screens/ContactPage/NavigationLogo/NavigationLogo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "It is contact page",
  openGraph: {
    title: "Get in touch",
    description: "Always available",
    url: "https://fantasture-shop.vercel.app/contact",
    type: "website",
    siteName: "Fantasture",
  },
};

const page = () => {
  return (
    <>
      <NavigationLogo />
      <GetInTouch />
      <Banner />
    </>
  );
};

export default page;
