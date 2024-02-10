/* import { db } from "@/lib/db";
import ProductSize from "@/screens/SingleProductPage/ProductInforamtion/ProductSize/ProductSize";
import { FC } from "react";

interface SizeSectionProps {
  productId: string;
}

const SizeSection = async ({ productId }: SizeSectionProps) => {
  const productColors = await db.product.findFirst({
    where: {
      id: productId,
    },
  });
  const sizes = await db.size.findMany({
    where: {
      id: {
        in: productColors?.sizeIds || [],
      },
    },
  });
  return <ProductSize sizes={sizes} />;
};

export default SizeSection;
 */
