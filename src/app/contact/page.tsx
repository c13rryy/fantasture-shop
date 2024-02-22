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
    images: [
      {
        url: "https://res.cloudinary.com/drckql7g9/image/upload/v1708117299/bbkkanxgti9ff8js5w1i.webp",
        width: 300,
        height: 300,
      },
    ],
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
