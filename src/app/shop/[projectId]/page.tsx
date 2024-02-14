import { db } from "@/lib/db";
import ProductInformation from "@/screens/SingleProductPage/ProductInforamtion/ProductInformation";
import RelatedProducts from "@/screens/SingleProductPage/RelatedProducts/RelatedProducts";
import { Metadata } from "next";

interface SingleProductPageProps {
  params: {
    projectId: string;
  };
}

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const product = await db.product.findFirst({
    where: {
      id,
    },
  });

  return {
    title: product?.name,
    description: `It is ${product?.name}`,
  };
}

const page = ({ params }: SingleProductPageProps) => {
  return (
    <>
      <ProductInformation projectId={params.projectId} />
      <RelatedProducts productId={params.projectId} />
    </>
  );
};

export default page;
