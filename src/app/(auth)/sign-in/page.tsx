import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import SignIn from "@/components/SignIn/SignIn";

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
