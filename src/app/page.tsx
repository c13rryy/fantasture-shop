/* import { db } from "@/lib/db"; */
import Logo from "@/screens/MainPage/Logo/Logo";
/* import Products from "@/screens/MainPage/Products/Products"; */
import ProductsRange from "@/screens/MainPage/ProductsRange/ProductsRange";
import RoomsInspiration from "@/screens/MainPage/RoomsInspiration/RoomsInspiration";
/* import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/constants"; */

export default async function Home() {
  /*  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subscribers: true,
      votes: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  }); */

  return (
    <>
      <Logo />
      <ProductsRange />
      {/* <Products data={products} /> */}
      <RoomsInspiration />
    </>
  );
}
