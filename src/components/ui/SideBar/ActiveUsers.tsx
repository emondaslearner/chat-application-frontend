import React from "react";
import AvatarSingle from "../../shared/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import { useQuery } from "react-query";
import { getOnlineUsersAPI } from "@src/apis/user";
import { setActiveChat, setChatMessages, setChatStatus, setChatUserData } from "@src/store/actions/chats";
import { changeChatOpenedVar } from "@src/store/actions/siteConfig";

interface ActiveUsersProps { }

const ActiveUsers: React.FC<ActiveUsersProps> = () => {

  // profileData
  const profileData = useSelector((state: RootState) => state.auth);

  const { data }: { data: any, isLoading: boolean } = useQuery({
    queryFn: () => getOnlineUsersAPI({ page: 1, limit: 50, sortType: 'dsc', sortBy: 'updatedAt' }),
    queryKey: [`onlineUser${profileData.id}`]
  });

  const activeChat = useSelector((state: RootState) => state.chats.activeChat);

  // dispatch
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="w-[96.5%] h-auto flex mx-3 gap-3 mt-3 overflow-y-hidden overflow-x-auto online-users">
      {data?.data?.map((data: any, index: number) => {
        return (
          <div onClick={() => {
            if (activeChat !== data._id) {
              dispatch(setActiveChat(data?._id));
              dispatch(changeChatOpenedVar(true));
              dispatch(setChatMessages([]));
              dispatch(
                setChatUserData(
                  profileData.id ===
                    (data?.first_user._id || data?.first_user)
                    ? data?.second_user
                    : data?.first_user
                )
              );
              dispatch(setChatStatus(true));
            }
          }} className="relative cursor-pointer" key={index}>
            <div className="w-[15px] absolute z-[1] right-0 h-[15px] rounded-full bg-normal_green"></div>
            <AvatarSingle
              className="w-[50px] h-[50px] rounded-full"
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
              alt="Online users"
            />
            <p className="text-center dark:text-dark_text_ font-semibold"></p>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveUsers;