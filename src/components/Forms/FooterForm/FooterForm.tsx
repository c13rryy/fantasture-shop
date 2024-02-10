import Button from "@/components/ui/button/button";

const FooterForm = () => {
  return (
    <form className="flex xl:items-center items-end xl:flex-row flex-col gap-12px">
      <div className="w-full">
        <input
          placeholder="Enter Your Email Address"
          className="outline-none border-b-[1px]  border-solid border-black_1 pb-10 text-14 leading-normal xl:w-[200px] w-full font-normal text-grey_2"
          id="email"
          name="email"
          type="email"
        />
      </div>

      <Button size="subscribe">SUBSCRIBE</Button>
    </form>
  );
};

export default FooterForm;
