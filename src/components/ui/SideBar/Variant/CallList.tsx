import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeChatOpenedVar } from "../../../../store/actions/siteConfig";
import AvatarSingle from "../../../shared/Avatar";
import { MdPhoneCallback } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { AppDispatch } from "@src/store/store";

interface ChatProps {}

// this is for testing purpose
interface TestData {
  id: number;
}
const testList: TestData[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
}));

const CallList: React.FC<ChatProps> = () => {
  // dispatch
  const dispatch: AppDispatch =  useDispatch();

  // states
  const [activeChat, setActiveChat] = useState<number | null>(null); //store active check (means which chat is active now)

  return (
    <>
      {testList.map((data: TestData) => {
        return (
          <li
            onClick={() => {
              setActiveChat(data?.id);
              dispatch(changeChatOpenedVar(true));
            }}
            key={data?.id}
            className={`${
              activeChat === data?.id &&
              "bg-primary_ border-transparent !text-white_"
            } w-[92%] mx-auto py-4 px-3 flex items-center justify-between rounded-[5px] border-[1px] border-medium_dark_ dark:border-dark_border_ transition-all duration-300 hover:border-primary_ cursor-pointer relative`}
          >
            <div className="flex items-center">
              <AvatarSingle
                src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
                alt="profile"
                className="w-[50px] h-[50px] min-w-[50px] rounded-full"
              />
              <div className="ml-5 relative">
                <p className="font-semibold dark:text-white_ text-[18px]">
                  Emon Das
                </p>
                <p className={`font-semibold dark:text-dark_text_ text-[16px] flex items-center ${activeChat === data?.id ? 'text-light_gray_' : 'text-dark_gray_ '}`}>
                  <MdPhoneCallback className="mr-2" size={20} /> Just Now
                </p>
              </div>
            </div>

            <IoCallOutline className="dark:text-dark_text_" size={25} />
          </li>
        );
      })}
    </>
  );
};

export default CallList;
