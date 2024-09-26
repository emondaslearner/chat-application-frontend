import React, { useEffect, useRef, ReactNode, useState } from "react";

//** import third party lib
import {
  ArrowRight,
  MoreVertical,
  PlusCircle,
  Smile,
} from "react-feather";
import Input from "../../../components/shared/Input";
import Dropdown from "@src/components/ui/Dropdown";
import AvatarSingle from "@src/components/shared/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import { useMutation, useQuery } from "react-query";
import { handleAxiosError } from "@src/utils/error";
import { deleteMessageAPI, getAllChatMessageAPI, getLastMessageAPI, seenMessageAAPI, sentMessageAPI } from "@src/apis/message";
import { deleteChatDataViaIndex, deleteSingleMessage, setActiveChat, setChatMessages, setChats, setChatStatus, setChatUserData, updateChatData, updateChatMessageToSeen, updateSingleMessage } from "@src/store/actions/chats";
import { addData, deleteMultipleRecords, deleteViaKeyFromIndexdb, getAllDataFromDB, openDatabase, updateMultipleRecords, updateViaKeyInIndexdb } from "@src/utils/indexDb";
import { success } from "@src/utils/alert";
import Spinner from "@src/components/shared/Spinner";
import { deleteChatAPI } from "@src/apis/chats";
import { changeChatOpenedVar } from "@src/store/actions/siteConfig";
import { getSocket } from "@src/utils/socket";
import { blockFriendAPI } from "@src/apis/friend";
import Button from "@src/components/shared/Button";

interface ContentProps { }

interface HeaderProps {
  activeChats: any;
  setChatDeleteStatus: any;
  blockUser: any;
}

interface Items {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick?: any;
}


const Header: React.FC<HeaderProps> = ({ activeChats, setChatDeleteStatus, blockUser }) => {

  // mode
  const mode: 'light' | 'dark' = useSelector((state: RootState) => state.themeConfig.mode);

  // dispatch
  const dispatch: AppDispatch = useDispatch();

  // profile data
  const profileData = useSelector((state: RootState) => state.auth);

  // chats
  const chats = useSelector((state: RootState) => state.chats.chats);

  const deleteChat = async () => {
    try {
      const data = await deleteChatAPI(activeChats._id);

      return data;
    } catch (err) {
      handleAxiosError(err, mode);
      throw err;
    }
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: deleteChat,
    mutationKey: ['deleteChat'],
    onSuccess: async (data: any) => {
      try {
        const index: number = chats.findIndex((data: any) => data._id === activeChat);
        dispatch(deleteChatDataViaIndex(index));

        success({ message: "Successfully deleted chat", themeColor: mode });
        const db = await openDatabase();

        deleteMultipleRecords(db, profileData.id, activeChats._id);
      } catch (err) {
        console.log('delete error', err);
      }

    }
  });

  useEffect(() => {
    setChatDeleteStatus(isLoading);
  }, [isLoading]);

  const activeChat = useSelector((state: RootState) => state.chats.activeChat);

  // sidebar header dropdown options
  const items: Items[] = [
    {
      key: "edit",
      label: "Block User",
      onClick: () => {
        blockUser({ id: activeChats._id, block: true });
      }
    },
    {
      key: "delete",
      label: "Delete Chats",
      onClick: () => {
        mutate();
        dispatch(setActiveChat({}));
        localStorage.removeItem("activeChat");
        dispatch(changeChatOpenedVar(false));
        dispatch(setChatStatus(false))
      }
    },
  ];

  return (
    <div className="px-8 py-3 border-light_border_ dark:border-dark_border_ dark:bg-dark_bg_ border-b-[1px] flex justify-between h-[9%]">
      <div className="flex items-center">
        <AvatarSingle
          src={
            activeChats?.profile_picture ||
            "https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg"
          }
          alt="Profile Pic"
          status={activeChats?.status || "offline"}
        />
        <div className="ml-3">
          <p className="text-dark_ font-semibold dark:text-white_">
            {activeChats?.name || ""}
          </p>
          <p className="mt-[0px] text-[14px] font-semibold text-dark_gray_">
            {activeChats?.status || "offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-x-4">
        {/* <Phone size={20} className="text-dark_gray_ cursor-pointer" /> */}

        {/* Dropdown */}
        <Dropdown items={items}>
          <MoreVertical size={20} className="text-dark_gray_ cursor-pointer" />
        </Dropdown>
      </div>
    </div>
  );
};


