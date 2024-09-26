import React, { FunctionComponent } from "react";

interface DataObject {
  id: number; // Use lowercase "number" for the type
}

interface SideBarContentProps {
  data: DataObject;
  setActiveChat: (id: number) => any; // Adjust the setActiveChat function type
  activeChat: number | null; // Use lowercase "number" for the type
  lastMessageRef: React.RefObject<HTMLParagraphElement>; // Adjust the type here
  lastMessageWidth: number // Use lowercase "number" for the type
}

const SideBarContent: FunctionComponent<SideBarContentProps> = ({
  setActiveChat,
  data,
  activeChat,
  lastMessageRef,
  lastMessageWidth,
}) => {

  return (
    <li
      onClick={() => setActiveChat(data?.id)}
      key={data?.id}
      className={`${
        activeChat === data?.id && "bg-primary_ border-transparent text-white_"
      } w-[92%] mx-auto py-4 px-3 flex items-center rounded-[5px] border-[1px] border-medium_dark_ transition-all duration-300 hover:border-primary_ cursor-pointer`}
    >
      <img
        src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
        alt="profile"
        className="w-[50px] h-[50px] min-w-[50px] rounded-full"
      />
      <div className="ml-5 relative">
        <p className="absolute top-[-5px] right-0">Just now</p>
        <p className="font-semibold">Emon Das</p>
        <p className="h-[25px] overflow-hidden" ref={lastMessageRef}>
          I am sorry I didn't catch that. Could you please tell me again what
          you are trying to tell
        </p>
        {lastMessageWidth > 308 && (
          <div className="absolute right-4 top-6">...</div>
        )}
      </div>
    </li>
  );
};

export default SideBarContent;
