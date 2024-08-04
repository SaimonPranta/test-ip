import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { BACKEND_URL } from "../../../../../shared/constants/Variables";
import { userHeader } from "../../../../../shared/functions/Token";
import { set } from "date-fns";
import { getReelReactions } from "../../../../../pages/Reels/Hooks";
import { useSelector } from "react-redux";
import { reactionData } from "../../../../../pages/Reels/AddReels/utils/reactionData";

const Index = ({
  openCommentSection,
  setOpenCommentSection,
  reelId,
  index,
  singleCommentData,
  setSingleCommentData,
}) => {
  const [reaction, setReaction] = useState(false);
  const [showReactionBar, setShowReactionBar] = useState(false);
  const [completeReelReaction, setCompleteReelReaction] = useState(false);
  const { reelReaction } = getReelReactions(
    reelId,
    completeReelReaction,
    index,
    "reel"
  );
  const authUser = useSelector((state) => state?.auth?.user);
  const handleRemoveReaction = (reelId) => {
    const userHasLiked = reelReaction?.data?.find(
      (reaction) => reaction?.user?._id === authUser?.id
    );
    if (userHasLiked) {
      // User has already liked, so we send a DELETE request
      axios
        .delete(`${BACKEND_URL}/profile/reel/delete-reel-reaction/${reelId}`, {
          headers: userHeader(),
        })
        .then((response) => {
          setCompleteReelReaction(!completeReelReaction);
        });
    }
  };

  const handleAddReaction = (react) => {
    const userHasLiked = reelReaction?.data?.find(
      (reaction) => reaction?.user?._id === authUser?.id
    );
    let data = {
      reaction: react,
    };
    axios
      .put(`${BACKEND_URL}/profile/reel/add-reel-reaction/${reelId}`, data, {
        headers: userHeader(),
      })
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          setCompleteReelReaction(!completeReelReaction);
          setShowReactionBar(false);
        }
      });
  };

  return (
    <div className="reel-interaction">
      <ul className="">
        <li>
          <div
            className={`reactions ${showReactionBar ? "open" : ""}`}
            onMouseEnter={() => setShowReactionBar(true)}
            onMouseLeave={() => setShowReactionBar(false)}
          >
            {reactionData?.map((react, index) => {
              return (
                <div className="reaction" key={index}>
                  <img
                    src={react?.icon}
                    alt=""
                    onClick={() => handleAddReaction(react?.name)}
                  />
                </div>
              );
            })}
          </div>
          <div
            className="icon-bg"
            onClick={() => handleRemoveReaction(reelId)}
            onMouseEnter={() => setShowReactionBar(true)}
            onMouseLeave={() => setShowReactionBar(false)}
          >
            {reelReaction?.data?.length > 0 ? (
              <>
                {reelReaction?.data?.map((reaction) => {
                  if (
                    reaction?.reaction === "like" &&
                    reaction?.user?._id === authUser?.id
                  ) {
                    return <img src={reactionData[0]?.icon} alt="" />;
                  }
                  if (
                    reaction?.reaction === "haha" &&
                    reaction?.user?._id === authUser?.id
                  ) {
                    return <img src={reactionData[1]?.icon} alt="" />;
                  }
                  if (
                    reaction?.reaction === "love" &&
                    reaction?.user?._id === authUser?.id
                  ) {
                    return <img src={reactionData[2]?.icon} alt="" />;
                  }
                  if (
                    reaction?.reaction === "sad" &&
                    reaction?.user?._id === authUser?.id
                  ) {
                    return <img src={reactionData[3]?.icon} alt="" />;
                  }
                  if (
                    reaction?.reaction === "wow" &&
                    reaction?.user?._id === authUser?.id
                  ) {
                    return <img src={reactionData[4]?.icon} alt="" />;
                  }
                  if (
                    reaction?.reaction === "angry" &&
                    reaction?.user?._id === authUser?.id
                  ) {
                    return <img src={reactionData[5]?.icon} alt="" />;
                  } else {
                    return <AiFillLike className={`icon`} />;
                  }
                })}
              </>
            ) : (
              <AiFillLike className={`icon`} />
            )}
          </div>
          <span className="text-color">
            {reelReaction?.data?.find(
              (reaction) => reaction?.reelId === reelId
            ) && reelReaction?.count
              ? reelReaction?.count
              : 0}
          </span>
        </li>
        <li onClick={() => setOpenCommentSection(!openCommentSection)}>
          <div className="icon-bg">
            <FaComment
              className={`${openCommentSection ? "active" : ""} icon`}
            />
          </div>
          <span className="text-color">
            {singleCommentData[reelId]?.length}
          </span>
        </li>
        <li>
          <div className="icon-bg">
            <IoIosShareAlt className="icon" />
          </div>
          <span className="text-color">0</span>
        </li>
      </ul>
    </div>
  );
};

export default Index;
