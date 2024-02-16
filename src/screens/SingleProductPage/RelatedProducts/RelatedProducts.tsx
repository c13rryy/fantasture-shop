import ProductItem from "@/components/Cards/ProductItem/ProductItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import Button from "@/components/ui/button/button";
import Section from "@/components/ui/section/section";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasSubscription } from "@/lib/utils";
import Link from "next/link";

interface RelatedProductsProps {
  productId: string;
}

const RelatedProducts = async ({ productId }: RelatedProductsProps) => {
  const session = await getAuthSession();

  const product = await db.product.findFirst({
    where: {
      id: productId,
    },
  });

  const relatedProducts = await db.category.findFirst({
    where: {
      id: product?.categoryId,
    },
    include: {
      products: {
        include: {
          subscribers: true,
          votes: true,
        },
        take: 4,
      },
    },
  });

  return (
    <Section title="Related Products" classes="mb-100">
      <MaxWidthWrapper className="xh:w-full w-[95%]">
        <div className="grid lg:grid-cols-[285px,285px,285px,285px] xl:grid-cols-4 grid-cols-1 justify-center xl:gap-32px sm:gap-24px gap-16px sm:mt-48 mt-30">
          {relatedProducts?.products.map(product => {
            return (
              <ProductItem
                key={product.id}
                voteAmt={product.raiting ?? 0}
                discount={product.discount ?? ""}
                cartItem={product}
                title={product.name}
                description={product.description}
                price={product.price}
                imgSrc={product.imageUrl}
                productId={product.id}
                isSubscribed={hasSubscription(
                  session?.user.id,
                  product.id,
                  product.subscribers
                )}
              />
            );
          })}
        </div>

        <div className="sm:mt-34 mt-26 flex justify-center">
          <Link href="/shop">
            <Button size="large">Show More</Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </Section>
  );
};

export default RelatedProducts;
