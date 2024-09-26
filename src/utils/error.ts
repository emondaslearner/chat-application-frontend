import { error } from "./alert";

const handleAxiosError = (err: any, themeColor: "light" | "dark"): void => {
  if (!err?.response) {
    error({
      message: "Server unable to respond at this time. Please try again later",
      themeColor,
    });
    return;
  }

  const status = err.response.status;
  const data = err.response.data;

  switch (status) {
    case 400:
      if (data?.data) {
        for (let i = 0; i < data.data.length; i++) {
          error({ message: data.data[i].errorData, themeColor });
        }
      } else {
        error({ message: data.message, themeColor });
      }
      break;
    case 401:
      error({ message: "Unauthorized access", themeColor });
      break;
    case 403:
      error({ message: "Forbidden", themeColor });
      break;
    case 404:
      error({ message: data.message, themeColor });
      break;
    case 500:
      error({
        message:
          "Server unable to respond at this time. Please try again later",
        themeColor,
      });
      break;
    default:
      error({ message: "An unexpected error occurred", themeColor });
      break;
  }
};

export { handleAxiosError };
