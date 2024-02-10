import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import { Icon } from "@/components/ui/Icon/Icon";
import Typo from "@/components/ui/typography/typo";
import { FC } from "react";

interface ActiveProjectPathProps {
  name: string;
}

const ActiveProjectPath: FC<ActiveProjectPathProps> = ({ name }) => {
  return (
    <div className="mt-100 bg-[#FDEBD6] sm:py-30 py-20">
      <MaxWidthWrapper className="xh:w-full w-[95%]">
        <div>
          <div className="flex items-center sm:gap-24px gap-16px">
            <div className="flex items-center sm:gap-[14px] gap-8px">
              <Typo type="labelM" color="grey_2" text="Home" />
              <Icon icon="active-path-arrow" size={20} viewBox="0 0 20 20" />
            </div>
            <div className="flex items-center sm:gap-[14px] gap-12px">
              <Typo type="labelM" color="grey_2" text="Shop" />
              <Icon icon="active-path-arrow" size={20} viewBox="0 0 20 20" />
            </div>
            <div className="border-l-[2px] h-[37px] flex items-center border-solid border-grey_2">
              <Typo
                type="labelM"
                color="black_1"
                text={name}
                className="sm:pl-34 pl-22"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ActiveProjectPath;
