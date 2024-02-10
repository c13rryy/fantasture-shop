import { db } from "@/lib/db";
import ProductCharacteristic from "./ProductCharacteristic/ProductCharacteristic";

interface CharacteristicSectionProps {
  productId: string;
}

const CharacteristicSection = async ({
  productId,
}: CharacteristicSectionProps) => {
  const product = await db.product.findFirst({
    where: {
      id: productId,
    },
  });
  const colors = await db.color.findMany({
    where: {
      id: {
        in: product?.colorIds || [],
      },
    },
  });

  const sizes = await db.size.findMany({
    where: {
      id: {
        in: product?.sizeIds || [],
      },
    },
  });

  return <ProductCharacteristic colors={colors} sizes={sizes} item={product} />;
};

export default CharacteristicSection;
