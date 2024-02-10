import Background from "@/components/Background/Background";
import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import Button from "@/components/ui/button/button";
import Typo from "@/components/ui/typography/typo";
import bg from "public/bg-main.jpg";

const Logo = () => {
  return (
    <section className="mt-100">
      <MaxWidthWrapper className="relative 2xl:h-[826px] xl:h-[720px] h-[620px] w-full xl:block flex justify-center items-center">
        <Background imgSrc={bg} imgAlt="bg-main" />
        <div className="2xl:py-[32px] xl:py-[24px] py-17 flex flex-col xl:gap-[22px] gap-16px 2xl:px-48 xl:px-34 px-17 rounded-[20px] relative 2xl:top-[83px] xl:top-[63px] top-[0px] 2xl:left-[85px] xl:left-[65px] left-[0px] bg-[#FFD49F] sm:w-[655px] w-full sm:mx-[0px] mx-27">
          <Typo className="tracking-[3px]" type="defaultP" text="New Arrival" />
          <Typo tag="h1" color="[#95551F]" text="Discover Our New Collection" />
          <Typo
            tag="h4"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis."
            color="[#333]"
          />
          <Button classes="uppercase sm:w-fit w-full" size="large">
            BUY Now
          </Button>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Logo;
