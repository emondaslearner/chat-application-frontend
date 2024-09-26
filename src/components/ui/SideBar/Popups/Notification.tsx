import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { IoMailOpenOutline } from "react-icons/io5";
import Model from "../../Model";
import Avatar from "../../../shared/Avatar";

interface NotificationProps {}

interface TestData {
  id: number;
}
const testList: TestData[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
}));

const Notification: React.FC<NotificationProps> = () => {
  return (
    <Model
      openButton={
        <FontAwesomeIcon
          icon={faBell}
          className="mr-5 text-[19px] text-dark_gray_ cursor-pointer"
        />
      }
      status="custom"
      title={
        <div className="flex w-full items-center justify-between">
          <p className="text-center text-[25px] text-dark_ dark:text-white_">
            Notifications
          </p>
          <div className=" cursor-pointer p-[10px] rounded-full hover:bg-light_gray_ transition-all duration-300 dark:hover:bg-dark_light_bg_">
            <IoMailOpenOutline
              size={25}
              className="text-dark_ dark:text-white_"
            />
          </div>
        </div>
      }
      position="right"
      size="md"
      closeButton={false}
    >
      <div className="h-[100vh]">
        <div className="h-[100%] overflow-y-auto pb-[80px]">
          {testList.map((data: TestData) => {
            return (
              <div
                key={data?.id}
                className={`w-full px-[20px] py-[20px] cursor-pointer transition-all duration-300 dark:hover:bg-dark_light_bg_ hover:bg-light_gray_ flex items-center ${
                  data?.id === 1 && "border-t-[1px]"
                } border-b-[1px] dark:border-dark_border_ border-light_border_ relative`}
              >
                <Avatar
                  className="!w-[55px] !h-[55px]"
                  src="https://play-lh.googleusercontent.com/0SAFn-mRhhDjQNYU46ZwA7tz0xmRiQG4ZuZmuwU8lYmqj6zEpnqsee_6QDuhQ4ZofwXj=w240-h480-rw"
                  alt=""
                />
                <div className="ml-3">
                  <p className="dark:text-white_ text-dark_ text-[19px] font-semibold">
                    Emon Das{" "}
                    <span className="!text-[17px] text-dark_gray_ !font-normal dark:text-dark_text_">
                      invited you to new project.
                    </span>
                  </p>
                  <p className="text-dark_gray_ dark:text-dark_text_ text-[15px]">
                    4 days ago
                  </p>
                </div>

                <div className="w-[10px] h-[10px] rounded-full bg-primary_ absolute right-3 top-2"></div>
              </div>
            );
          })}
        </div>
      </div>
    </Model>
  );
};

export default Notification;
