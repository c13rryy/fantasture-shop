"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import sliderParams from "./swiper-settings/config";
import { Category } from "@prisma/client";
import FilterButton from "@/components/FilterButton/FilterButton";

interface FilterSliderProps {
  categories: Category[];
}

const FilterSlider = ({ categories }: FilterSliderProps) => {
  return (
    <div>
      <Swiper {...sliderParams} className="filter-swiper">
        <SwiperSlide>
          <FilterButton href="/shop" categoryName="All products" />
        </SwiperSlide>
        {categories.map(category => (
          <SwiperSlide key={category.id}>
            <FilterButton key={category.id} categoryName={category.name} />
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <FilterButton categoryName="Raiting" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FilterSlider;
