import type { SVGProps } from "react";

interface IAttachIconProps extends SVGProps<SVGSVGElement> {
  color: string;
  fill: string;
}

export default function CartDislike({
  color,
  fill,
  ...rest
}: IAttachIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      color={color}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-x"
      {...rest}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
