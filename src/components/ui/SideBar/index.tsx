import React, { useState } from "react";
import SideBarHeader from "./SideBarHeader";
import ActiveUsers from "./ActiveUsers";
import { useLocation } from "react-router-dom";
import ChatList from "./Variant/ChatList";
import CallList from "./Variant/CallList";
import FriendsList from "./Variant/FriendsList";
import Profile from "./Variant/Profile";

interface SideBarProps {
  setChat?: (value: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ setChat }) => {
  // location
  const location = useLocation();

  const split = location.pathname.split("/");

  // search 
  const [search, setSearch] = useState<string>("");

  // localhost length
  const locationArray = location.pathname.split("/");

  return (
    <div className="border-r-[1px] border-light_border_ dark:border-dark_border_ h-[100vh] overflow-hidden dark:bg-dark_bg_">
      {/* if page is not profile */}
      {split?.[1] !== "profile" && (
        <>
          {/* chat header */}
          <SideBarHeader setSearch={setSearch} search={search} />

          {/* Active users */}
          {location.pathname === "/chat" && <ActiveUsers />}

          {/* chat list */}
          <div className="w-full h-[85vh] bg-[#fafbfd] dark:bg-dark_bg_">
            <ul className="pt-5 !gap-y-3 flex flex-col h-[100%] overflow-y-auto overflow-x-hidden scrollHidden">
              {/* lists */}
              {location.pathname === "/chat" && (
                <>
                  {/* Chat list */}
                  <ChatList search={search} />
                </>
              )}

              {location.pathname === "/calls" && (
                <>
                  {/* Call list */}
                  <CallList />
                </>
              )}

              {location.pathname === "/friends" && (
                <>
                  {/* Call list */}
                  <FriendsList search={search} setChat={setChat} />
                </>
              )}
            </ul>
          </div>
        </>
      )}

      {/* Profile */}
      {
        (locationArray.length > 0 && locationArray[1] === 'profile') && <Profile />
      }
    </div>
  );
};

export default SideBar;
