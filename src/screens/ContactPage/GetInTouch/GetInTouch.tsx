import CartForm from "@/components/Forms/CartForm/CartForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import { Icon } from "@/components/ui/Icon/Icon";
import Section from "@/components/ui/section/section";
import Typo from "@/components/ui/typography/typo";
import { CONTACTS } from "@/data/contacts";
import { FC } from "react";

interface GetInTouchProps {}

const GetInTouch: FC<GetInTouchProps> = ({}) => {
  return (
    <Section>
      <MaxWidthWrapper className="xh:w-full w-[95%]">
        <div className="w-full flex justify-center">
          <div className="xl:w-[644px] w-full text-center">
            <h1 className="sm:text-36 text-[30px] leading-normal font-semibold">
              Get In Touch With Us
            </h1>
            <Typo
              type="mediumP"
              text="For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!"
              color="grey_2"
              className="mt-10"
            />
          </div>
        </div>

        <div className="flex sm:flex-row flex-col-reverse justify-between sm:mt-120 mt-[60px] gap-32px">
          <div className="flex flex-col sm:gap-64px gap-24px">
            {CONTACTS.map(el => (
              <div
                className="flex sm:w-[332px] w-full sm:gap-32px gap-16px"
                key={el.title}
              >
                <Icon
                  icon={el.icon}
                  size={22}
                  height={28}
                  viewBox="0 0 22 28"
                />
                <div>
                  <h3 className="text-16 leading-normal font-normal">
                    {el.title}
                  </h3>
                  <Typo
                    type="mediumP"
                    color="grey_2"
                    text={el.contactDataFirst}
                  />
                  {el.contactDataSecond && (
                    <Typo
                      type="mediumP"
                      color="grey_2"
                      text={el.contactDataSecond}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="xl:w-[530px] w-full">
            <CartForm />
          </div>
        </div>
      </MaxWidthWrapper>
    </Section>
  );
};

export default GetInTouch;
