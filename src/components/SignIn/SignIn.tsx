import Link from "next/link";
import UserAuthForm from "../Forms/UserAuthForm/UserAuthForm";
import Typo from "../ui/typography/typo";

const SignIn = () => {
  return (
    <div className="flex justify-center absolute inset-[0] w-full h-full items-center">
      <div className="flex flex-col items-center gap-24px w-[500px] border-[1px] border-solid p-30 rounded-md">
        <Typo tag="h3" text="Welcome back" />
        <Typo
          type="labelM"
          text=" By continuing, you are setting up a Company account and agree to our
          User Agreement and Privacy Policy"
          color="grey_2"
          className="text-center"
        />
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-zinc-700">
          New to market
          <Link
            href="/sign-up"
            className="hover:text-brand text-sm underline underline-offset-4"
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
