import React, { useEffect, useState } from "react";
import AvatarSingle from "../../../components/shared/Avatar";
import { TbMessageDots } from "react-icons/tb";
import { BsCalendar2Event } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "@src/store/store";
import { CgProfile } from "react-icons/cg";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { queryClient } from "@src/App";

interface ContentProps { }

interface TestData {
  title: string;
  value: string;
  icon: React.ReactElement<any, any>;
}

const Content: React.FC<ContentProps> = () => {


  // navigate
  const navigate: NavigateFunction = useNavigate();

  // profile details
  const profileDetails = useSelector((state: RootState) => state.friend.activeFriendDetails);

  // params
  const { id } = useParams();

  const [testData, setTestData] = useState<TestData[]>([]);

  useEffect(() => {
    const newDataList: any = [];

    if (profileDetails?.date_of_birth) {
      const date = new Date(profileDetails.date_of_birth); // Use the date of birth instead of the current date
      newDataList.push({
        title: "Birth Date",
        value: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        icon: (
          <BsCalendar2Event className="dark:text-dark_text_ text-dark_gray_" size={25} />
        ),
      });
    }

    if (profileDetails?.bio) {
      newDataList.push({
        title: "Bio",
        value: `${profileDetails.bio}`,
        icon: (
          <AiOutlineHome className="dark:text-dark_text_ text-dark_gray_" size={25} />
        ),
      });
    }

    if (profileDetails?.address) {
      newDataList.push({
        title: "Address",
        value: `${`${profileDetails.address?.city},` || ""} ${profileDetails.address?.country || ""}`,
        icon: (
          <AiOutlineHome className="dark:text-dark_text_ text-dark_gray_" size={25} />
        ),
      });
    }
    
    setTestData(newDataList)
  }, [profileDetails]);

  return (
    <>
      {
        Object.keys(profileDetails).length ? (
          <div className="w-full h-[100vh] overflow-hidden dark:bg-dark_light_bg_">
            <div className="w-[90%] mx-auto border-[1px] border-light_border_ dark:border-dark_border_ py-[30px] mt-6 rounded-[5px]">
              <AvatarSingle
                src={profileDetails?.profile_picture || "https://pipilikasoft.com/wp-content/uploads/2018/08/demo.jpg"}
                alt="Profile picture"
                className="w-[100px] h-[100px] rounded-full mx-auto"
              />
              <div className="mt-3">
                <h3 className="text-center text-[25px] font-semibold text-dark_ dark:text-white_">
                  {profileDetails?.name}
                </h3>

                <div className="flex items-center mx-auto gap-x-6 w-full justify-center mt-4">
                  <div className="w-[60px] h-[60px] rounded-full bg-primary_ flex justify-center items-center cursor-pointer">
                    <TbMessageDots title="start chat with the user" size={30} className="text-white" />
                  </div>

                  <div onClick={() => {
                    queryClient.invalidateQueries([`normalUserData${id}`]);
                    queryClient.invalidateQueries([`userPhotos${id}`]);
                    navigate(`/profile/${profileDetails._id}`)
                  }} className="w-[60px] h-[60px] rounded-full bg-normal_green flex justify-center items-center cursor-pointer">
                    <CgProfile title="go to profile" size={30} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[90%] mx-auto mt-7 flex flex-col overflow-x-hidden overflow-y-auto h-auto scrollHidden rounded-[5px] border-[1px] border-light_border_ dark:border-dark_border_">
              {testData.map((data: TestData, i: number) => {
                return (
                  <li
                    key={i}
                    className={`w-full mx-auto py-3 px-5 flex items-center justify-between ${i + 1 !== testData.length && "border-b-[1px]"
                      } border-light_border_ dark:border-dark_border_ transition-all duration-300 relative`}
                  >
                    <div className="relative">
                      <p className="font-semibold text-dark_gray_ dark:text-dark_text_ text-[15px]">
                        {data?.title}
                      </p>
                      <p
                        className={`font-semibold dark:text-white_ text-[18px] flex items-center text-dark_`}
                      >
                        {data?.value}
                      </p>
                    </div>

                    {
                      data?.icon
                    }
                  </li>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-light_bg_ dark:bg-dark_light_bg_">
            <p className="text-[18px] font-semibold text-dark_ dark:text-dark_text_">There is no details to show</p>
          </div>
        )
      }
    </>
  );
};

export default Content;
