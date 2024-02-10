import classNames from "classnames";

interface HeaderButtonProp {
  isOpen: boolean;
  onToggle: () => void;
}

const HeaderButton = ({ isOpen, onToggle }: HeaderButtonProp) => {
  const commonStyles =
    "relative w-full rounded-circle border-[1px] border-solid border-black_1 transition-all duration-300";
  return (
    <button
      className="flex items-center justify-center"
      onClick={() => onToggle()}
      type="button"
      aria-label="menu-toggler"
    >
      <span className="flex w-[20px] flex-col justify-between gap-6px">
        <span
          className={classNames(commonStyles, {
            "translate-y-[8px] rotate-45": isOpen,
          })}
        />
        <span className={classNames(commonStyles, { "opacity-0": isOpen })} />
        <span
          className={classNames(commonStyles, {
            "-translate-y-[8px] -rotate-45": isOpen,
          })}
        />
      </span>
    </button>
  );
};

export default HeaderButton;
