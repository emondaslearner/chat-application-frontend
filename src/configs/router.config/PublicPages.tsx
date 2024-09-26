import Login from "@src/pages/Login";
import SignUp from "@src/pages/SignUp";
import ForgotPassword from "@src/pages/ForgotPassword";
import VerifyOtp from "@src/pages/VerifyOtp";

const PublicPages = [
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
      publicRoute: true,
    },
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    meta: {
      layout: "blank",
      publicRoute: true,
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
      publicRoute: true,
    },
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
    meta: {
      layout: "blank",
      publicRoute: true,
    },
  },
];

export default PublicPages;
