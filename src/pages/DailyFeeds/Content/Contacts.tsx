import AvatarSingle from "@src/components/shared/Avatar";
import TextEllipsis from "@src/components/shared/TextEllipsis";
import SearchBar from "@src/components/shared/SearchBar";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Spinner from "@src/components/shared/Spinner";
import { getFriendList } from "@src/apis/friend";
import { useSelector } from "react-redux";
import { RootState } from "@src/store/store";

interface ContactsProps { }

const Contacts: React.FC<ContactsProps> = () => {
  const [contacts, setContacts] = useState<any>([]);

  // navigation
  const navigate: NavigateFunction = useNavigate();

  // profileData
  const profileData = useSelector((state: RootState) => state.auth)

  const [search, setSearch] = useState<string>("");
  const sortBy: string = "updateAt";
  const sortType: string = "dsc";
  const limit: number = 30;
  const [page, setPage] = useState<number>(1);

  const { data, isLoading }: { data: any; isLoading: boolean } = useQuery({
    queryFn: () =>
      getFriendList({
        search,
        sortBy,
        sortType,
        limit,
        page
      }),
    queryKey: [`allContacts${search}${page}${limit}${'friend'}`],
  });

  useEffect(() => {
    if (data?.data) {
      setContacts(data?.data);
    }
  }, [data?.data]);

  return (
    <div className=" overflow-y-auto max-h-[100%] bg-white_ dark:bg-dark_bg_ mt-[20px] p-[15px] rounded-[10px] pb-[30px]">
      <div className="mb-[15px] flex items-center justify-between">
        <h3 className="text-[20px] font-semibold text-dark_ dark:text-white_">
          Contacts
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
            contacts.length === 0 ? (
              <div className="text-center w-full flex justify-center">
                <p className="text-[18px] font-semibold text-dark_ dark:text-dark_text_" >There is no friends</p>
              </div>
            ) : (contacts.map((item: any, i: number) => {
              return (
                <div onClick={() => navigate(`/profile/${item._id}`)} key={i} className="flex items-center gap-x-[13px] cursor-pointer">
                  <AvatarSingle
                    size="md"
                    status={(profileData.id === item?.second_user._id
                      ? item?.first_user?.status
                      : item?.second_user?.status)}
                    src={(profileData.id === item?.second_user._id
                      ? item?.first_user?.profile_picture
                      : item?.second_user?.profile_picture) || "https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg"}
                    alt="Profile Picture"
                  />

                  <TextEllipsis
                    className="font-semibold text-dark_ dark:text-dark_text_ "
                    text={(profileData.id === item?.second_user._id
                      ? item?.first_user?.name
                      : item?.second_user?.name)}
                  />
                </div>
              )
            })
            )
          )
        }
        { }
      </div>
    </div>
  );
};

export default Contacts;
