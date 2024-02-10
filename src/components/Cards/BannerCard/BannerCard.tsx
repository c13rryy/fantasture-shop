"use client";

import { Icon } from "@/components/ui/Icon/Icon";
import Typo from "@/components/ui/typography/typo";
import useWindowSize from "@/hooks/useWindwoSize";
import { BannerCardProps } from "@/types";
import { useMemo } from "react";

const BannerCard = ({ title, description, iconName }: BannerCardProps) => {
  const size = useWindowSize();
  const descktop = useMemo(() => size && size > 1024, [size]);

  return (
    <div className="flex gap-10px items-center">
      <Icon icon={iconName} size={descktop ? 60 : 40} viewBox="0 0 60 60" />
      <div className="flex flex-col">
        <Typo
          type="customTypo"
          className="xl:text-[25px] text-20 font-semibold xl:leading-[38px] leading-[28px]  text-black_2"
          text={title}
        />
        <Typo
          type="customTypo"
          className="xl:text-20 text-16 font-medium leading-[30px] text-grey_4"
          text={description}
          color="grey_4"
        />
      </div>
    </div>
  );
};

export default BannerCard;
