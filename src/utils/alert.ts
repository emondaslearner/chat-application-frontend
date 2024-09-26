import { toast, ToastPosition } from "react-toastify";

interface ToastProps {
  message: string;
  position?: ToastPosition;
  themeColor: "light" | "dark";
}

export const success = ({
  message,
  position = "top-right",
  themeColor,
}: ToastProps) => {
  toast.success(message, {
    position,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: themeColor,
  });
};

export const error = ({
  message,
  position = "top-right",
  themeColor,
}: ToastProps): void => {
  toast.error(message, {
    position,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: themeColor,
  });
};

export const info = ({
  message,
  position = "bottom-right",
  themeColor,
}: ToastProps): void => {
  toast.info(message, {
    position,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: themeColor,
  });
};
