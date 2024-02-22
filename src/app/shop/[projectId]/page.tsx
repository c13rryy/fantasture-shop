import { db } from "@/lib/db";
import ProductInformation from "@/screens/SingleProductPage/ProductInforamtion/ProductInformation";
import RelatedProducts from "@/screens/SingleProductPage/RelatedProducts/RelatedProducts";
import { Metadata } from "next";

interface SingleProductPageProps {
  params: {
    projectId: string;
  };
}

export async function generateMetadata({
  params,
}: SingleProductPageProps): Promise<Metadata> {
  const id = params.projectId;
  const product = await db.product.findFirst({
    where: {
      id,
    },
  });

  return {
    title: product?.name,
    description: `It is ${product?.name}`,
    openGraph: {
      title: product?.name,
      description: product?.description,
      url: `https://fantasture-shop.vercel.app/shop/${product?.id}`,
      images: [
        {
          url: product?.imageUrl ?? "",
          width: 300,
          height: 300,
        },
      ],
      type: "website",
      siteName: "Fantasture",
    },
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
