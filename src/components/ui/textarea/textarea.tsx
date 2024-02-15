import React, {
  type TextareaHTMLAttributes,
  type DetailedHTMLProps,
} from "react";

interface TextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  classes?: string;
  label: string;
  height?: string;
  id: string;
  name: string;
}

const Textarea = ({ classes, name, id, label, ...rest }: TextAreaProps) => {
  return (
    <div className={`${classes} flex flex-col gap-[22px]`}>
      <label className="font-medium text-16 text-black_1" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        className="resize-none px-30 pt-26 pb-70 bg-white border-[1px] border-solid border-grey_2 rounded-[10px] outline-none text-16 font-normal text-grey_2"
        {...rest}
      />
    </div>
  );
};

export default Textarea;
