import Banner from "@/components/Banner/Banner";
import GetInTouch from "@/screens/ContactPage/GetInTouch/GetInTouch";
import NavigationLogo from "@/screens/ContactPage/NavigationLogo/NavigationLogo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "It is contact page",
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
