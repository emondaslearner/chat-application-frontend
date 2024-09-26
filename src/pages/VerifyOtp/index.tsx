import { verifyOtp } from "@src/apis/auth";
import Button from "@src/components/shared/Button";
import Input from "@src/components/shared/Input";
import Label from "@src/components/shared/Label";
import { RootState } from "@src/store/store";
import { success } from "@src/utils/alert";
import { handleAxiosError } from "@src/utils/error";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  NavigateFunction,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

interface VerifyOtpProps {}

const VerifyOtp: React.FC<VerifyOtpProps> = () => {
  // get params
  const [searchParams] = useSearchParams();

  const email: string | null = searchParams.get("email");

  // themeColor
  const themeColor: "light" | "dark" = useSelector(
    (state: RootState) => state.themeConfig.mode
  );

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  //states
  const [otp, setOtp] = useState<number | string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    try {
      setLoader(true);
      const data: any = await verifyOtp({ otp, email });
      setLoader(false);

      if (data.code === 200) {
        localStorage.setItem("token", data.token);
        success({ message: data.message, themeColor });
        navigate("/");
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
          Verify OTP
        </h1>

        <form onSubmit={handleVerifyOtp} className="w-[90%] mx-auto">
          <div className=" mt-[10px]">
            <Label htmlFor="otp">Otp:</Label>
            <Input
              value={otp}
              onChange={(e: any) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              id="otp"
              type="number"
              className="rounded-[5px] mt-[4px]"
            />
          </div>

          <Button
            loader={loader}
            loaderMessage="Processing..."
            fill={true}
            className="w-full mt-[20px]"
          >
            Verify
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
