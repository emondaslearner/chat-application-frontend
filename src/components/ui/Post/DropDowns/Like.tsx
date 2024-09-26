import React, { ReactNode, useEffect, useState } from "react";
import {
  Dropdown as DropDowns,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { AiFillLike } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

// images
import likeEmoji from "@assets/Emoji/like-emoji.gif";
import loveEmoji from "@assets/Emoji/love-emoji.gif";
import careEmoji from "@assets/Emoji/care-emoji.gif";
import hahaEmoji from "@assets/Emoji/haha-emoji.gif";
import angryEmoji from "@assets/Emoji/angry-emoji.gif";
import sadEmoji from "@assets/Emoji/sad-emoji.gif";
import wowEmoji from "@assets/Emoji/wow-emoji.gif";

import care from "@assets/Emoji/care.png";
import wow from "@assets/Emoji/wow.png";
import angry from "@assets/Emoji/angry.png";
import sad from "@assets/Emoji/sad.png";
import haha from "@assets/Emoji/haha.png";
import { useMutation } from "react-query";
import { error } from "@src/utils/alert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import { addReactionToPostAPI } from "@src/apis/post";
import { addReactionToCommentAPI } from "@src/apis/comment";
import { decreaseReactionCount, increaseReactionCount, setGivenReaction } from "@src/store/actions/post";
import { decreaseFeedsReactionCount, increaseFeedsReactionCount, setFeedGivenReaction } from "@src/store/actions/feeds";
import { useLocation } from "react-router-dom";

interface LikeProps {
  setActiveReaction?: (e: string) => void;
  postId?: string;
  data?: any;
  commentId?: string;
  index: number;
  status?: string;
}

interface Items {
  key: string;
  label: string | ReactNode;
}

const items: Items[] = [
  {
    key: "Like",
    label: (
      <img
        src={likeEmoji}
        alt="like"
        className="w-[40px] h-[40px] transition-all duration-300"
      />
    ),
  },
  {
    key: "Love",
    label: (
      <img
        src={loveEmoji}
        alt="love"
        className="w-[40px] h-[40px] hover:scale-125"
      />
    ),
  },
  {
    key: "Care",
    label: <img src={careEmoji} alt="care" className="w-[40px] h-[40px]" />,
  },
  {
    key: "Haha",
    label: <img src={hahaEmoji} alt="haha" className="w-[40px] h-[40px]" />,
  },
  {
    key: "Angry",
    label: <img src={angryEmoji} alt="angry" className="w-[40px] h-[40px]" />,
  },
  {
    key: "Sad",
    label: <img src={sadEmoji} alt="sad" className="w-[45px] h-[45px]" />,
  },
  {
    key: "Wow",
    label: <img src={wowEmoji} alt="Wow" className="w-[45px] h-[45px]" />,
  },
];

const Like: React.FC<LikeProps> = ({
  setActiveReaction,
  postId,
  data,
  commentId,
  index,
  status
}) => {
  const location = useLocation();

  // profile data
  const profileData = useSelector((state: RootState) => state.auth);

  const [isOpen, setOpen] = useState<boolean>(false);

  const reactionState: string | undefined = useSelector((state: RootState) => status === 'feeds' ? state.feeds.feeds[index]?.reactions.find((data: any) => data.given_by === profileData.id)?.reaction : state.posts.posts[index]?.reactions.find((data: any) => data.given_by === profileData.id)?.reaction)

  const [givenReaction, setReaction] = useState<string>("");

  useEffect(() => {
    const formattedReactionState = reactionState ? reactionState.charAt(0).toUpperCase() + reactionState.slice(1) : "";
    setReaction(formattedReactionState || "");
  }, [reactionState, location]);

  const [apiCallStatus, setApiCallStatus] = useState(false);

  const [reactionIncrementStatus, setReactionIncrementStatus] = useState<boolean | null>(null);

  // prv state of given reaction
  const [prvState, setPrvState] = useState<string>("");

  // theme color
  const themeColor = useSelector((state: RootState) => state.themeConfig.mode);

  // dispatch
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (setActiveReaction !== undefined) {
      setActiveReaction(givenReaction);
    }
  }, [givenReaction]);

  const addReaction = async () => {
    try {
      if (postId) {
        await addReactionToPostAPI({
          reaction: givenReaction
            ? givenReaction.toLowerCase()
            : prvState.toLowerCase(),
          postId,
        });
      }

      if (commentId) {
        await addReactionToCommentAPI({
          reaction: givenReaction
            ? givenReaction.toLowerCase()
            : prvState.toLowerCase(),
          commentId,
        });
      }
    } catch (err) {
      error({ message: "Unable to reaction on post. try later", themeColor });
      if (status !== 'feeds') {
        postId && dispatch(setGivenReaction({ index, reaction: "", userId: profileData?.id }));
      } else {
        postId && dispatch(setFeedGivenReaction({ index, reaction: "", userId: profileData?.id }));
      }
      throw err;
    }
  };

  // reaction mutation
  const { mutate } = useMutation({
    mutationFn: addReaction,
    mutationKey: ["addReaction"],
    onSuccess: (_data: any) => {
      setPrvState("");
    },
  });

  useEffect(() => {
    if (givenReaction && apiCallStatus) {
      setReactionIncrementStatus(true);
      mutate();
    }
    if (!givenReaction) {
      setReactionIncrementStatus(false);
      if (prvState) {
        mutate();
      }
    }
  }, [givenReaction]);

  // check given reaction or not

  useEffect(() => {
    if (data?.reactions?.length > 0) {
      const findReaction = data.reactions.find(
        (data: any) => data.given_by === profileData.id
      );

      if (findReaction) {
        const reactionToCap =
          findReaction.reaction.charAt(0).toUpperCase() +
          findReaction.reaction.slice(1);

        if (status !== 'feeds') {
          postId && dispatch(setGivenReaction({ index, reaction: reactionToCap, userId: profileData?.id }));
        } else {
          postId && dispatch(setFeedGivenReaction({ index, reaction: reactionToCap, userId: profileData?.id }));
        }
        setReactionIncrementStatus(true);
      }
    }
  }, [profileData.id]);

  useEffect(() => {
    if (reactionIncrementStatus && apiCallStatus && postId) {
      if (status !== 'feeds') {
        dispatch(increaseReactionCount(postId));
      } else {
        dispatch(increaseFeedsReactionCount(postId));
      }
    }
    if (reactionIncrementStatus === false && apiCallStatus && postId) {
      if (status !== 'feeds') {
        dispatch(decreaseReactionCount(postId));
      } else {
        dispatch(decreaseFeedsReactionCount(postId));
      }
    }
  }, [reactionIncrementStatus]);


  return (
    <DropDowns size="sm" isOpen={isOpen} onOpenChange={(open) => setOpen(open)}>
      <DropdownTrigger>
        {/* post reactions  */}
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => {
            setOpen(!isOpen);
            if (status !== 'feeds') {
              postId && dispatch(setGivenReaction({ index, reaction: givenReaction === "" ? "Like" : "", userId: profileData?.id }));
            } else {
              postId && dispatch(setFeedGivenReaction({ index, reaction: givenReaction === "" ? "Like" : "", userId: profileData?.id }));
            }
            if (givenReaction) {
              setPrvState(givenReaction);
            }
            setApiCallStatus(true);
          }}
        >
          {givenReaction === "" && (
            <>
              <AiFillLike
                className="text-dark_ dark:text-dark_text_"
                size={30}
              />
              <p className="text-dark_ dark:text-dark_text_ font-semibold text-[18px]">
                Like
              </p>
            </>
          )}

          {givenReaction === "Like" && (
            <>
              <AiFillLike className="text-blue-500" size={30} />
              <p className="text-blue-500 font-semibold text-[18px]">Like</p>
            </>
          )}

          {givenReaction === "Love" && (
            <>
              <FcLike className="" size={30} />
              <p className="text-[#F44336] font-semibold text-[18px]">Love</p>
            </>
          )}

          {givenReaction === "Care" && (
            <>
              <img src={care} alt="care" className="w-[30px] h-[30px]" />
              <p className="text-[#FFCE00] font-semibold text-[18px]">Care</p>
            </>
          )}

          {givenReaction === "Sad" && (
            <>
              <img src={sad} alt="Sad" className="w-[20px] h-[20px]" />
              <p className="text-[#FFCE00] font-semibold text-[18px]">Sad</p>
            </>
          )}

          {givenReaction === "Wow" && (
            <>
              <img src={wow} alt="Wow" className="w-[30px] h-[30px]" />
              <p className="text-[#FFCE00] font-semibold text-[18px]">Wow</p>
            </>
          )}

          {givenReaction === "Haha" && (
            <>
              <img src={haha} alt="Haha" className="w-[20px] h-[20px]" />
              <p className="text-[#FFCE00] font-semibold text-[18px]">Haha</p>
            </>
          )}
          {givenReaction === "Angry" && (
            <>
              <img src={angry} alt="Angry" className="w-[30px] h-[30px]" />
              <p className="text-[#FF721A] font-semibold text-[18px]">
                Angry
              </p>
            </>
          )}
        </div>

      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        className="colorDropdown"
        items={items}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {(item: Items) => (
          <DropdownItem
            key={item.key}
            color={"default"}
            className={`!hover:bg-transparent !p-0 !w-auto !rounded-full`}
            onClick={() => {
              if (givenReaction) {
                setPrvState(givenReaction);
              }
              if (status !== 'feeds') {
                postId && dispatch(setGivenReaction({ index, reaction: item.key === givenReaction ? "" : item.key, userId: profileData?.id }));
              } else {
                postId && dispatch(setFeedGivenReaction({ index, reaction: item.key === givenReaction ? "" : item.key, userId: profileData?.id }));
              }
              setApiCallStatus(true);
            }}
          >
            <div className="transition-all duration-300 transform hover:scale-125 relative group">
              {item.label}
              <div
                className={`hidden group-hover:!block bg-dark_ px-3 py-1 dark:bg-dark_light_bg_ absolute bottom-[130%] left-[-10%] rounded-[10px]`}
              >
                <p className="text-[16px] text-white_">{item.key}</p>
              </div>
            </div>
          </DropdownItem>
        )}
      </DropdownMenu>
    </DropDowns>
  );
};

export default Like;
