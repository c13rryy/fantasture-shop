import ActiveProjectPath from "./ActiveProjectPath/ActiveProjectPath";
import ProductDetails from "@/components/ProductComponents/ProductDetails/ProductDetails";
import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import { redis } from "@/lib/redis";
import { CachedProduct } from "@/types/redis";
import { Product, Vote } from "@prisma/client";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface ProductInformationProps {
  projectId: string;
}

const ProductInformation = async ({ projectId }: ProductInformationProps) => {
  const cachedProducts = (await redis.hgetall(
    `product:${projectId}`
  )) as CachedProduct;

  let product: (Product & { votes: Vote[] }) | null = null;

  if (!cachedProducts) {
    product = await db.product.findFirst({
      where: {
        id: projectId,
      },
      include: {
        votes: true,
      },
    });
  }

  if (!product && !cachedProducts) return notFound();

  return (
    <section className="mt-100">
      <ActiveProjectPath name={product?.name ?? cachedProducts.name} />
      <MaxWidthWrapper className="xh:w-full w-[95%]">
        <ProductDetails
          productId={product?.id ?? cachedProducts.id}
          name={product?.name ?? cachedProducts.name}
          imageUrl={product?.imageUrl ?? cachedProducts.imageUrl}
          price={product?.price ?? cachedProducts?.price}
          description={product?.description ?? cachedProducts.description}
          fullDescription={
            product?.fullDescription ?? cachedProducts.fullDescription
          }
          discount={product?.discount ?? cachedProducts.discount}
        />
      </MaxWidthWrapper>
    </section>
  );
};

export default ProductInformation;
