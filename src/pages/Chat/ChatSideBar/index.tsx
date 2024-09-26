import React, { useEffect, useRef, useState } from "react";

//** import third party components

//** import components
import SideBar from "@src/shared/SideBar";

interface ChatSideBarProps {}

// this is for testing purpose
interface TestData {
  id: number;
}

const testList: TestData[] = [{ id: 1 }, { id: 2 }];

const ChatSideBar: React.FC<ChatSideBarProps> = () => {
  // refs
  const lastMessageRef = useRef<HTMLParagraphElement>(null);

  // states
  const [lastMessageWidth, setLastMessageWidth] = useState<number>(0); // for check last message width
  const [activeChat, setActiveChat] = useState<number | null>(null); //store active check (means which chat is active now)

  useEffect(() => {
    // get last message width
    if (lastMessageRef.current?.offsetWidth) {
      // set the width in state
      setLastMessageWidth(lastMessageRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="h-[100vh]">
      {/* sidebar */}
      <SideBar
        list={testList}
        lastMessageRef={lastMessageRef}
        lastMessageWidth={lastMessageWidth}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        name="Chats"
      />
    </div>
  );
};

export default ChatSideBar;
