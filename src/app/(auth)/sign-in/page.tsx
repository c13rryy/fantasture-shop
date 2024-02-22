import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import SignIn from "@/components/SignIn/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign-in",
  description: "Sign-in to continue",
  openGraph: {
    title: "Fantasture shop",
    description: "It is first shop",
    url: "https://fantasture-shop.vercel.app/sign-in",
    type: "website",
    siteName: "Fantasture",
  },
};

const page = ({}) => {
  return (
    <section>
      <MaxWidthWrapper className="xh:w-full w-[95%]">
        <SignIn />
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
