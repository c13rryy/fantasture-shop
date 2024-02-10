import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import Section from "@/components/ui/section/section";
import Typo from "@/components/ui/typography/typo";
import RangeSwiper from "../../../components/Sliders/RangeSwiper/RangeSwiper";

const ProductsRange = () => {
  return (
    <Section title="Browse The Range">
      <MaxWidthWrapper className="xh:w-full w-[95%]">
        <Typo
          className="text-center mt-10"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          type="sectionP"
          color="grey_2"
        />
        <div className="xl:mt-[53px] mt-[33px]">
          <RangeSwiper />
        </div>
      </MaxWidthWrapper>
    </Section>
  );
};

export default ProductsRange;
