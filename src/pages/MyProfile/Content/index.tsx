import React, { useEffect, useState } from "react";
import Post from "@components/ui/Post";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { useQuery } from "react-query";
import { getPostsAPI } from "@src/apis/post";
import Spinner from "@src/components/shared/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import { addPostToState, setPosts } from "@src/store/actions/post";
import { getSocket } from "@src/utils/socket";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { queryClient } from "@src/App";

interface ContentProps {
  setStatus?: (value: "sidebar" | "content") => void;
}

interface PostsQueryStates {
  data: any;
  isLoading: boolean;
}

const Content: React.FC<ContentProps> = ({ setStatus }) => {
  const [page, setPage] = useState(1);
  const limit = 15;
  const sortBy = "createdAt";
  const sortType = "dsc";

  // dispatch
  const dispatch: AppDispatch = useDispatch();

  // navigation
  const navigate: NavigateFunction = useNavigate();

  // get params id
  const { id } = useParams();

  // profile data
  const profileData = useSelector((state: RootState) => state.auth)

  // check id and profile data 
  useEffect(() => {
    if (id === profileData.id) {
      navigate('/profile')
    } else {
      queryClient.invalidateQueries([`personalPostData${id || profileData.id}`]);
    }
  }, [id, profileData, navigate])

  const posts = useSelector((state: RootState) => state.posts.posts)

  const { data, isLoading }: PostsQueryStates = useQuery({
    queryFn: () => getPostsAPI({ page, limit, sortBy, sortType, search: "", id }),
    queryKey: [`personalPostData${id || profileData.id}`],
    staleTime: Infinity
  });

  useEffect(() => {
    dispatch(setPosts([]))
    if (data?.data?.length) {
      dispatch(setPosts(data?.data));
    }
  }, [data, dispatch])

  // socket connection
  useEffect(() => {
    const socket = getSocket();

    socket.on("postAdded", (data: any) => {
      const newData: any = JSON.parse(data);
      if (newData) {
        dispatch(addPostToState(newData))
      }
    })

    return () => {
      socket.off('chat message');
    };
  }, [dispatch])

  return (
    <div className="w-full h-[100vh] overflow-hidden bg-light_bg_ dark:bg-dark_light_bg_">
      <div
        onClick={() => setStatus && setStatus("sidebar")}
        title="Back to profile"
        className="lg:hidden flex items-center mt-[10px] justify-between w-[95%] mx-auto"
      >
        <MdOutlineArrowCircleLeft size={25} />
      </div>

      <div className="w-[95%] sm:w-[80%] lg:w-[60%] mx-auto h-[100vh]">
        {/* all post */}
        <div
          className={`w-full mt-3 gap-y-3 flex flex-col h-full overflow-y-auto pb-[100px]`}
        >
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner loaderStatus={"elementLoader"} />
            </div>
          ) : (
            posts.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-dark_ dark:text-dark_text_ text-[20px] font-semibold">
                  No posts to show
                </p>
              </div>
            ) : (
              posts.map((data: any, i: number) => (
                <div key={i}>
                  <Post postIndex={i} data={data} />
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
