import { signUp } from "@src/apis/auth";
import Button from "@src/components/shared/Button";
import DatePicker from "@src/components/shared/DatePicker";
import Input from "@src/components/shared/Input";
import Label from "@src/components/shared/Label";
import { RootState } from "@src/store/store";
import { success } from "@src/utils/alert";
import { handleAxiosError } from "@src/utils/error";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // themeColor
  const themeColor: "light" | "dark" = useSelector(
    (state: RootState) => state.themeConfig.mode
  );

  // loader
  const [loader, setLoader] = useState(false);

  const navigate: NavigateFunction = useNavigate();

  // check logged in or not
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const clearStates = () => {
    setDate(new Date());
    setName("");
    setEmail("");
    setPassword("");
  };

  const SignUpToBeAMember = async (e: any) => {
    try {
      setLoader(true);
      e.preventDefault();

      const apiData: any = await signUp({
        name,
        email,
        dateOfBirth: date,
        password,
      });
      setLoader(false);

      if (apiData.code === 201) {
        localStorage.setItem("token", apiData.token);
        success({ message: apiData.message, themeColor });
        navigate("/");
      }
      clearStates();
    } catch (err: any) {
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
          Sign Up
        </h1>

        <form onSubmit={SignUpToBeAMember} className="w-[90%] mx-auto">
          <div className=" mt-[10px]">
            <Label htmlFor="name">Name:</Label>
            <Input
              placeholder="Enter a name"
              id="name"
              type="text"
              className="rounded-[5px] mt-[4px]"
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className=" mt-[10px]">
            <Label htmlFor="email">Email:</Label>
            <Input
              placeholder="Enter an email"
              id="email"
              type="email"
              className="rounded-[5px] mt-[4px]"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className=" mt-[10px] date-picker">
            <Label htmlFor="date" className="mb-[4px] block">
              Date Of Birth:
            </Label>
            <DatePicker
              id="date"
              className="border-[1px] dark:bg-dark_light_bg_ dark:text-dark_text_ dark:border-dark_border_ dark:placeholder:text-dark_text_ border-light_border_ outline-none px-3 w-full rounded-[5px] block py-3"
              value={date}
              onChange={(data) => setDate(data.$d)}
            />
          </div>

          <div className=" mt-[10px]">
            <div className="flex w-full items-center justify-between">
              <Label htmlFor="password">Password:</Label>
            </div>
            <Input
              placeholder="Enter a password"
              id="password"
              type="password"
              className="rounded-[5px] mt-[4px]"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            fill={true}
            loader={loader}
            loaderMessage="Processing..."
            className="w-full mt-[20px]"
          >
            Sign Up
          </Button>
          <Link
            to="/login"
            className="text-primary_ text-[16px] font-semibold hover:underline mt-[10px] text-center block"
          >
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
