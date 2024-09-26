import {
    acceptFriendRequestAPI,
    cancelFriendRequestAPI,
    getAllFriendRequest,
} from "@src/apis/friend-request";
import { queryClient } from "@src/App";
import AvatarSingle from "@src/components/shared/Avatar";
import Button from "@src/components/shared/Button";
import Spinner from "@src/components/shared/Spinner";
import TextEllipsis from "@src/components/shared/TextEllipsis";
import Modal from "@src/components/ui/Model";
import { deleteFriendRequestFromStore, setFriendRequests } from "@src/store/actions/friendRequest";
import { AppDispatch, RootState } from "@src/store/store";
import { success } from "@src/utils/alert";
import { handleAxiosError } from "@src/utils/error";
import React, { ReactNode, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

interface FriendRequestProps {
    children: ReactNode;
}

const FriendRequest: React.FC<FriendRequestProps> = ({ children }) => {
    const profileData = useSelector((state: RootState) => state.auth);

    const limit: number = 30;
    const sortBy: string = "updatedAt";
    const sortType: string = "dsc";
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    // dispatch
    const dispatch: AppDispatch = useDispatch();

    const { data, isLoading }: { data: any; isLoading: boolean } = useQuery({
        queryFn: () =>
            getAllFriendRequest({ limit, sortBy, sortType, search, page }),
        queryKey: [`allFriendRequest${profileData.id}${page}`],
    });

    useEffect(() => {
        if (data?.data?.length) {
            dispatch(setFriendRequests(data?.data))
        }
    }, [data]);

    // data from store
    const allRequests = useSelector((state: RootState) => state.friendRequest.friendRequests)

    return (
        <Modal
            closeButton={true}
            customCloseButton={
                <div className="p-[10px] !bg-dark_gray_ dark:bg-light_gray_">
                    <IoMdClose size={30} className="text-dark_" />
                </div>
            }
            dismissable={false}
            openButton={children}
            size="2xl"
            position="middle"
            status="custom"
            title="Friend Requests"
        >
            <div className="flex flex-col w-[90%] mx-auto py-[20px]">
                {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <Spinner loaderStatus={"elementLoader"} />
                    </div>
                ) : !allRequests.length ? (
                    <div className="text-center w-full flex justify-center">
                        <p className="text-[18px] font-semibold text-dark_ dark:text-dark_text_">
                            There is no friend requests
                        </p>
                    </div>
                ) : (
                    allRequests.map((data: any, i: number) => (
                        <Request data={data} i={i} />
                    ))
                )}
            </div>
        </Modal>
    );
};

export default FriendRequest;

interface RequestProps {
    data: any;
    i: number;
}

const Request: React.FC<RequestProps> = ({ data, i }) => {
    const acceptRequest = async () => {
        try {
            const gotData = await acceptFriendRequestAPI({ friendId: data?.sent_by });

            return gotData;
        } catch (err) {
            handleAxiosError(err, themeColor);
            throw err;
        }
    };

    const themeColor = useSelector((state: RootState) => state.themeConfig.mode);
    const profileData = useSelector((state: RootState) => state.auth);

    // dispatch
    const dispatch: AppDispatch = useDispatch();

    // accept friend request
    const { mutate, isLoading } = useMutation({
        mutationFn: acceptRequest,
        mutationKey: [`acceptRequest${data?.sent_by}`],
        onSuccess: (_data: any) => {
            success({ message: "Accept Request successfully", themeColor });
            queryClient.invalidateQueries(["friendRequest"]);
            queryClient.invalidateQueries([
                `friendRequest${profileData.id}${data?.sent_by}`,
            ]);
            queryClient.invalidateQueries([`allContacts${1}${30}${"friend"}`]);
        },
    });

    // delete friend requests
    const deleteFriendRequest = async () => {
        try {
            const gotData = await cancelFriendRequestAPI({ id: data?.sent_by._id });

            return gotData;
        } catch (err) {
            handleAxiosError(err, themeColor);
            throw err;
        }
    };

    const { mutate: deleteMutation, isLoading: deleteLoader } = useMutation({
        mutationFn: deleteFriendRequest,
        mutationKey: [`deleteRequest${data?.sent_by}`],
        onSuccess: (_data: any) => {
            success({ message: "Cancel Request successfully", themeColor });
            dispatch(deleteFriendRequestFromStore(i));
        },
    });

    return (
        <div key={i} className="flex items-center justify-between">
            <div className="flex items-center cursor-pointer">
                <AvatarSingle
                    src={
                        data?.sent_by?.profile_picture ||
                        "https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg"
                    }
                    alt="Profile Pic"
                />

                <TextEllipsis
                    className="font-semibold text-dark_gray_ dark:text-dark_text_ text-[18px] ml-[20px]"
                    text={data?.sent_by?.name}
                />
            </div>

            <div className="flex items-center">
                <Button
                    onClick={mutate}
                    loader={isLoading}
                    loaderMessage={"Processing..."}
                    fill
                >
                    Accept
                </Button>

                {deleteLoader ? (
                    <p className=" text-dark_gray_ dark:text-dark_text_ text-[14px] ml-[20px]">
                        Deleting...
                    </p>
                ) : (
                    <IoMdClose
                        onClick={() => deleteMutation()}
                        size={30}
                        className="ml-[30px] text-dark_ cursor-pointer"
                    />
                )}
            </div>
        </div>
    );
};
