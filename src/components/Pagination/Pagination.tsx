import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";

type PaginationProps = {
  page?: number;
  totalPages: number;
  hasNextPage: boolean;
  pageCategory?: string;
};
const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  hasNextPage,
  pageCategory,
}) => {
  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);

  return (
    <div className="flex items-center justify-center space-x-6 text-black">
      <Link
        className={classNames(
          "rounded-md bg-brown_2 px-10 text-white py-4 w-[120px] flex justify-center text-14 font-medium hover:bg-[#7f4d2577]",
          currentPage === 1 ? "pointer-events-none bg-grey_3" : ""
        )}
        href={`?page=${currentPage - 1}&category=${pageCategory}`}
        scroll={false}
      >
        Previous Page
      </Link>

      <Link
        className={classNames(
          "rounded-md bg-brown_2 text-white px-10 py-4 w-[120px] text-14 flex justify-center font-medium hover:bg-[#7f4d2577]",
          !hasNextPage ? "pointer-events-none bg-grey_3" : ""
        )}
        href={`?page=${currentPage + 1}&category=${pageCategory}`}
        scroll={false}
      >
        Next Page
      </Link>
    </div>
  );
};

export default Pagination;
