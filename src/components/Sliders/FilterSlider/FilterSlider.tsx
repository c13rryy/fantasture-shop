"use client";

import FilterButton from "@/components/FilterButton/FilterButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import sliderParams from "./swiper-settings/config";
import { Category } from "@prisma/client";
import { useState } from "react";

interface FilterSliderProps {
  categories: Category[];
  filterFn: (id: string | null) => void;
}

const FilterSlider = ({ categories, filterFn }: FilterSliderProps) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  function handleClick(id: string | null) {
    filterFn(id);
    setActiveButton(id);
  }
  return (
    <div>
      <Swiper {...sliderParams} className="filter-swiper">
        <SwiperSlide>
          <FilterButton
            onClick={() => {
              handleClick(null);
            }}
            title="All products"
            isActive={activeButton === null}
          />
        </SwiperSlide>
        {categories.map(category => (
          <SwiperSlide key={category.id}>
            <FilterButton
              onClick={() => {
                handleClick(category.id);
              }}
              title={category.name}
              isActive={activeButton === category.id}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <FilterButton
            onClick={() => {
              handleClick("raiting");
            }}
            title="Raiting"
            isActive={activeButton === "raiting"}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FilterSlider;
