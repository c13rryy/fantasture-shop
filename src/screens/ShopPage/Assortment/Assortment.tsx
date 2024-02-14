"use client";

import ProductItem from "@/components/Cards/ProductItem/ProductItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import Pagination from "@/components/Pagination/Pagination";
import FilterSlider from "@/components/Sliders/FilterSlider/FilterSlider";
import { Icon } from "@/components/ui/Icon/Icon";
import Section from "@/components/ui/section/section";
import Typo from "@/components/ui/typography/typo";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/constants";
import { hasSubscription } from "@/lib/utils";
import { ExtendedProduct, ProductData } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { Category } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";

interface AssortmentProps {
  initialProducts: ExtendedProduct[];
  categories: Category[];
  session: Session | null;
  page?: number;
  totalPages: number;
  hasNextPage: boolean;
  pageCategory?: string;
  filterData: ProductData[] | [] | undefined;
  error?: string;
}

const Assortment = ({
  initialProducts,
  categories,
  session,
  page: filterPage,
  totalPages,
  hasNextPage,
  pageCategory,
  filterData,
  error,
}: AssortmentProps) => {
  const [page, setPage] = useState(1);
  const lastPostRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const router = useRouter();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1 }) => {
      setPage(pageParam);
      const query = `/api/products?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`;

      const { data } = await axios.get(query);
      return data as { products: ExtendedProduct[]; quantityOfPage: number };
    },
    initialPageParam: 1,
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialData: {
      pages: [{ products: initialProducts, quantityOfPage: 1 }],
      pageParams: [1],
    },
  });

  useEffect(() => {
    return () => {
      startTransition(() => {
        router.refresh();
      });
    };
  }, [router]);



  const pagesQuantity = useMemo(
    () => data.pages.flatMap(page => page.quantityOfPage),
    [data.pages]
  );

  useEffect(() => {
    if (
      entry?.isIntersecting &&
      page !== pagesQuantity[0] &&
      pageCategory === ""
    ) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, pagesQuantity, page, pageCategory]);

  const productData = useMemo(() => {
    if (filterData && filterData.length > 0) {
      return filterData;
    }
    if (error) {
      return [];
    }
    if (data) {
      return data.pages.flatMap(page => page.products);
    }

    return initialProducts;
  }, [data, error, filterData, initialProducts]);

  return (
    <Section>
      <MaxWidthWrapper className="xh:w-full w-[95%]">
        <FilterSlider categories={categories} />
        <div className="grid relative lg:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-32px sm:gap-24px gap-16px sm:mt-40 mt-24">
          {productData.map((product, idx) => {
            if (idx === productData.length - 1) {
              return (
                <ProductItem
                  cartItem={product}
                  ref={ref}
                  key={product.id}
                  voteAmt={product.raiting ?? 0}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  imgSrc={product.imageUrl}
                  productId={product.id}
                  discount={product.discount ?? ""}
                  isSubscribed={hasSubscription(
                    session?.user.id,
                    product.id,
                    product.subscribers
                  )}
                />
              );
            } else {
              return (
                <ProductItem
                  key={product.id}
                  cartItem={product}
                  voteAmt={product.raiting ?? 0}
                  productId={product.id}
                  title={product.name}
                  description={product.description}
                  discount={product.discount ?? ""}
                  price={product.price}
                  imgSrc={product.imageUrl}
                  isSubscribed={hasSubscription(
                    session?.user.id,
                    product.id,
                    product.subscribers
                  )}
                />
              );
            }
          })}
        </div>
        {productData?.length === 0 && (
          <div className="flex flex-col items-center gap-12px justify-center">
            <Typo
              tag="h3"
              text="Unavailable filtering options"
              color="grey_3"
            />
            <div className="flex gap-8px items-center">
              <Typo type="mediumP" text={error} color="grey_3" />
              <Link
                className="font-normal leading-normal underline text-16 text-black_2"
                href="/shop"
              >
                Go shopping
              </Link>
            </div>
          </div>
        )}
        {isFetchingNextPage && (
          <div className="w-full flex justify-center">
            <div className="animate-spin">
              <Icon icon="loader" size={48} viewBox="0 0 24 24" />
            </div>
          </div>
        )}
        {totalPages > 1 && (
          <Pagination
            page={filterPage}
            pageCategory={pageCategory}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
          />

        )}
      </MaxWidthWrapper>
    </Section>
  );
};

export default Assortment;
