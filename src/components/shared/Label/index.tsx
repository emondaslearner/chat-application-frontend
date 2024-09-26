import React, { ReactNode } from "react";
import { Label as Labels } from "reactstrap";

interface LabelProps {
  children: ReactNode;
  htmlFor: string;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children, htmlFor, className }) => {
  return (
    <Labels
      htmlFor={htmlFor}
      className={`text-[16px] text-dark_ dark:text-dark_text_ font-semibold ${className}`}
    >
      {children}
    </Labels>
  );
};

export default Label;
