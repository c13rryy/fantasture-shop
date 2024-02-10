import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputTypes
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  isError?: boolean;
  errorMessage?: string;
  label?: string;
  classes?: string;
  name: string;
  id: string;
}

const Input = ({
  label,
  isError,
  errorMessage,
  name,
  classes,
  id,
  ...rest
}: InputTypes) => {
  return (
    <>
      <div className={`${classes} flex flex-col gap-[22px]`}>
        <label className="font-medium text-16 text-black_1" htmlFor={name}>
          {label}
        </label>
        <input
          className="py-26 px-30 bg-white border-[1px] border-solid border-[#9F9F9F] rounded-[10px] outline-none text-16 font-normal text-grey_2"
          id={id}
          name={name}
          {...rest}
        />
      </div>
      {isError && (
        <p className="px-24 pt-4 text-12 font-medium leading-4 text-error">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default Input;
