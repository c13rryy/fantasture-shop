import { Icon } from "@/components/ui/Icon/Icon";

export default function NotFound() {
  return (
    <section className="flex absolute top-[50%] w-full justify-center">
      <div className="flex flex-col gap-24px">
        <h1 className="xl:text-[70px] sm:text-[50px] mds:text-[40px] text-[25px] uppercase font-bold text-black_1">
          the page doesn&lsquo;t exist.
        </h1>

        <div className="flex justify-center">
          <div className="error-animation">
            <Icon icon="not-found" size={150} />
          </div>
        </div>
      </div>
    </section>
  );
}
