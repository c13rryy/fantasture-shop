import { NAVBAR_LINKS } from "@/data/navigations";
import Link from "next/link";
import Typo from "../ui/typography/typo";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex items-center lg:gap-75px gap-[50px]">
        {NAVBAR_LINKS.map(item => (
          <li key={item.value}>
            <Link
              className="text-black_1 text-16 font-medium transition-colors hover:text-grey_4"
              href={item.href}
            >
              <Typo type="links">{item.value}</Typo>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
