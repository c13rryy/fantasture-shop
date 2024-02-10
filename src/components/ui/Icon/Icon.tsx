import React from "react";
import type { SVGProps } from "react";
import { content } from "@/assets/icons/index";
import type { IAvailableIcons } from "@/assets/icons/index";

export interface IIconProps {
  svgProps?: SVGProps<SVGSVGElement>;
  icon: IAvailableIcons;
  size?: number;
  height?: number;
  color?: string;
  fill?: string;
  viewBox?: string;
  className?: string;
}

export function Icon(props: IIconProps) {
  const {
    icon,
    size = 24,
    color,
    height,
    fill = "#fff",
    className,
    svgProps = {},
    ...rest
  } = props;

  const Component = content[icon] as React.FC<React.SVGProps<SVGSVGElement>>;
  if (!Component) {
    return null;
  }

  return (
    <Component
      viewBox="0 0 24 24"
      width={size}
      className={className}
      height={height || size}
      color={color}
      fill={fill}
      {...svgProps}
      {...rest}
    />
  );
}
