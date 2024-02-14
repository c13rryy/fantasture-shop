import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import SignUp from "@/components/SignUp/SignUp";

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
