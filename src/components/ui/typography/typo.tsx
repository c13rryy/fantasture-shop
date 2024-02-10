import { VariantTypoTags, VariantTypoTagsStyles } from "./types";
import classNames from "classnames";
import { typoStyles } from "./typoStyles";

interface TypographyProps {
  text?: string | number;
  className?: string;
  children?: React.ReactNode;
  tag?: VariantTypoTags;
  type?: VariantTypoTagsStyles;
  color?: string;
}

const Typo = ({
  text,
  className,
  children,
  tag,
  type,
  color,
}: TypographyProps) => {
  const Tag = tag || "p";

  const classes = classNames({
    [typoStyles.h1]: tag === "h1",
    [typoStyles.h2]: tag === "h2",
    [typoStyles.h3]: tag === "h3",
    [typoStyles.h4]: tag === "h4",
    [typoStyles.defaultP]: type === "defaultP",
    [typoStyles.links]: type === "links",
    [typoStyles.mediumP]: type === "mediumP",
    [typoStyles.logo]: type === "logo",
    [typoStyles.sectionP]: type === "sectionP",
    [typoStyles.labelM]: type === "labelM",
    [typoStyles.customTypo]: (type = "customTypo"),
  });

  return (
    <Tag className={`${classes} ${className} ${`text-${color}`}`}>
      {text}
      {children}
    </Tag>
  );
};

export default Typo;
