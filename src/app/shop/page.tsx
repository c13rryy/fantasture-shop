import Banner from "@/components/Banner/Banner";
import { Icon } from "@/components/ui/Icon/Icon";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/constants";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import Assortment from "@/screens/ShopPage/Assortment/Assortment";
import NavigationLogo from "@/screens/ShopPage/NavigationLogo/NavigationLogo";
import { Suspense } from "react";

async function Products() {
  const session = await getAuthSession();

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
    />
  );
}

export default async function Shop() {
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
        <Products />
      </Suspense>

      <Banner />
    </>
  );
}
