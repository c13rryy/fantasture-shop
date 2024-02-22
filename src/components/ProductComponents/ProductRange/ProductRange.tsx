import Typo from "../../ui/typography/typo";
import Image, { StaticImageData } from "next/image";
interface ProductItemProps {
  src: StaticImageData;
  title: string;
}

const ProductRange = ({ src, title }: ProductItemProps) => {
  return (
    <div className="flex">
      <div className="relative sm:w-[384px] w-full 2xl:h-[480px] xl:h-[400px] sm:h-[350px] h-[300px]">
        <Image
          src={src}
          alt={title}
          loading="lazy"
          placeholder="blur"
          fill
          sizes="100vw"
          className="object-cover rounded-[20px]"
        />
        <div className="absolute inset-[0] hover:opacity-[1] duration-700 hover:duration-700 flex justify-center items-center transition-opacity hover:transition-opacity opacity-0 bg-[#ffffff9a]">
          <Typo tag="h3" text={title} />
        </div>
      </div>
    </div>
  );
};

export default ProductRange;
