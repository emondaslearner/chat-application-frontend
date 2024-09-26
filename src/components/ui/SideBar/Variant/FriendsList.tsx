import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeChatOpenedVar } from "../../../../store/actions/siteConfig";
import AvatarSingle from "../../../shared/Avatar";
import { HiOutlineLocationMarker } from "react-icons/hi";
import TextEllipsis from "../../../shared/TextEllipsis";
import { AppDispatch, RootState } from "@src/store/store";
import { useQuery } from "react-query";
import { getFriendList } from "@src/apis/friend";
import Spinner from "@src/components/shared/Spinner";
import { setActiveFriendDetails } from "@src/store/actions/friend";

interface FriendsListProps {
  setChat?: (value: boolean) => void;
  search: string;
}

const FriendsList: React.FC<FriendsListProps> = ({ setChat, search }) => {
  // dispatch
  const dispatch: AppDispatch = useDispatch();

  // profile data
  const profileData = useSelector((state: RootState) => state.auth)

  // states
  const [activeChat, setActiveChat] = useState<string | null>(null); //store active check (means which chat is active now)


  const [friends, setFriends] = useState<any>([]);

  const [page, setPage] = useState<number>(1);
  const sortBy: string = 'createdAt';
  const sortType: string = 'dsc';
  const limit: number = 50;

  const { data, isLoading }: { data: any, isLoading: boolean } = useQuery({
    queryFn: () => getFriendList({ page, limit, sortBy, sortType, search }),
    queryKey: [`userFriend${page}${search}${profileData.id}`],
    staleTime: Infinity
  });

  useEffect(() => {
    if (data?.data) {
      setFriends(data?.data);
    }
  }, [data, search]);

  // friend active details
  const activeDetails = useSelector((state: RootState) => state.friend.activeFriendDetails)

  useEffect(() => {
    const keys = Object.keys(activeDetails);
    if (!keys.length && friends.length) {
      dispatch(setActiveFriendDetails(profileData.id === friends[0]?.second_user._id ? friends[0]?.first_user : friends[0]?.second_user));
      setActiveChat(friends[0]?._id);
    }
  }, [friends]);

  return (
    <>
      {
        isLoading && page === 1 ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner loaderStatus={"elementLoader"} />
          </div>
        ) : (

          !friends.length ?
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-[18px] font-semibold text-dark_ dark:text-dark_text_">There is no Friend</p>
            </div>
            : friends.map((data: any, i: number) => {
              const firstCity = data?.first_user?.city;
              const secondCity = data?.second_user?.city;

              const firstCountry = data?.first_user?.country;
              const secondCountry = data?.second_user?.country;

              const firstCondition = profileData.id === data?.second_user._id ? firstCity : secondCity;
              const secondCondition = profileData.id === data?.second_user._id ? firstCountry : secondCountry
              return (
                <li
                  onClick={() => {
                    setActiveChat(data?._id);
                    dispatch(changeChatOpenedVar(true));
                    setChat && setChat(true);
                    dispatch(setActiveFriendDetails(profileData.id === data?.second_user._id ? data?.first_user : data?.second_user))
                  }}
                  key={i}
                  className={`${activeChat === data?._id &&
                    "bg-primary_ border-transparent !text-white_"
                    } w-[92%] mx-auto py-4 px-3 flex items-center rounded-[5px] border-[1px] border-medium_dark_ dark:border-dark_border_ transition-all duration-300 hover:border-primary_ cursor-pointer relative`}
                >
                  <AvatarSingle
                    status={profileData.id === data?.second_user._id
                      ? data?.first_user?.status
                      : data?.second_user?.status}
                    src={(profileData.id === data?.second_user._id
                      ? data?.first_user?.profile_picture
                      : data?.second_user?.profile_picture) ||
                      "https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg"}
                    alt="profile"
                    className="w-[50px] h-[50px] min-w-[50px] rounded-full"
                  />
                  <div className="ml-5 overflow-hidden">
                    <p className="font-semibold dark:text-white_ text-[18px]">
                      {profileData.id === data?.second_user._id
                        ? data?.first_user?.name
                        : data?.second_user?.name}
                    </p>

                    {
                      (secondCondition || firstCondition) && (
                        <div className="flex items-center">
                          <HiOutlineLocationMarker
                            size={20}
                            className={`${activeChat === data?._id
                              ? "text-white_"
                              : "dark:text-dark_text_"
                              }`}
                          />
                          <TextEllipsis
                            className={`overflow-hidden text-ellipsis ml-2 ${activeChat !== data?._id && "dark:text-dark_text_"
                              }`}
                            text={`${firstCondition ? firstCondition : ""}, ${secondCondition ? secondCondition : ""}`}
                            maxTextWidth={92}
                          />
                        </div>
                      )
                    }
                  </div>
                </li>
              );
            })
        )
      }
    </>
  );
};

export default FriendsList;
