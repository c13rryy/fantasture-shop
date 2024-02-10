import ProductItem from "@/components/Cards/ProductItem/ProductItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import Button from "@/components/ui/button/button";
import Section from "@/components/ui/section/section";
import { getAuthSession } from "@/lib/auth";
import { hasSubscription } from "@/lib/utils";
import { ProductData } from "@/types/db";
import Link from "next/link";

interface ProductsProps {
  data: ProductData[];
}

const Products = async ({ data }: ProductsProps) => {
  const session = await getAuthSession();

  return (
    <Section title="Our Products">
      <MaxWidthWrapper className="xh:w-full w-[95%]">
        <div className="grid sm:mt-34 mt-26 lg:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-32px sm:gap-24px gap-16px products">
          {data.map(product => {
            const voteAmt = product.votes.reduce((acc, vote) => {
              if (vote.type === "ACTIVE_ONE") return acc + 1;
              if (vote.type === "ACTIVE_TWO") return acc + 2;
              if (vote.type === "ACTIVE_THREE") return acc + 3;
              if (vote.type === "ACTIVE_FOUR") return acc + 4;
              if (vote.type === "ACTIVE_FIVE") return acc + 5;

              return acc;
            }, 0);

            const amt =
              product.votes.length > 0 ? voteAmt / product.votes.length : 0;

            return (
              <ProductItem
                cartItem={product}
                key={product.id}
                voteAmt={amt}
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
          <Button size="large">
            <Link href="/shop">Show More</Link>
          </Button>
        </div>
      </MaxWidthWrapper>
    </Section>
  );
};

export default Products;
