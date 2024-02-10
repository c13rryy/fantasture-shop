import { HELP_LINKS, LINKS } from "@/data/footer-navigation";
import MaxWidthWrapper from "../MaxWidthWrapper/MaxWidthWrapper";
import FooterLinks from "./FooterLinks";
import FooterForm from "../Forms/FooterForm/FooterForm";
import Typo from "../ui/typography/typo";

const Footer = () => {
  return (
    <footer className="border-t-[1px] border-solid border-grey_2">
      <MaxWidthWrapper className="xh:w-full w-[95%]">
        <div>
          <div className="sm:py-48 py-27 flex 2xl:gap-[138px] lg:gap-96px sm:gap-75px mds:gap-40px gap-24px xl:flex-row flex-col">
            <div className="flex flex-col sm:gap-24px gap-16px ">
              <Typo
                text="Fantasture"
                type="logo"
                color="black_1"
                className="xl:text-left text-center"
              />
              <Typo
                type="mediumP"
                color="black_1"
                text="236 5th SE Avenue, Bangalore 560000, India"
                className="xl:w-[285px] w-full xl:text-left text-center"
              />
            </div>
            <div className="grid xl:grid-cols-[1fr,191px,1fr] sm:grid-cols-3 grid-cols-1 sm:gap-[21px] mds:gap-24px gap-16px">
              <FooterLinks title="Links" links={LINKS} />
              <div>
                <FooterLinks title="Help" links={HELP_LINKS} />
              </div>
              <div className="flex flex-col sm:gap-56px  gap-[18px]">
                <Typo type="defaultP" color="[#B88E2F]">
                  Newsletter
                </Typo>
                <FooterForm />
              </div>
            </div>
          </div>
          <div className="border-t-[2px] border-solid border-white_2 sm:py-40 py-22">
            <Typo type="mediumP" text="2023 fantasture. All rights reverved" />
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
