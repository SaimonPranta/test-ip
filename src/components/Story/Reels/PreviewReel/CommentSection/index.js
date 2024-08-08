import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import user from "../../../../../assets/profile/Male.png";
import { RiSendPlane2Fill } from "react-icons/ri";
import axios from "axios";
import { BACKEND_URL } from "../../../../../shared/constants/Variables";
import { userHeader } from "../../../../../shared/functions/Token";
import {
  getCommentReactions,
  getReelComments,
  getReelReactions,
  getReels,
} from "../../../../../pages/Reels/Hooks";
import timeAgo from "../../../../../shared/functions/timeAgo";
import ReactBar from "../../../common/ReactBar";
import { react_comment } from "./../../../../../sockets/type";
import { useSelector } from "react-redux";
const Index = ({
  openCommentSection,
  setOpenCommentSection,
  index,
  description,
  reelId,
  setSingleCommentData,
  setDropdownItemActive,
  dropdownItemActive,
}) => {
  const [render, setRender] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const { reelComment } = getReelComments(reelId, render);
  const [commentData, setCommentData] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [caption, setCaption] = useState(description);
  const { reels } = getReels();
  const [updatedReel, setUpdatedReel] = useState(null);
  const [showReactionBar, setShowReactionBar] = useState(null);
  const [selectReaction, setSelectReaction] = useState({});
  const authUser = useSelector((state) => state?.auth?.user);
  const [completeReelReaction, setCompleteReelReaction] = useState(false);
  const { reelReaction } = getReelReactions(
    reelId,
    completeReelReaction,
    index,
    "comment"
  );

  const handlePostComment = (e, reelId) => {
    e.preventDefault();

    const data = {
      comment: e.target.comment.value,
      parentComment: selectedComment ? selectedComment : null,
    };

    const newComment = {
      _id: Math.random() * 10 + 10,
      comment: e.target.comment.value,
      parentComment: selectedComment ? selectedComment : null,
      reply: false,
      reelId: reelId,
      createdAt: new Date(),
    };

    setCommentData((prevState) => {
      return [...prevState, newComment];
    });

    if (e.target.comment.value !== "") {
      axios
        .post(`${BACKEND_URL}/profile/reel/reel-comment/${reelId}`, data, {
          headers: userHeader(),
        })
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            setRender(!render);
          }
        });
    }

    e.target.reset();
    setSelectedComment(null);
  };

  useEffect(() => {
  }, [reelComment]);

  useEffect(() => {
    setCommentData(reelComment?.data);
    setSingleCommentData((prevState) => {
      return {
        ...prevState,
        [reelId]: reelComment?.data,
      };
    });
  }, [reelComment, reelId]);

  useEffect(() => {
    renderComments(commentData);
  }, [commentData]);

  const handleEditReel = (e) => {
    e.preventDefault();
    const data = {
      description: caption,
    };

    axios
      .put(`${BACKEND_URL}/profile/reel/edit-reel/${reelId}`, data, {
        headers: userHeader(),
      })
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          const updatedReel = reels?.data?.myReels?.find(
            (reel) => reel._id === reelId
          );
          if (updatedReel) {
            setUpdatedReel({ ...updatedReel, description: caption });
          }

          setDropdownItemActive((prevState) => {
            return {
              ...prevState,
              edit: false,
            };
          });
        }
      })
      .catch((error) => {
      });
  };

  const onMouseEnter = (value) => {
    setShowReactionBar(value);
  };

  const onMouseLeave = (value) => {
    setShowReactionBar(value);
  };

  const handleAddReaction = (react, id) => {
    let data = {
      react: react,
      id: id,
    };

    const payloadData = {
      reaction: react,
    };
    axios
      .put(
        `${BACKEND_URL}/profile/reel/add-comment-reaction/${reelId}/${id}`,
        payloadData,
        {
          headers: userHeader(),
        }
      )
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          setCompleteReelReaction(!completeReelReaction);
          setShowReactionBar(null);
        }
      });

    setSelectReaction(data);
  };

  const handleDeleteReaction = (commentId) => {
    const userHasLiked = reelReaction?.data?.find(
      (reaction) =>
        reaction?.reelCommentId === commentId &&
        reaction?.user?._id === authUser?.id &&
        reaction?.reelId === reelId
    );

    if (userHasLiked) {
      axios
        .delete(
          `${BACKEND_URL}/profile/reel/delete-comment-reaction/${reelId}/${commentId}`,
          {
            headers: userHeader(),
          }
        )
        .then((response) => {
          setCompleteReelReaction(!completeReelReaction);
        });
    }
  };

  const renderComments = (comments, parentComment = null) => {
    return comments
      ?.filter((comment) => comment?.parentComment === parentComment)
      ?.map((comment) => {
        return (
          <div
            key={comment?._id}
            className={parentComment ? "reply" : "comment"}
          >
            <div className="wrapper">
              <div className="img">
                <img src={user} alt="" />
              </div>
              <div className="info">
                <div className="info-wrapper">
                  <p>{comment?.comment} </p>
                  {/* {reelReaction?.data?.filter(
                    (reaction) => reaction?.reelCommentId === comment?._id
                  )?.length > 0 && (
                    <div className="reaction-count">
                      {
                        reelReaction?.data?.filter(
                          (reaction) => reaction?.reelCommentId === comment?._id
                        )?.length
                      }
                    </div>
                  )} */}
                </div>

                {showReactionBar && (
                  <ReactBar
                    itemId={comment?._id}
                    showReactionBar={showReactionBar === comment?._id}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    handleAddReaction={handleAddReaction}
                  />
                )}
                <div className="reply-react">
                  <button
                    onMouseEnter={(e) => onMouseEnter(comment?._id)}
                    onMouseLeave={(e) => onMouseLeave(null)}
                    onClick={() => handleDeleteReaction(comment?._id)}
                    className={`${
                      reelReaction?.data?.find(
                        (reaction) =>
                          reaction?.reelCommentId === comment?._id &&
                          reaction?.user?._id === authUser?.id &&
                          reaction?.reelId === reelId
                      )?.reaction || ""
                    }`}
                  >
                    {reelReaction?.data?.find(
                      (reaction) =>
                        reaction?.reelCommentId === comment?._id &&
                        reaction?.user?._id === authUser?.id &&
                        reaction?.reelId === reelId
                    )?.reaction || "like"}
                    {reelReaction?.data?.filter(
                      (reaction) => reaction?.reelCommentId === comment?._id
                    )?.length > 0 && (
                      <div className="reaction-count">
                        (
                        {
                          reelReaction?.data?.filter(
                            (reaction) =>
                              reaction?.reelCommentId === comment?._id
                          )?.length
                        }
                        )
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      setSelectedComment((current) =>
                        current === comment?._id ? null : comment?._id
                      )
                    }
                    className={`reply ${
                      comment?._id === selectedComment ? "active" : ""
                    }`}
                  >
                    Reply
                  </button>
                  <p className="time">{timeAgo(comment?.createdAt)}</p>
                </div>
              </div>
            </div>
            {renderComments(comments, comment?._id)}
          </div>
        );
      });
  };

  return (
    <div className={`${openCommentSection ? "open" : ""} comment-caption`}>
      <div className="caption">
        {dropdownItemActive?.edit ? (
          <form action="#" className="edit-reel" onSubmit={handleEditReel}>
            <textarea
              name="caption"
              id="caption"
              cols="30"
              rows="3"
              placeholder="Add a caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <div className="btn-wrapper">
              <button
                onClick={() =>
                  setDropdownItemActive((prevState) => {
                    return {
                      ...prevState,
                      edit: false,
                    };
                  })
                }
                className="cancel"
                type="button"
              >
                Cancel
              </button>
              <button className="post" type="submit">
                Edit
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className={`${seeMore ? "expand" : ""}`}>
              {updatedReel ? updatedReel.description : description}
            </p>
            {description.length > 100 && (
              <button className="see-more" onClick={() => setSeeMore(!seeMore)}>
                {seeMore ? "See Less" : "See More"}
              </button>
            )}
          </>
        )}
      </div>
      <div className={` comment-section`}>
        <div className="contents">
          <div className="header">
            <div className="title">
              <h4>
                Comments{" "}
                <span className="comment-count">
                  ({reelComment?.data?.length && reelComment?.data?.length})
                </span>
              </h4>
            </div>
            <div
              className="close-btn-wrapper"
              onClick={() => setOpenCommentSection(false)}
            >
              <button className="close-btn">
                <FaChevronDown />
              </button>
            </div>
          </div>
          <div className="comments-area">{renderComments(commentData)}</div>
          <div className="comment-footer">
            <div className="input-wrapper">
              <form action="#" onSubmit={(e) => handlePostComment(e, reelId)}>
                <textarea
                  name="comment"
                  id="comment"
                  cols="30"
                  rows="1"
                  placeholder="Add a comment"
                ></textarea>
                <button type="submit">
                  <RiSendPlane2Fill />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
