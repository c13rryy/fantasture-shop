import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputTypes
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  classes?: string;
  name: string;
  id: string;
}

const Input = ({ label, name, classes, id, ...rest }: InputTypes) => {
  return (
    <div className={`${classes} flex flex-col sm:gap-[22px] gap-16px`}>
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
  );
};

export default Input;
