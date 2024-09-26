import React from "react";
import SideBarContent from "../../shared/SideBar/SideBarContent";
import SideBarHeader from "../../shared/SideBar/SideBarHeader";

interface SideBarChatData {
    id: number;
}

interface TestData {
  id: number;
}

interface SideBarProps {
  list: SideBarChatData[];
  activeChat: number | null;
  setActiveChat: (id: number) => any;
  lastMessageRef: React.RefObject<HTMLParagraphElement>;
  lastMessageWidth: number;
  name: string
}

const SideBar: React.FC<SideBarProps> = ({ list, activeChat, setActiveChat, lastMessageRef, lastMessageWidth, name }) => {
  return (
    <div className="border-r-[1px] border-l-[1px] border-dark_gray_ h-full bg-[#fafbfd]">
      {/* chat header */}
      <SideBarHeader name={name} />

      {/* chat list */}
      <div className="w-full h-[70%]">
        <ul className="pt-5 !gap-y-3 flex flex-col h-full">
          {list.map((data: TestData) => {
            return (
              <SideBarContent
                data={data}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
                lastMessageRef={lastMessageRef}
                lastMessageWidth={lastMessageWidth}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
