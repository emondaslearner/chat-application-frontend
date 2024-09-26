import { sentForgotPasswordMailtoUser } from "@src/apis/auth";
import Button from "@src/components/shared/Button";
import Input from "@src/components/shared/Input";
import Label from "@src/components/shared/Label";
import { RootState } from "@src/store/store";
import { success } from "@src/utils/alert";
import { handleAxiosError } from "@src/utils/error";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  // themeColor
  const themeColor: "light" | "dark" = useSelector(
    (state: RootState) => state.themeConfig.mode
  );

  const navigate: NavigateFunction = useNavigate();

  // states
  const [email, setEmail] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const handleForgotPassword = async (e: any) => {
    e.preventDefault();
    try {
      setLoader(true);
      const data: any = await sentForgotPasswordMailtoUser({ email });
      setLoader(false);

      if (data.code === 200) {
        localStorage.setItem("token", data.token);
        success({ message: data.message, themeColor });
        navigate(`/verify-otp?email=${email}`);
      }
    } catch (err) {
      setLoader(false);
      handleAxiosError(err, themeColor);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center dark:bg-dark_light_bg_">
      <div
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        className="max-w-[400px] w-full shadow-lg px-[10px] py-[20px] rounded-[10px] dark:bg-dark_bg_"
      >
        <h1 className="text-center text-[22px] font-semibold dark:text-white_">
          Forgot Password
        </h1>

        <form onSubmit={handleForgotPassword} className="w-[90%] mx-auto">
          <div className=" mt-[10px]">
            <Label htmlFor="email">Email:</Label>
            <Input
              placeholder="Enter email of your account"
              id="email"
              type="text"
              className="rounded-[5px] mt-[4px]"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>

          <Button
            loader={loader}
            loaderMessage="Processing..."
            fill={true}
            className="w-full mt-[20px]"
          >
            Sent OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
