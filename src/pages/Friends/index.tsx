import React from "react";
import SideBar from "../../components/ui/SideBar";
import Content from "./Content";

interface FriendsProps { }

const Friends: React.FC<FriendsProps> = () => {

  return (
    <div className="w-full max-w-[2000px] mx-auto">
      <div className="ml-[70px] hidden lg:flex">
        <div className="w-[35%]">
          <SideBar />
        </div>
        <div className="w-[65%]">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Friends;
