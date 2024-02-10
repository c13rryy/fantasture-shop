import ProductInformation from "@/screens/SingleProductPage/ProductInforamtion/ProductInformation";
import RelatedProducts from "@/screens/SingleProductPage/RelatedProducts/RelatedProducts";

interface SingleProductPageProps {
  params: {
    projectId: string;
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
