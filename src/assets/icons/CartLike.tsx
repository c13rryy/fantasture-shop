import type { SVGProps } from "react";

interface IAttachIconProps extends SVGProps<SVGSVGElement> {
  color: string;
  fill: string;
}

export default function CartLike({ color, fill, ...rest }: IAttachIconProps) {
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
      className="lucide lucide-check-circle-2"
      {...rest}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
