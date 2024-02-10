"use client";

import ProductRange from "@/components/ProductRange/ProductRange";
import { PRODUCT_TYPE } from "@/data/main-page";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import sliderParams from "./swiper-settings/config";

const RangeSwiper = () => {
  return (
    <Swiper {...sliderParams} className="range-swiper">
      {PRODUCT_TYPE.map((product, idx) => (
        <SwiperSlide key={idx}>
          <ProductRange src={product.imgSrc} title={product.title} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RangeSwiper;
