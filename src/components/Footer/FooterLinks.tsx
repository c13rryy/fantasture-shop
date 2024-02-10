import { LinksProps } from "@/types";
import Link from "next/link";
import Typo from "../ui/typography/typo";

interface FooterLinksProp {
  title: string;
  links: Array<LinksProps>;
}

const FooterLinks = ({ title, links }: FooterLinksProp) => {
  return (
    <div className="flex flex-col sm:gap-56px mds:gap-24px gap-16px">
      <Typo type="defaultP" color="[#B88E2F]">
        {title}
      </Typo>
      <div className="sm:flex grid grid-cols-2 justify-items-start flex-col sm:gap-[46px] gap-12px">
        {links.map(link => (
          <div key={link.value}>
            <Link href={link.href}>
              <Typo type="links">{link.value}</Typo>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
