import { BANNER_DATA } from "@/data/banner-data";
import BannerCard from "../Cards/BannerCard/BannerCard";
import Section from "../ui/section/section";
import MaxWidthWrapper from "../MaxWidthWrapper/MaxWidthWrapper";

const Banner = () => {
  return (
    <Section classes="bg-[#FDEBD6] xl:h-[270px] h-full w-full sm:px-14 py-14 px-[0px]">
      <MaxWidthWrapper className="xh:w-full w-[95%] h-full">
        <div className="lg:flex grid mds:grid-cols-2 grid-cols-1 justify-between h-full xl:gap-10px gap-16px banner-card">
          {BANNER_DATA.map(item => (
            <BannerCard
              iconName={item.iconName}
              title={item.title}
              description={item.description}
              key={item.title}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </Section>
  );
};

export default Banner;
