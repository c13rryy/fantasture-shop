"use client";
import ProductItem from "@/components/Cards/ProductItem/ProductItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import Button from "@/components/ui/button/button";
import Section from "@/components/ui/section/section";
import { hasSubscription } from "@/lib/utils";
import { ProductData } from "@/types/db";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface ProductsProps {
  data: ProductData[];
}

const Products = ({ data }: ProductsProps) => {
  const { data: session } = useSession();

  return (
    <Section title="Our Products">
      <MaxWidthWrapper className="xh:w-full w-[95%]">
        <div className="grid sm:mt-34 mt-26 lg:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-32px sm:gap-24px gap-16px products">
          {data.map(product => {
            return (
              <ProductItem
                cartItem={product}
                key={product.id}
                voteAmt={product.raiting ?? 0}
                discount={product.discount ?? ""}
                productId={product.id}
                title={product.name}
                description={product.description}
                price={product.price}
                imgSrc={product.imageUrl}
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
            <Button aria-label="show-more" size="large">
              Show More
            </Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </Section>
  );
};

export default Products;
