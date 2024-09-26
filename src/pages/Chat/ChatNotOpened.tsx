import React from "react";

// components
import AvatarSingle from "../../components/shared/Avatar";
import Button from "../../components/shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import { changeChatOpenedVar } from "@src/store/actions/siteConfig";
import { setActiveChat, setChatStatus, setChatUserData } from "@src/store/actions/chats";

interface ChatNotOpenedProps { }

const ChatNotOpened: React.FC<ChatNotOpenedProps> = () => {

  const chats = useSelector((state: RootState) => state.chats.chats);

  // profile data
  const profileData = useSelector((state: RootState) => state.auth)

  // dispatch
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="w-full h-[100vh] flex justify-center items-center dark:bg-dark_light_bg_">
      {
        chats.length && (
          <div>
            <AvatarSingle
              src={
                (profileData.id === (chats[0]?.first_user._id || chats[0]?.first_user)
                  ? chats[0]?.second_user?.profile_picture
                  : chats[0]?.first_user?.profile_picture) ||
                "https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg"
              }
              alt="Profile image"
              className="!w-[100px] !h-[100px] mx-auto"
            />
            <p className="text-[25px] font-semibold text-center mt-1 dark:text-white_">
              {profileData.id === (chats[0]?.first_user._id || chats[0]?.first_user)
                ? chats[0]?.second_user?.name
                : chats[0]?.first_user?.name}
            </p>
            <p className="text-[18px] text-dark_gray_">
              Please select a chat to start messaging.
            </p>
            <Button onClick={() => {
              dispatch(changeChatOpenedVar(chats[0]?._id));
              dispatch(setActiveChat(chats[0]?._id));
              dispatch(changeChatOpenedVar(true));
              dispatch(setChatStatus(true));
              dispatch(setChatUserData(profileData.id === (chats[0]?.first_user._id || chats[0]?.first_user)
                ? { ...chats[0]?.second_user, blocked: chats[0].blocked, blocked_by: chats[0].blocked_by }
                : { ...chats[0]?.first_user, blocked: chats[0].blocked, blocked_by: chats[0].blocked_by }));
            }} className="mx-auto table mt-3" fill={false}>
              Start a Conversation
            </Button>
          </div>
        )
      }
    </div>
  );
};

export default ChatNotOpened;
