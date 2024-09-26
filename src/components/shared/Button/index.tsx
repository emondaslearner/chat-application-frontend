import React, { ReactNode } from "react";
import Spinner from "../Spinner";

interface ButtonProps {
  fill: boolean;
  children: ReactNode;
  className?: string;
  onClick?: any;
  loader?: boolean;
  loaderMessage?: string | ReactNode;
  customLoader?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  fill,
  children,
  className,
  onClick,
  loader,
  loaderMessage,
  customLoader,
}) => {
  return (
    <>
      {fill ? (
        <button
          className={`${className} bg-primary_ text-white_ border-0 px-10 py-2 rounded-[5px] flex items-center gap-x-[8px] justify-center`}
          onClick={onClick}
          disabled={loader}
        >
          {!customLoader && loader && (
            <Spinner
              loaderSize="sm"
              loaderStatus="elementLoader"
              color="default"
            />
          )}
          {loader && !customLoader ? loaderMessage : children}

          {customLoader ? customLoader : ""}
        </button>
      ) : (
        <button
          className={`${className} text-primary_ border-[1px] border-primary_ bg-transparent px-10 py-2 rounded-[5px]`}
          onClick={onClick}
          disabled={loader}
        >
          {!customLoader && loader && (
            <Spinner
              loaderSize="sm"
              loaderStatus="elementLoader"
              color="primary"
            />
          )}
          {loader && !customLoader ? loaderMessage : children}

          {customLoader ? customLoader : ""}
        </button>
      )}
    </>
  );
};

Button.defaultProps = {
  fill: false,
};

export default Button;
