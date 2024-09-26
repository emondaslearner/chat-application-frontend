import React, { useEffect } from "react";
import { Spinner as Spinners } from "@nextui-org/react";

interface SpinnerProps {
  loaderStatus?: undefined | "pageLoader" | "elementLoader";
  loaderSize?: "lg" | "md" | "sm" | undefined;
  className?: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

const Spinner: React.FC<SpinnerProps> = ({
  loaderStatus,
  loaderSize,
  className,
  color,
}) => {
  useEffect(() => {
    const class1 = document.querySelector(".animate-spinner-ease-spin");
    const class2 = document.querySelector(".animate-spinner-linear-spin");

    if (color === "default") {
      class1?.classList.add("spinner-color-default");
      class2?.classList.add("spinner-color-default");
    }

    if (color === "primary") {
      class1?.classList.add("spinner-color-primary");
      class2?.classList.add("spinner-color-primary");
    }
  }, [color]);

  return (
    <>
      {loaderStatus === "elementLoader" ? (
        <Spinners
          color={color}
          size={loaderSize || "lg"}
          className={`${className}`}
        />
      ) : (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white_ dark:bg-dark_bg_ z-[999999]">
          <Spinners
            color={color}
            size={loaderSize || "lg"}
            className={`${className}`}
          />
        </div>
      )}
    </>
  );
};

export default Spinner;
