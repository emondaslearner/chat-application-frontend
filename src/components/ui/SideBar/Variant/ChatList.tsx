import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeChatOpenedVar } from "../../../../store/actions/siteConfig";
import AvatarSingle from "../../../shared/Avatar";
import TextEllipsis from "../../../shared/TextEllipsis";
import { AppDispatch, RootState } from "@src/store/store";
import { useMutation, useQuery } from "react-query";
import {
  addChatMessagesToStore,
  setActiveChat,
  setChatMessages,
  setChats,
  setChatStatus,
  setChatUserData,
  updateChatData,
} from "@src/store/actions/chats";
import Spinner from "@src/components/shared/Spinner";
import { editChatAPI, getAllChats } from "@src/apis/chats";
import ReactTimeAgo from "react-time-ago";
import { handleAxiosError } from "@src/utils/error";
import { getSocket } from "@src/utils/socket";
import { addData, openDatabase } from "@src/utils/indexDb";
import { seenMessageAAPI } from "@src/apis/message";

interface ChatProps {
  search: string;
}

const ChatList: React.FC<ChatProps> = ({ search }) => {
  // dispatch
  const dispatch: AppDispatch = useDispatch();

  // profile data
  const profileData = useSelector((state: RootState) => state.auth);

  // chat data
  const chats = useSelector((state: RootState) => state.chats.chats);

  // chat id
  const activeChat = useSelector((state: RootState) => state.chats.activeChat);

  // active chat user data
  const activeChatUserData = useSelector(
    (state: RootState) => state.chats.selectedChatUserData
  );

  // fetch chat data
  const { data, isLoading }: { data: any; isLoading: boolean } = useQuery({
    queryFn: () =>
      getAllChats({
        page: 1,
        limit: 100,
        sortBy: "updatedAt",
        sortType: "dsc",
        search,
      }),
    queryKey: [`userChatData${search}${profileData.id}`],
    staleTime: Infinity,
  });

  // update chatList
  const updateMessageCount = async ({
    unreadCount,
    id,
  }: {
    unreadCount: number;
    id: string;
  }) => {
    try {
      const data = await editChatAPI(unreadCount, id);

      return data;
    } catch (err) {
      handleAxiosError(err, mode);
      throw err;
    }
  };

  const { mutate: updateChatCount } = useMutation({
    mutationFn: updateMessageCount,
    mutationKey: ["updateChats"],
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setChats(data?.data));
    }
  }, [data?.data]);

  // mode
  const mode = useSelector((state: RootState) => state.themeConfig.mode);

  // chat data to local storage on chat change
  useEffect(() => {
    if (activeChatUserData._id) {
      localStorage.setItem(
        "activeChatData",
        JSON.stringify(activeChatUserData)
      );
    } else {
      localStorage.removeItem("activeChatData");
    }
  }, [activeChatUserData]);

  // user message
  const updateMessagesToSeen = async (id: string) => {
    try {
      const data = seenMessageAAPI({ id });
      return data;
    } catch (err) {
      handleAxiosError(err, mode);
      throw err;
    }
  };

  const { mutate: updateToSeen } = useMutation({
    mutationFn: updateMessagesToSeen,
    mutationKey: ["seenMessage"],
  });


  // active chat data
  const activeChats: any = useSelector(
    (state: RootState) => state.chats.selectedChatUserData
  );

  useEffect(() => {
    if (activeChats?._id) {
      updateToSeen(activeChats?._id);
      updateChatCount({ unreadCount: 0, id: activeChats?._id });
    }
  }, [activeChats])


  // socket connection
  useEffect(() => {
    const socket = getSocket();

    // Define the event listener function
    const handleNewMessage = async (socketData: any) => {
      const activeChatDataString: any = localStorage.getItem("activeChatData");

      const activeChatData = JSON.parse(activeChatDataString);

      const db: any = await openDatabase();
      addData(db, socketData);

      if (activeChatData?._id === socketData.sent_by) {
        console.log('add message running', socketData);
        dispatch(addChatMessagesToStore(socketData));
        updateToSeen(socketData.sent_by);
        updateChatCount({ unreadCount: 0, id: socketData.sent_by });
      }

      console.log("activeChatUserData", activeChatData);
    };

    // Attach the event listener
    socket.on("addMessage", handleNewMessage);

    const handleNewMessageChat = (socketData: any) => {
      dispatch(updateChatData(socketData))
    }

    socket.on("addMessageChatData", handleNewMessageChat);

    return () => {
      socket.off("chat message");
    };
  }, []);

  return (
    <div className="mb-[130px] !gap-y-3 flex flex-col">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner loaderStatus={"elementLoader"} />
        </div>
      ) : chats.length ? (
        chats.map((data: any, i: number) => {
          const lastMessage = data?.last_message
            ? data?.last_message.split("/")
            : "";

          let modifiedLastMessage: string = "";
          if (lastMessage?.length) {
            if (lastMessage[0] === profileData.id) {
              modifiedLastMessage = `You: ${lastMessage[lastMessage.length - 1]
                }`;
            } else {
              modifiedLastMessage = `${lastMessage[lastMessage.length - 1]}`;
            }
          }

          return (
            <li
              onClick={() => {
                if (activeChat !== data._id) {
                  dispatch(setActiveChat(data?._id));
                  dispatch(changeChatOpenedVar(true));
                  dispatch(setChatMessages([]));
                  dispatch(
                    setChatUserData(
                      profileData.id ===
                        (data?.first_user._id || data?.first_user)
                        ? { ...chats[0]?.second_user, blocked: chats[0].blocked, blocked_by: chats[0].blocked_by }
                        : { ...chats[0]?.first_user, blocked: chats[0].blocked, blocked_by: chats[0].blocked_by }
                    )
                  );
                  dispatch(setChatStatus(true));
                }
              }}
              key={i}
              className={`${activeChat === data?._id &&
                "bg-primary_ border-transparent !text-white_"
                } w-[92%] mx-auto py-4 px-3 flex items-center rounded-[5px] border-[1px] border-medium_dark_ dark:border-dark_border_ transition-all duration-300 hover:border-primary_ cursor-pointer relative`}
            >
              <AvatarSingle
                status={
                  profileData.id === (data?.first_user._id || data?.first_user)
                    ? data?.second_user?.status
                    : data?.first_user?.status
                }
                src={
                  (profileData.id === (data?.first_user._id || data?.first_user)
                    ? data?.second_user?.profile_picture
                    : data?.first_user?.profile_picture) ||
                  "https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg"
                }
                alt="profile"
                className="w-[50px] h-[50px] min-w-[50px] rounded-full"
              />
              <div className="ml-5 overflow-hidden">
                <p className="absolute top-[10px] right-[20px] dark:text-dark_text_">
                  {modifiedLastMessage &&
                    lastMessage[0] !== profileData.id &&
                    data?.updatedAt && (
                      <ReactTimeAgo date={new Date(data?.updatedAt)} />
                    )}
                </p>
                <TextEllipsis
                  text={
                    profileData.id ===
                      (data?.first_user._id || data?.first_user)
                      ? data?.second_user?.name
                      : data?.first_user?.name
                  }
                  className="font-semibold dark:text-white_ text-[18px]"
                  maxTextWidth={150}
                />

                <TextEllipsis
                  className={`overflow-hidden text-ellipsis ${activeChat !== data?._id && "dark:text-dark_text_"
                    }`}
                  text={modifiedLastMessage || ""}
                  maxTextWidth={150}
                />
              </div>

              {activeChat !== data?._id &&
                data?.unread_message_count !== 0 &&
                lastMessage[0] !== profileData.id && (
                  <div className="w-[25px] h-[25px] absolute rounded-full bg-primary_ text-white_ flex justify-center items-center bottom-[8px] right-[8px]">
                    {data?.unread_message_count}
                  </div>
                )}
            </li>
          );
        })
      ) : (
        <div className="text-center w-full flex justify-center h-[60vh] items-center">
          <p className="text-[18px] font-semibold text-dark_ dark:text-dark_text_">
            There is no chats to show
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatList;
