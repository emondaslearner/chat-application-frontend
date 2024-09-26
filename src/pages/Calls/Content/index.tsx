import React from "react";
import AvatarSingle from "../../../components/shared/Avatar";
import { MdPhoneCallback } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";

interface ContentProps {}

// this is for testing purpose
interface TestData {
  id: number;
}

interface DataProps {
  id: number;
}

const testList: TestData[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
}));

const Content: React.FC<ContentProps> = () => {
  return (
    <div className="w-full h-[100vh] overflow-hidden dark:bg-dark_light_bg_">
      <div className="w-[90%] mx-auto border-[1px] border-light_border_ dark:border-dark_border_ py-[30px] mt-6 rounded-[5px]">
        <AvatarSingle
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGb8PmEaRgeXshs4ycQC8wyYl8h6RffDbg-A&usqp=CAU"
          alt="Profile picture"
          className="w-[100px] h-[100px] rounded-full mx-auto"
        />
        <div className="mt-3">
          <h3 className="text-center text-[25px] font-semibold text-dark_ dark:text-dark_text_">
            Emon Das
          </h3>
          <p className="bg-primary_ py-[2px] px-[20px] rounded-[5px] text-white_ font-semibold text-[16px] table mx-auto mt-2">
            dev.emondas@gmail.com
          </p>
        </div>
      </div>

      <div className="w-full mt-7 gap-y-4 flex flex-col overflow-x-hidden overflow-y-auto h-full scrollHidden pb-[350px]">
        {testList.map((data: DataProps) => {
          return (
            <li
              className={`w-[90%] mx-auto py-4 px-3 flex items-center justify-between rounded-[5px] border-[1px] border-light_border_ dark:border-dark_border_ transition-all duration-300 hover:border-primary_ cursor-pointer relative`}
              key={data?.id}
            >
              <div className="flex items-center">
                <div className="rounded-full flex justify-center items-center bg-primary_ pl-3 py-3 pr-1">
                  <MdPhoneCallback className="mr-2 text-white_" size={28} />
                </div>
                <div className="ml-5 relative">
                  <p className="font-semibold dark:text-white_ text-[18px]">
                    Incoming Call
                  </p>
                  <p
                    className={`font-semibold dark:text-dark_text_ text-[16px] flex items-center text-dark_gray_`}
                  >
                    Just Now
                  </p>
                </div>
              </div>

              <IoCallOutline className="dark:text-dark_text_" size={25} />
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
