"use client";

import { useCallback, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ROOM_SWIPER } from "@/data/swiper-data";
import Image from "next/image";
import sliderParams from "./swiper-settings/config";
import Typo from "@/components/ui/typography/typo";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon/Icon";
import SliderArrow from "./SwiperNavigation/SliderArrow";
import classNames from "classnames";

const RoomsSwiper = () => {
  const slider = useRef<SwiperRef>();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = useCallback(() => slider?.current?.swiper.slideNext(), []);

  const handlePrev = useCallback(() => slider?.current?.swiper.slidePrev(), []);

  return (
    <div className="relative">
      <div className="absolute sm:block hidden md:top-[47%] top-[42%] lg:left-[62.63%] md:left-[720px] left-[576px] z-[20]">
        <SliderArrow isReversed onClick={handleNext} />
      </div>
      <div className="absolute sm:block hidden md:top-[47%] top-[42%] left-[0%] z-[20]">
        <SliderArrow onClick={handlePrev} />
      </div>
      <Swiper
        onSlideChange={swiper => setActiveSlide(swiper.realIndex)}
        ref={slider}
        {...sliderParams}
        className="room-swiper"
      >
        {ROOM_SWIPER.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="h-full">
              <div
                className={classNames(
                  "relative h-full md:w-[372px] w-[300px] md:max-h-[468px] max-h-[360px] height-animation",
                  {
                    "md:max-h-[582px] sm:max-h-[420px] max-h-[360px]":
                      activeSlide === idx,
                  }
                )}
              >
                <Image
                  src={item.imgSrc}
                  alt={item.title}
                  fill
                  placeholder="blur"
                  loading="lazy"
                  sizes="100vw"
                  className="object-cover"
                />

                <div
                  className={classNames(
                    "relative h-full transition-opacity duration-1000 flex items-end",
                    {
                      "opacity-0": activeSlide !== idx,
                      "opacity-1": activeSlide === idx,
                    }
                  )}
                >
                  <div className="md:p-32 sm:p-24 p-14 sm:ml-24 ml-[0px] flex flex-col sm:gap-8px gap-6px sm:mb-24 mb-[0px] bg-[#FFFFFFB8]">
                    <Typo tag="h3" text={item.title} />
                    <Typo type="defaultP">{item.description}</Typo>
                  </div>
                  <div className="sm:mb-24 mb-[0px] sm:p-[12px] p-10 bg-[#7F4E25B2] rounded-[6px]">
                    <Link href="/shop" aria-label="shop-page">
                      <Icon icon="arrow" size={24} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RoomsSwiper;
