import { ReactNode } from "react";
import Typo from "../typography/typo";

interface SectionProps {
  children: ReactNode;
  classes?: string;
  title?: string;
}

const Section = ({ classes, title, children }: SectionProps) => {
  return (
    <section className={`${classes} xl:mt-100 sm:mt-70 mt-48`}>
      {title && (
        <Typo className="text-center" tag="h1" color="black_1">
          {title}
        </Typo>
      )}

      {children}
    </section>
  );
};

export default Section;
