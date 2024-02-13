"use client";

import ProductItem from "@/components/Cards/ProductItem/ProductItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import FilterSlider from "@/components/Sliders/FilterSlider/FilterSlider";
import { Icon } from "@/components/ui/Icon/Icon";
import Button from "@/components/ui/button/button";
import Section from "@/components/ui/section/section";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/constants";
import { hasSubscription } from "@/lib/utils";
import { ExtendedProduct, FilterData } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { Category } from "@prisma/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";

interface AssortmentProps {
  initialProducts: ExtendedProduct[];
  categories: Category[];
  session: Session | null;
}

const Assortment = ({
  initialProducts,
  categories,
  session,
}: AssortmentProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [filterPage, setFilterPage] = useState(1);
  const lastPostRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const {
    data: categoryData,
    refetch,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!activeCategory) {
        return null;
      }
      const { data } = await axios.get(
        `/api/products/filter?id=${activeCategory}&limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${filterPage}`
      );
      return data as {
        filterData: FilterData;
        hasMore: boolean;
        quantityOfPage: number;
      };
    },
    queryKey: ["filter-query"],
    enabled: false,
  });

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

  function handleFilter(id: string | null) {
    setActiveCategory(id);
  }

  useEffect(() => {
    return () => {
      startTransition(() => {
        router.refresh();
      });
    };
  }, [router]);

  useEffect(() => {
    if (activeCategory) {
      refetch();
    } else if (filterPage > 1) {
      refetch();
    } else {
      refetch();
    }
  }, [activeCategory, filterPage, refetch]);

  const pagesQuantity = useMemo(
    () => data.pages.flatMap(page => page.quantityOfPage),
    [data.pages]
  );

  useEffect(() => {
    if (entry?.isIntersecting && page !== pagesQuantity[0] && !activeCategory) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage, pagesQuantity, activeCategory, page]);

  const productData = useMemo(() => {
    if (categoryData?.filterData.products) {
      return categoryData.filterData.products;
    }

    if (data) {
      return data.pages.flatMap(page => page.products);
    }

    return initialProducts;
  }, [categoryData?.filterData.products, data, initialProducts]);

  return (
    <Section>
      <MaxWidthWrapper className="xh:w-full w-[95%]">
        <FilterSlider filterFn={handleFilter} categories={categories} />
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

          {isFetching && (
            <div className="inset-[0] flex justify-center items-center bg-product_load absolute">
              <div>
                <div className="animate-spin">
                  <Icon icon="loader" size={48} viewBox="0 0 24 24" />
                </div>
              </div>
            </div>
          )}
        </div>
        {isFetchingNextPage && (
          <div className="w-full flex justify-center">
            <div className="animate-spin">
              <Icon icon="loader" size={48} viewBox="0 0 24 24" />
            </div>
          </div>
        )}

        {(categoryData?.quantityOfPage ?? 1) > 1 && (
          <div className="flex gap-10px items-center justify-center mt-20">
            <Button
              onClick={() => setFilterPage(old => Math.max(old - 1, 1))}
              disabled={filterPage === 1}
              size="subscribe"
            >
              Previous Page
            </Button>
            <Button
              disabled={
                filterPage === Math.round(categoryData?.quantityOfPage ?? 1)
              }
              onClick={() =>
                setFilterPage(old => (categoryData?.hasMore ? old + 1 : old))
              }
              size="subscribe"
              classes="disabled:bg-grey_1 disabled:border-grey_1 disabled:text-white"
            >
              Next Page
            </Button>
          </div>
        )}
      </MaxWidthWrapper>
    </Section>
  );
};

export default Assortment;
