"use client";

import classNames from "classnames";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface FilterButtonProps {
  categoryName: string;
  href?: string;
}

const FilterButton = ({ categoryName, href }: FilterButtonProps) => {
  const searchParams = useSearchParams();
  const categoryPage = searchParams.get("category");
  return (
    <Link
      className={classNames(
        "bg-white border-r p-14 border-r-grey_2 flex justify-center",
        categoryPage === categoryName ||
          (!categoryPage && categoryName === "All products")
          ? "text-black_1"
          : "text-grey_4 "
      )}
      href={href ? href : `?page=1&category=${categoryName}`}
      scroll={false}
    >
      {categoryName}
    </Link>
  );
};

export default FilterButton;
