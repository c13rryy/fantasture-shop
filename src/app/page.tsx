import { db } from "@/lib/db";
import Logo from "@/screens/MainPage/Logo/Logo";
import Products from "@/screens/MainPage/Products/Products";
import ProductsRange from "@/screens/MainPage/ProductsRange/ProductsRange";
import RoomsInspiration from "@/screens/MainPage/RoomsInspiration/RoomsInspiration";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/constants";
import { Suspense } from "react";
import { Icon } from "@/components/ui/Icon/Icon";

async function ProductLoad() {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subscribers: true,
      votes: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  return <Products data={products} />;
}

export default async function Home() {
  return (
    <>
      <Logo />
      <ProductsRange />
      <Suspense
        fallback={
          <div className="h-[100vh] flex justify-center items-center">
            <div className="animate-spin">
              <Icon icon="loader" size={32} />
            </div>
          </div>
        }
      >
        <ProductLoad />
      </Suspense>
      <RoomsInspiration />
    </>
  );
}
