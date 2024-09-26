import SideBar from "@src/components/ui/SideBar";
import React, { useState } from "react";
import Content from "./Content";
import { MdOutlineFeed } from "react-icons/md";

interface MyProfileProps {}

const MyProfile: React.FC<MyProfileProps> = () => {
  // status
  const [status, setStatus] = useState<"content" | "sidebar">("sidebar");

  return (
    <div className="w-full max-w-[2000px] mx-auto">
      {/* Go to profile button */}
      <div
        onClick={() => setStatus("content")}
        title="Posts"
        className="z-[99999999] lg:hidden absolute top-[80px] left-[0px] shadow-sm w-[50px] h-[50px] flex justify-center items-center rounded-tr-[10px] rounded-br-[10px] bg-white_"
      >
        <MdOutlineFeed size={30} />
      </div>

      <div className="ml-[70px] hidden lg:flex">
        <div className="w-[35%]">
          <SideBar />
        </div>
        <div className="w-[65%]">
          <Content />
        </div>
      </div>

      <div className="w-full lg:hidden block">
        <SideBar />
      </div>

      <div className={`${status === 'content' ? 'left-0' : 'left-[-100%]'} lg:hidden block fixed top-0 w-full h-full bg-white_ z-[99999999999] transition-all duration-300`}>
        <Content setStatus={setStatus} />
      </div>
    </div>
  );
};

export default MyProfile;
