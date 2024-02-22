import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import SignUp from "@/components/SignUp/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign-up",
  description: "Sign-up to continue",
  openGraph: {
    title: "Fantasture shop",
    description: "It is the first shop",
    url: "https://fantasture-shop.vercel.app/sign-up",
    type: "website",
    siteName: "Fantasture",
  },
};

const page = () => {
  return (
    <section>
      <MaxWidthWrapper className="xh:w-full w-[95%]">
        <SignUp />
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
