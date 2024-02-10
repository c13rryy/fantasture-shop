import Button from "@/components/ui/button/button";
import Section from "@/components/ui/section/section";
import Typo from "@/components/ui/typography/typo";
import RoomsSwiper from "@/components/Sliders/RoomsSwiper/RoomsSwiper";

const RoomsInspiration = () => {
  return (
    <Section classes="bg-back_1 xl:pl-32 sm:pl-24 pl-17 xl:py-32 sm:py-24 py-17  overflow-hidden ">
      <div className="flex lg:gap-24px gap-0px lg:flex-row flex-col lg:items-center lg:h-[582px] h-full justify-between">
        <div className="min-w-[430px] xh:w-full lg:w-[430px] w-full flex flex-col lg:gap-64px  gap-24px lg:mb-[0px] mb-34">
          <div>
            <Typo
              tag="h2"
              color="grey_3"
              text="100+ Beautiful room inspiration"
            />
            <Typo
              type="defaultP"
              color="grey_4"
              text="Our designer already made a lot of beautiful prototipe of rooms that inspire you"
            />
          </div>
          <Button classes="w-fit" size="subscribe">
            Explore More
          </Button>
        </div>
        <div className="lg:max-w-[1150px] max-w-[1280px]">
          <RoomsSwiper />
        </div>
      </div>
    </Section>
  );
};

export default RoomsInspiration;
