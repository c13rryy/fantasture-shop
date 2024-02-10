import Banner from "@/components/Banner/Banner";
import CartInfo from "@/screens/CartPage/CartInfo/CartInfo";
import NavigationLogo from "@/screens/CartPage/NavigationLogo/NavigationLogo";

const page = () => {
  return (
    <>
      <NavigationLogo />
      <CartInfo />
      <Banner />
    </>
  );
};

export default page;
