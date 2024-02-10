import Image, { StaticImageData } from "next/image";

interface BackgroundProps {
  imgSrc: StaticImageData;
  classes?: string;
  imgAlt: string;
}

const Background = ({ imgSrc, classes, imgAlt }: BackgroundProps) => {
  return (
    <Image
      src={imgSrc}
      alt={imgAlt}
      quality={100}
      fill
      priority
      className={`${classes} object-cover`}
      placeholder="blur"
    />
  );
};

export default Background;
