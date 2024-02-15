import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
  ReactNode,
  useMemo,
} from "react";
import { VariantsButtonSize, VariantsButtonType } from "./types";
import classNames from "classnames";
import { buttonStyles } from "./helpers";
import { Icon } from "../Icon/Icon";
import { IAvailableIcons } from "@/assets/icons";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  type?: VariantsButtonType;
  onClick?: MouseEventHandler;
  classes?: string;
  size: VariantsButtonSize;
  disabled?: boolean;
  useIcon?: boolean;
  iconName?: IAvailableIcons;
  isLoading?: boolean;
}

const Button = ({
  type = "button",
  onClick,
  size,
  classes,
  disabled = false,
  useIcon = false,
  iconName = "cart",
  children,
  isLoading,
  ...rest
}: ButtonProps) => {
  const styles = useMemo(
    () =>
      classNames({
        [buttonStyles.basicStyles]: true,
        [buttonStyles.defaultButton]: size === "default",
        [buttonStyles.smallButton]: size === "small",
        [buttonStyles.largeButton]: size === "large",
        [buttonStyles.subscribeButton]: size === "subscribe",
        [buttonStyles.disabledButton]: disabled,
        [buttonStyles.customButton]: size === "custom",
        [buttonStyles.authButton]: size === "auth",
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${classes} ${styles}`}
      onClick={onClick}
      {...rest}
    >
      {useIcon && <Icon icon={iconName} size={40} viewBox="0 0 40 40" />}
      {isLoading && (
        <div className="animate-spin">
          <Icon icon="loader" size={24} />
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
