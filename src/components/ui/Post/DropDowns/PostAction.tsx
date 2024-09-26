import Dropdown from "@src/components/ui/Dropdown";
import React, { ReactNode, useEffect, useRef } from "react";
import Confirmation from "../Popups/Confirmation";
import AddPost from "../../SideBar/Popups/AddPost";
import { updatePostInStore } from "@src/store/actions/post";
import { AppDispatch } from "@src/store/store";
import { useDispatch } from "react-redux";
import { getSocket } from "@src/utils/socket";
import { updateFeedInStore } from "@src/store/actions/feeds";

interface PostActionProps {
  openButton: ReactNode;
  postId: string;
  postIndex: number;
  data?: any;
  status?: string;
}

interface Items {
  key: string;
  label: string | ReactNode;
}


// post action
const PostAction: React.FC<PostActionProps> = ({ openButton, postId, postIndex, data, status }) => {

  const deletePopupRef = useRef<HTMLElement | null>();
  const editPopupRef = useRef<any>();

  // dispatch
  const dispatch: AppDispatch = useDispatch();

  const items: Items[] = [
    {
      key: "editPost",
      label: (
        <div onClick={(e) => {
          e.stopPropagation();
          editPopupRef.current?.click();
        }} className="w-full h-full">
          Edit Post
        </div>
      ),
    },
    {
      key: "delete",
      label: (
        <p onClick={(e) => {
          e.stopPropagation();
          deletePopupRef.current?.click();
        }}>
          Delete Post
        </p>
      ),
    }
  ];


  useEffect(() => {
    const socket = getSocket();

    socket.on("postUpdated", (data: any) => {
      const newData: any = JSON.parse(data);
      if (newData) {
        if (status === 'feeds') {
          dispatch(updateFeedInStore({ postId: newData?._id, data: newData }))
        } else {
          dispatch(updatePostInStore({ postId: newData?._id, data: newData }))
        }
      }
    })

    return () => {
      socket.off('chat message');
    };
  }, [dispatch, postIndex])

  return (
    <div>
      <Dropdown size="md" items={items}>{openButton}</Dropdown>
      <Confirmation postId={postId} deletePopupRef={deletePopupRef} postIndex={postIndex} />
      <AddPost edit={true} data={data}>
        <p ref={editPopupRef} className="hidden"></p>
      </AddPost>
    </div>
  );
};

export default PostAction;
