import AvatarSingle from "@src/components/shared/Avatar";
import Button from "@components/shared/Button";
import TextEllipsis from "@src/components/shared/TextEllipsis";
import React, { useEffect, useState } from "react";
import SearchBar from "@src/components/shared/SearchBar";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getAllUserAPI } from "@src/apis/user";
import Spinner from "@src/components/shared/Spinner";
import { addFriendAPI } from "@src/apis/friend";
import { useSelector } from "react-redux";
import { RootState } from "@src/store/store";
import { handleAxiosError } from "@src/utils/error";
import { queryClient } from "@src/App";
import { success } from "@src/utils/alert";
import { cancelFriendRequestAPI } from "@src/apis/friend-request";

interface SuggestionsProps { }

const Suggestions: React.FC<SuggestionsProps> = () => {
  const [suggestion, setSuggestion] = useState<any>([]);


  const [search, setSearch] = useState<string>("");
  const sortBy: string = "updateAt";
  const sortType: string = "dsc";
  const limit: number = 30;
  const [page, setPage] = useState<number>(1);

  // profiledata
  const profileData = useSelector((state: RootState) => state.auth)


  const { data, isLoading }: { data: any; isLoading: boolean } = useQuery({
    queryFn: () =>
      getAllUserAPI({
        search,
        sortBy,
        sortType,
        limit,
        page,
        type: "no-friend",
      }),
    queryKey: [`allSuggestions${search}${page}${limit}${'no-friend'}`]
  });

  useEffect(() => {
    if (data?.data) {
      setSuggestion(data?.data);
    }
  }, [data?.data]);

  // theme mode
  const themeColor = useSelector((state: RootState) => state.themeConfig.mode)

  return (
    <div className="overflow-y-auto max-h-[100%] bg-white_ dark:bg-dark_bg_ mt-[20px] p-[15px] rounded-[10px] pb-[30px]">
      <div className="flex items-center justify-between mb-[10px]">
        <h3 className="text-[20px] font-semibold text-dark_ dark:text-white_">
          Suggestions
        </h3>

        <div className="max-w-[30px]">
          <SearchBar setValue={setSearch} />
        </div>
      </div>

      <div className="flex flex-col gap-y-[10px]">
        {
          isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner loaderStatus={"elementLoader"} />
            </div>
          ) : (
            suggestion.length === 0 ? (
              <div className="text-center w-full flex justify-center">
                <p className="text-[18px] font-semibold text-dark_ dark:text-dark_text_" >There is no friends to sent request</p>
              </div>
            ) : (
              suggestion.map((item: any, i: number) => (
                <div key={i}>
                  <Component item={item} themeColor={themeColor} profileData={profileData} />
                </div>
              ))
            )
          )
        }
      </div>
    </div>
  );
};

export default Suggestions;

interface ComponentProps {
  item: any;
  profileData: any;
  themeColor: 'dark' | 'light';
}


const Component = ({ item, profileData, themeColor }: ComponentProps) => {

  const [status, setStatus] = useState<string>("");

  // navigation
  const navigate: NavigateFunction = useNavigate();

  const addFriend = async () => {
    try {
      const data: any = await addFriendAPI({ friendId: item._id });

      return data;
    } catch (err: any) {
      handleAxiosError(err, themeColor);
      throw err;
    }
  };

  // add friend react query mutation
  const { isLoading, mutate } =
    useMutation({
      mutationFn: addFriend,
      mutationKey: [`addFriendKey${profileData.id}`],
      onSuccess: (_data: any) => {
        success({ message: "Sent Friend Request successfully", themeColor });
        queryClient.invalidateQueries(["friendRequest"]);
        queryClient.invalidateQueries([`friendRequest${profileData.id}${item._id}`]);
        setStatus('sended');
      },
    });

  // cancel friend request api
  const cancelRequest = async () => {
    try {
      const data = await cancelFriendRequestAPI({ id: item._id });

      return data;
    } catch (err) {
      handleAxiosError(err, themeColor);
      throw err;
    }
  };

  // cancel friend request react query mutation
  const { isLoading: cancelFriendLoadingStatus, mutate: cancelFriendMutation } =
    useMutation({
      mutationFn: cancelRequest,
      mutationKey: ["cancelRequestKey"],
      onSuccess: (_data: any) => {
        success({ message: "Cancel Request successfully", themeColor });
        queryClient.invalidateQueries(["friendRequest"]);
        queryClient.invalidateQueries([`friendRequest${profileData.id}${item._id}`]);

        setStatus("");
      },
    });

  return (
    <div
      className="w-full flex flex-col gap-[8px] bg-light_bg_ p-[13px] rounded-[5px] cursor-pointer transition-all duration-300 hover:bg-white_ dark:bg-dark_light_bg_ hover:dark:bg-dark_bg_"
    >
      <div onClick={() => navigate(`/profile/${item?._id}`)} className="flex items-center gap-x-[13px] cursor-pointer">
        <AvatarSingle
          size="md"
          status={item.status}
          timeago={new Date(item.updatedAt)}
          src={item?.profile_picture || "https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg"}
          alt="Profile Picture"
        />

        <TextEllipsis
          className="font-semibold text-dark_ dark:text-dark_text_ "
          text={item?.name}
          maxTextWidth={70}
        />
      </div>
      {
        status === 'sended' ? (
          <Button
            fill={true}
            className="w-full hover:text-primary_ hover:bg-transparent border-[1px] border-primary_"
            loader={cancelFriendLoadingStatus}
            loaderMessage="Processing..."
            onClick={cancelFriendMutation}
          >
            Cancel Request
          </Button>
        ) : (
          <Button
            fill={true}
            className="w-full hover:text-primary_ hover:bg-transparent border-[1px] border-primary_"
            loader={isLoading}
            loaderMessage="Processing..."
            onClick={mutate}
          >
            Add Friend
          </Button>
        )
      }
    </div>
  )
}
