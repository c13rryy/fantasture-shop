import Typo from "../../ui/typography/typo";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ProductItemProps {
  src: StaticImageData;
  title: string;
}

const ProductRange = ({ src, title }: ProductItemProps) => {
  return (
    <Link
      href="/"
      className="flex sm:flex-col flex-col-reverse sm:gap-40px gap-16px"
    >
      <div className="relative sm:w-[384px] w-full 2xl:h-[480px] xl:h-[400px] sm:h-[350px] h-[300px] transition-opacity hover:opacity-50">
        <Image
          src={src}
          alt={title}
          loading="lazy"
          placeholder="blur"
          fill
          sizes="100vw"
          className="object-cover rounded-[20px]"
        />
      </div>

      <Typo className="sm:text-center" tag="h3" text={title} />
    </Link>
  );
};

export default ProductRange;
