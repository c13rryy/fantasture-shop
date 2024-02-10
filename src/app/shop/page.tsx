import Banner from "@/components/Banner/Banner";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/constants";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import Assortment from "@/screens/ShopPage/Assortment/Assortment";
import NavigationLogo from "@/screens/ShopPage/NavigationLogo/NavigationLogo";

export default async function Shop() {
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
    <>
      <NavigationLogo />
      <Assortment
        session={session}
        categories={categories}
        initialProducts={products}
      />
      <Banner />
    </>
  );
}
