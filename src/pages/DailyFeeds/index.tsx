import React, { useEffect, useState } from "react";
import Contacts from "./Content/Contacts";
import Post from "@src/components/ui/Post";
import Suggestions from "./Content/Suggestions";
import AvatarSingle from "@src/components/shared/Avatar";
import AddPost from "@src/components/ui/SideBar/Popups/AddPost";
import { Location, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getUserFeedsAPI } from "@src/apis/post";
import Spinner from "@src/components/shared/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store/store";
import { setFeeds } from "@src/store/actions/feeds";

interface DailyFeedsProps { }

const DailyFeeds: React.FC<DailyFeedsProps> = () => {
  // location
  const location: Location = useLocation();

  // home page view
  const [view, setView] = useState<
    "all" | "contact&suggestion" | "contact" | "suggestion"
  >("all");

  useEffect(() => {
    if (location.search === "?suggestionAndContact") {
      setView("contact&suggestion");
    } else if (location.search === "?Contact") {
      setView("contact");
    } else if (location.search === "?Suggestions") {
      setView("suggestion");
    } else {
      setView("all");
    }
  }, [location.search]);

  // posts
  const posts = useSelector((state: RootState) => state.feeds.feeds);

  // dispatch
  const dispatch = useDispatch();

  // states
  const [page, setPage] = useState<number>(1);
  const sortBy = 'updatedAt';
  const sortType = 'dsc';
  const limit = 30;
  const search = '';

  const { data, isLoading }: { data: any, isLoading: boolean } = useQuery({
    queryFn: () => getUserFeedsAPI({
      page,
      sortBy,
      sortType,
      limit,
      search
    }),
    queryKey: [`feeds${search}${page}${limit}`],
    staleTime: Infinity
  });

  useEffect(() => {
    if (data?.data?.length) {
      console.log('data?.data', data?.data);
      dispatch(setFeeds(data?.data));
    }
  }, [data?.data])


  return (
    <div className="w-full h-[100vh] overflow-hidden bg-light_bg_ dark:bg-dark_light_bg_ flex justify-end">
      {view === "all" && (
        <div className="w-[98%] md:w-[92%] xl:w-[85%] lg:mx-0 mx-auto xl:mx-auto h-[100vh] flex items-start">
          <div className="w-[23%] lg:block hidden">
            <Contacts />
          </div>

          <div className="w-full md:w-[58%] lg:w-[48%] mx-[1%] overflow-y-auto h-[100%]">
            {/* create post */}
            <AddPost>
              <div className="my-[20px] w-full bg-white_ dark:bg-dark_bg_ p-[15px] rounded-[10px] cursor-pointer">
                <p className="text-[20px] font-semibold dark:text-white_">
                  Create Posts
                </p>

                <div className="flex items-center mt-[5px] gap-x-[15px]">
                  <AvatarSingle
                    src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                    alt="Profile Picture"
                  />
                  <p className="dark:text-dark_text_ text-dark_gray_">
                    Write Something here...
                  </p>
                </div>
              </div>
            </AddPost>

            {
              isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                  <Spinner loaderStatus={"elementLoader"} />
                </div>
              ) : (
                posts.length ? (
                  posts.map((data: any, i: number) => (
                    <div key={i}>
                      <Post postIndex={i} data={data} status="feeds" />
                    </div>
                  ))
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <p className="text-dark_ dark:text-dark_text_ text-[20px] font-semibold">
                      No feeds to show. Please make friend to see user feeds.
                    </p>
                  </div>
                )
              )
            }
          </div>

          <div className="h-[99%] md:block hidden w-[40%] lg:w-[23%] overflow-hidden">
            <Suggestions />
          </div>
        </div>
      )}

      {view === "contact&suggestion" && (
        <div className="w-[95%] md:w-[92%] xl:w-[85%] lg:mx-0 mx-auto xl:mx-auto h-[100vh] flex items-start justify-between">
          <div className="w-[48%] md:w-[80%] md:mx-auto mx-0">
            <Contacts />
          </div>
          <div className="w-[48%] block md:hidden ">
            <Suggestions />
          </div>
        </div>
      )}

      {view === "contact" && (
        <div className="w-[95%] md:w-[92%] xl:w-[85%] lg:mx-0 mx-auto xl:mx-auto h-[100vh] flex items-start justify-between">
          <div className="w-full">
            <Contacts />
          </div>
        </div>
      )}

      {view === "suggestion" && (
        <div className="w-[95%] md:w-[92%] xl:w-[85%] lg:mx-0 mx-auto xl:mx-auto h-[100vh] flex items-start justify-between">
          <div className="w-full">
            <Suggestions />
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyFeeds;
