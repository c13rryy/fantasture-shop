/* import { db } from "@/lib/db";
import ProductColors from "./ProductColors/ProductColors";

interface ColorSectionProps {
  productId: string;
}

const ColorSection = async ({ productId }: ColorSectionProps) => {
  const productColors = await db.product.findFirst({
    where: {
      id: productId,
    },
  });
  const colors = await db.color.findMany({
    where: {
      id: {
        in: productColors?.colorIds || [],
      },
    },
  });

  return <ProductColors colors={colors} />;
};

export default ColorSection;
 */
