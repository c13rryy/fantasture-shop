import UserNameForm from "@/components/Forms/UserNameForm/UserNameForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper/MaxWidthWrapper";
import Typo from "@/components/ui/typography/typo";
import { authOptions, getAuthSession } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

const page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions.pages?.signIn || "/sign-in");
  }
  return (
    <section className="h-[100vh] flex justify-center items-center">
      <MaxWidthWrapper className="xh:w-full w-[95%]">
        <div className="flex flex-col sm:gap-24px gap-16px">
          <Typo tag="h1" text="Settings" />
          <div className="border-t-[1px] border-solid pt-24">
            <UserNameForm
              user={{
                id: session.user.id,
                username: session.user.username || "",
              }}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
