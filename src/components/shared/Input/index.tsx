import React from "react";
import { Input as Inputs } from "reactstrap";
import { InputType } from "reactstrap/types/lib/Input";

interface InputsProps {
  className?: string;
  type?: InputType; // Use the correct type from 'reactstrap'
  props?: object;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: any) => void;
  ref?: any;
  id?: string;
  required?: boolean
}

const Input: React.FC<InputsProps> = ({
  className,
  type,
  placeholder,
  value,
  onChange,
  ref,
  id,
  required,
  ...props
}) => {
  return (
    <Inputs
      className={`${className} border-[1px] dark:bg-dark_light_bg_ dark:text-dark_text_ dark:border-dark_border_ dark:placeholder:text-dark_text_ border-light_border_ outline-none px-3 py-2 w-full`}
      value={value}
      {...props}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      ref={ref}
      id={id}
      required={required}
    />
  );
};

export default Input;