const Content: React.FC<ContentProps> = () => {
  // delete state
  const [chatDeleteStatus, setChatDeleteStatus] = useState<boolean>(false);

  // active chat data
  const activeChats: any = useSelector(
    (state: RootState) => state.chats.selectedChatUserData
  );

  // profileData
  const profileData = useSelector((state: RootState) => state.auth);

  // dispatch 
  const dispatch: AppDispatch = useDispatch();

  // refs
  const chatMainDiv = useRef<HTMLParagraphElement>(null);

  // message
  const [message, setMessage] = useState<string>("");

  // all messages
  const getAllMessages = useSelector((state: RootState) => state.chats.userChatMessages);

  // block user
  const blockTheUser = async ({ id, block }: { id: string, block: boolean }) => {
    try {
      const data = await blockFriendAPI({ id, block });
      return data;
    } catch (err) {
      handleAxiosError(err, mode);
      throw err;
    }
  }

  // block the user
  const { mutate: blockUser } = useMutation({
    mutationFn: blockTheUser,
    mutationKey: ['blockTheUser'],
    onSuccess: () => {
      success({ message: activeChats.blocked ? "Successfully unblocked" : "Successfully blocked", themeColor: mode })
      if (activeChats?._id) {
        dispatch(setChatUserData({
          ...activeChats,
          blocked: !activeChats.blocked,
          blocked_by: activeChats.blocked ? null : profileData.id
        }));
      }
    }
  });

  // default scroll the component to the bottom
  useEffect(() => {
    // Scroll the div to its bottom when the component mounts
    if (chatMainDiv.current && activeChats) {
      setTimeout(() => {
        if (chatMainDiv.current) {
          chatMainDiv.current.scrollTop = chatMainDiv.current.scrollHeight;
        }
      }, 100);
    }
  }, [chatMainDiv, activeChats, message, getAllMessages]);


  // theme mode
  const mode = useSelector((state: RootState) => state.themeConfig.mode);

  const sendMessageToUser = async () => {
    try {
      const data = sentMessageAPI({
        id: activeChats._id,
        message,
        replied: "",
      });

      return data;
    } catch (err) {
      handleAxiosError(err, mode);
      throw err;
    }
  };

  // sent message
  const { mutate } = useMutation({
    mutationFn: sendMessageToUser,
    mutationKey: ["SentMessageToUser"],
    onSuccess: (data: any) => {
      const request = indexedDB.open("chats", 1);

      dispatch(updateChatData(data?.user));

      request.onupgradeneeded = (event: any) => {
        // This event is triggered when the database is being created or upgraded
        const db = event.target.result;

        if (!db.objectStoreNames.contains("messages")) {
          // Create an object store only if it does not already exist
          db.createObjectStore("messages", { keyPath: "_id" });
        }
      };

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        addData(db, data.data);
      };

      const list = [...getAllMessages];

      list[list.length] = data.data;

      dispatch(setChatMessages(list));
      setMessage("");
    },
  });

  // fetch data from indexDb
  useEffect(() => {
    const getData = async () => {
      const allMessages = await getAllDataFromDB();

      const chatMessages = allMessages.filter((data: any) => {
        const isUserInvolved = (data.sent_by._id || data.sent_by) === profileData.id || (data.sent_to._id || data.sent_to) === profileData.id;
        const isChatActive = (data.sent_by._id || data.sent_by) === activeChats._id || (data.sent_to._id || data.sent_to) === activeChats._id;
        return isUserInvolved && isChatActive;
      });

      dispatch(setChatMessages(chatMessages));
    }

    getData();
  }, [activeChats])


  // chat data
  const chats = useSelector((state: RootState) => state.chats.chats);


  // socket connection
  useEffect(() => {
    const socket = getSocket();

    // Define the event listener function
    const handleNewMessage = async (socketData: any) => {
      const db = await openDatabase();
      updateMultipleRecords(db, socketData.userId, socketData.id);
      dispatch(updateChatMessageToSeen());
    };

    // Attach the event listener
    socket.on("seenMessage", handleNewMessage);

    return () => {
      socket.off("chat message");
    };
  }, []);

  // delete message
  const deleteMessage = async ({ id, status }: { id: string, status: string }) => {
    try {
      const data = await deleteMessageAPI({ id, status });
      return data;
    } catch (err) {
      handleAxiosError(err, mode);
      throw err;
    }
  };

  const { mutate: deleteMessageMutate } = useMutation({
    mutationFn: deleteMessage,
    mutationKey: ['deleteMessage'],
    onSuccess: async (data: any) => {
      const db = await openDatabase();
      if (typeof data?.data === 'string') {
        deleteViaKeyFromIndexdb(db, data?.data);
        dispatch(deleteSingleMessage(data?.data));
      } else {
        updateViaKeyInIndexdb(db, data?.data?._id, data?.data);
        dispatch(updateSingleMessage(data?.data));
      }
    }
  });

  const getLastMessage = async () => {
    try {
      const data = await getLastMessageAPI({ id: activeChats._id });

      return data;
    } catch (err) {
      handleAxiosError(err, mode);
      throw err;
    }
  }

  const { data: getLastMessageFromApi }: { data: any } = useQuery({
    queryFn: getLastMessage,
    queryKey: [`getLastMessage${activeChats._id}${profileData.id}`],
    staleTime: Infinity
  })

  const getAllMessagesViaApi = async () => {
    try {
      const data = await getAllChatMessageAPI({ id: activeChats._id, page: 1, limit: 1000 });
      return data;
    } catch (err) {
      handleAxiosError(err, mode);
      throw err;
    }
  }

  const [apiCallStatus, setApiCallStatus] = useState(false);

  console.log('apiCallStatus', apiCallStatus);

  const { data: getAllNewMessages, refetch }: { data: any, refetch: any } = useQuery({
    queryFn: getAllMessagesViaApi,
    queryKey: [`getLastMessage-${activeChats._id}-${profileData.id}`, apiCallStatus],
    staleTime: Infinity,
    enabled: apiCallStatus,
    onSuccess: () => {
      setApiCallStatus(false);
    }
  });

  useEffect(() => {
    const checkLastMessage = async () => {
      if (getLastMessageFromApi && getAllMessages.length > 0) {
        const lastMessage = getAllMessages[getAllMessages.length - 1];

        console.log('lastMessage', lastMessage);
        console.log('getLastMessageFromApi', getLastMessageFromApi);

        // Check if last message ID from API doesn't match the last message in the list
        if ((getLastMessageFromApi.data?._id !== lastMessage._id) && getLastMessageFromApi.data) {
          setApiCallStatus(true)
        }
      }

      if (getLastMessageFromApi && !getAllMessages.length) {
        setApiCallStatus(true)
      }
    };

    checkLastMessage();
  }, [getAllMessages, getLastMessageFromApi]);

  useEffect(() => {
    if (getAllNewMessages) {
      console.log('getAllNewMessage', getAllNewMessages)
    }
  }, [getAllNewMessages])


  return (
    <div className="w-full h-[100vh] overflow-hidden">
      {/* chat header */}
      <Header blockUser={blockUser} activeChats={activeChats} setChatDeleteStatus={setChatDeleteStatus} />

      {/* chat body */}
      <div className="w-full h-[91%]">
        {/* main chat body */}
        <div
          ref={chatMainDiv}
          className="ls h-[90%] w-full gap-y-8 flex flex-col overflow-y-auto border-b-[1px] border-light_border_ dark:border-dark_border_ dark:bg-dark_light_bg_"
        >
          <div className=" dark:bg-dark_light_bg_ mt-[20px]">
            <AvatarSingle
              src={
                activeChats?.profile_picture ||
                "https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg"
              }
              alt="Profile image"
              className="!w-[100px] !h-[100px] mx-auto"
            />
            <p className="text-[20px] font-semibold text-center mt-1 text-dark_text_ dark:text-white_">
              {activeChats.name}
            </p>
            <p className="text-[16px] text-dark_gray_ text-center">
              {activeChats.bio}
            </p>
          </div>
          <div className="h-full w-[95%] mx-auto px-8  gap-y-1 flex flex-col">
            {
              !chatDeleteStatus ?
                getAllMessages.map((chat: any, i: number) => {
                  const passedDate = new Date(chat?.createdAt);

                  let hours = passedDate.getHours();
                  let minutes = passedDate.getMinutes();
                  const ampm = hours >= 12 ? 'PM' : 'AM';

                  // Convert to 12-hour format
                  hours = hours % 12;
                  hours = hours || 12; // The hour '0' should be '12'

                  // Ensure minutes are correctly formatted
                  minutes = minutes || 0;

                  // Format the minutes and hours with leading zeros if necessary
                  const formattedHours = hours.toString().padStart(2, '0');
                  const formattedMinutes = minutes.toString().padStart(2, '0');

                  // Combine hours, minutes, and AM/PM
                  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;


                  const items: Items[] = [
                    {
                      key: "deleteForMe",
                      label: "Delete",
                      onClick: () => deleteMessageMutate({ id: chat._id, status: 'deleteForMe' })
                    },
                    {
                      key: "delete",
                      label: "Delete for everyone",
                      onClick: () => deleteMessageMutate({ id: chat._id, status: 'deleteForEveryOne' })
                    },
                  ];
                  return (
                    <>
                      <div className={`${getAllMessages.length === i + 1 && '!pb-[20px] !block'}`} key={i}>
                        {
                          (chat.sent_by?._id || chat.sent_by) === profileData.id && (
                            <div className="w-full flex justify-end items-center group">
                              <div className="relative max-w-[400px] bg-[#f5f6fa] dark:bg-dark_bg_ pt-[3px] pb-3 px-2 rounded-[3px]">
                                <p className=" text-deep_dark_ dark:text-dark_text_ leading-5 text-[15px] flex items-end gap-x-[10px] pr-[50px]">
                                  {chat?.message}
                                </p>
                                <span className="mb-[-10px] text-[10px] flex items-center justify-end text-deep_dark_ dark:text-dark_text_">{formattedTime}<span className="ml-[5px]">{chat.status === 'not_delivered' ? 'Not delivered' : chat.status}</span></span>
                              </div>

                              <div className="group-hover:block hidden">
                                <Dropdown items={items}>
                                  <MoreVertical size={20} className="text-dark_gray_ cursor-pointer" />
                                </Dropdown>
                              </div>
                            </div>
                          )
                        }
                        {
                          (chat.sent_to?._id || chat.sent_to) === profileData.id && chat.status !== 'not_delivered' && (
                            <div className="group w-full flex items-center">
                              <div className="relative max-w-[400px] bg-primary_ pt-[3px] pb-3 px-2 rounded-[3px]">
                                <p className="text-white_ leading-5 text-[15px]">
                                  {chat?.message}
                                </p>
                                <span className="mb-[-10px] text-[10px] flex items-center justify-end text-deep_dark_ dark:text-dark_text_ ml-[40px]">{formattedTime}</span>
                              </div>

                              <div className="group-hover:block hidden">
                                <Dropdown items={items}>
                                  <MoreVertical size={20} className="text-dark_gray_ cursor-pointer" />
                                </Dropdown>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </>
                  )
                }) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <Spinner loaderStatus={"elementLoader"} />
                  </div>
                )
            }
          </div>
        </div>

        {
          activeChats?.blocked ? (
            <div className="flex items-center h-[10%] px-3 relative justify-center w-full bg-[#f5f6fa] dark:bg-dark_bg_">
              {
                activeChats?.blocked_by === profileData.id ? (
                  <div className="flex items-center gap-x-5">
                    <p className="font-[18px] dark:text-dark_text_">You have blocked the user.</p>
                    <Button onClick={() => blockUser({ id: activeChats._id, block: false })} fill={false}>Unblock</Button>
                  </div>
                ) : (
                  <p className="font-[18px] dark:text-dark_text_">You can not message this user. the person has blocked you.</p>
                )
              }
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutate();

                const newMessageObject = {
                  sent_to: activeChats?._id,
                  message,
                  replied: "",
                  sent_by: profileData.id,
                  status: "not_delivered",
                  createdAt: new Date(),
                  updatedAt: new Date()
                };

                const list = [...getAllMessages, newMessageObject];

                dispatch(setChatMessages(list));

                // update chats
                const index = chats.findIndex((item: any) => {
                  const isFirstUserMatch = activeChats._id === (item.first_user._id || item.first_user);
                  const isSecondUserMatch = activeChats._id === (item.second_user._id || item.second_user);

                  return (isFirstUserMatch || isSecondUserMatch);
                });

                if (index !== -1) {
                  const firstData = chats[index];
                  const chatsList = [...chats];

                  // Remove the item from its current position
                  chatsList.splice(index, 1);

                  // Add the item to the beginning of the array
                  chatsList.unshift(firstData);
                  dispatch(setChats(chatsList));
                }

              }}
              className="flex items-center h-[10%] px-3 relative justify-between"
            >
              <PlusCircle
                size={20}
                className="text-dark_gray_ cursor-pointer absolute z-50"
              />
              <Input
                type="text"
                className="outline-none h-full absolute left-0 top-0 w-full pl-12"
                placeholder="Type your message here..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="absolute z-50 right-4 flex gap-x-5 items-center">
                <Smile size={20} className="text-dark_gray_" />
                <div className="cursor-pointer bg-primary_ p-3 rounded-[50%]">
                  <ArrowRight type="submit" size={30} className="text-white_" />
                </div>
              </div>
            </form>
          )
        }

      </div>
    </div>
  );
};

export default Content;
