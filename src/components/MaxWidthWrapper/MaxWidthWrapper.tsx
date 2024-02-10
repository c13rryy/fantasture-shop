import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={`${className} mx-auto max-w-screen-2xl`}>{children}</div>
  );
};

export default MaxWidthWrapper;
