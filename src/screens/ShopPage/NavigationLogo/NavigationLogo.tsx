import ActivePath from "@/components/ActivePath/ActivePath";
import Background from "@/components/Background/Background";
import bgShop from "public/bg-shop.png";

const NavigationLogo = () => {
  return (
    <section className="mt-100">
      <div className="relative w-full h-[316px]">
        <Background
          imgSrc={bgShop}
          imgAlt="bg-shop"
          classes="object-center blur-sm"
        />
        <div className="absolute h-full w-full bg-[#d3d3d3] opacity-50" />
        <ActivePath
          pageName="Shop"
          firstPathElement="Home"
          secondPathElemet="shop"
        />
      </div>
    </section>
  );
};

export default NavigationLogo;
