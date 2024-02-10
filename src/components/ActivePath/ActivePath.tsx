import { Icon } from "@/components/ui/Icon/Icon";
import Typo from "@/components/ui/typography/typo";

interface ActivePathProps {
  pageName: string;
  firstPathElement: string;
  secondPathElemet: string;
}

const ActivePath = ({
  pageName,
  firstPathElement,
  secondPathElemet,
}: ActivePathProps) => {
  return (
    <div className="relative z-20 flex flex-col gap-8px h-full cursor-default justify-center items-center">
      <Icon icon="logo" size={52} height={45} viewBox="0 0 52 45" />
      <Typo tag="h2" text={pageName} />
      <div className="flex items-center gap-6px">
        <Typo type="labelM" text={firstPathElement} className="capitalize" />
        <Icon icon="active-path-arrow" size={20} viewBox="0 0 20 20" />
        <Typo type="mediumP" text={secondPathElemet} className="capitalize" />
      </div>
    </div>
  );
};

export default ActivePath;
