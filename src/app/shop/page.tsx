import { fetchFeed } from "@/actions/fetchProducts";
import Banner from "@/components/Banner/Banner";
import { Icon } from "@/components/ui/Icon/Icon";
import { INFINITE_SCROLL_PAGINATION_RESULTS, PAGE_SIZE } from "@/constants";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import Assortment from "@/screens/ShopPage/Assortment/Assortment";
import NavigationLogo from "@/screens/ShopPage/NavigationLogo/NavigationLogo";
import { Metadata } from "next";
import { Suspense } from "react";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | undefined };
};

export const metadata: Metadata = {
  title: "Shop",
  description: "It is shop page",
  openGraph: {
    title: "Product of our shop",
    description: "We have a huge assortment of furniture",
    url: "https://fantasture-shop.vercel.app/shop",
    type: "website",
    siteName: "Fantasture",
  },
};

async function Products(props: PageProps) {
  const session = await getAuthSession();

  const pageNumber = Number(props.searchParams?.page || 1);
  const pageCategory = props.searchParams?.category || "";

  const take = PAGE_SIZE;
  const skip = (pageNumber - 1) * take;

  const { data, metadata, error } = await fetchFeed({
    take,
    skip,
    categoryName: pageCategory,
    page: pageNumber,
  });

  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      categories: true,
      subscribers: true,
      votes: true,
    },

    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  const categories = await db.category.findMany();

  return (
    <Assortment
      session={session}
      categories={categories}
      initialProducts={products}
      {...metadata}
      {...props.searchParams}
      page={pageNumber}
      pageCategory={pageCategory}
      filterData={data}
      error={error}
    />
  );
}

export default async function Shop(props: PageProps) {
  return (
    <>
      <NavigationLogo />
      <Suspense
        fallback={
          <div className="h-[100vh] flex justify-center items-center">
            <div className="animate-spin">
              <Icon icon="loader" size={32} />
            </div>
          </div>
        }
      >
        <Products {...props} />
      </Suspense>
      <Banner />
    </>
  );
}
