import Banner from "@/components/Banner/Banner";
import GetInTouch from "@/screens/ContactPage/GetInTouch/GetInTouch";
import NavigationLogo from "@/screens/ContactPage/NavigationLogo/NavigationLogo";

const page = ({}) => {
  return (
    <>
      <NavigationLogo />
      <GetInTouch />
      <Banner />
    </>
  );
};

export default page;
