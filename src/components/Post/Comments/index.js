import React, { useState, useEffect } from "react";
import {
  MoreVert,
  ThumbUpAlt,
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  ThumbDownAlt,
  Reply,
} from "@material-ui/icons";
import {
  IconButton,
  Menu,
  MenuItem,
  Badge,
  withStyles,
  createStyles,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import {
  getReplies,
  reactComment,
  deleteComment,
  editComment,
  getComments,
} from "../../../sockets/emit";
import { getUrl, getUserAvatar } from "../../../shared/functions";
import Reactions from "../../Layout/Onlinebar/Reactions";
import { CommentButtonWrapper, TimeAgo } from "../style";
import { Verified } from "../../Tools";
import { EditPost } from "../Dialogs";
import CommentInput from "./Input";
import When from "../../When";
import Replys from "./Reply";
import "./style.scss";

const StyledBadge = withStyles(() =>
  createStyles({
    badge: {
      right: -7,
      top: 7,
      boxShadow: "2px 0 5px #000",
      padding: 1,
      backgroundColor: "#ffe6c4",
      color: "#000",
      fontSize: 10,
    },
  })
)(Badge);

const Comments = ({
  loggedInUsername,
  isMe,
  id,
  contents,
  user,
  date,
  replies,
  postId,
  likes,
  dislikes,
  liked,
  disliked,
  media,
  emoji,
  totalReplies = 0,
}) => {
  const [active, setActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(false);
  const [offset, setOffset] = useState(-1);
  function onEdit() {
    setEdit(true);
    setAnchorEl(null);
  }
  function onDelete() {
    deleteComment(postId, id);
    setAnchorEl(null);
  }
  function onSave(val) {
    editComment(postId, id, val);
    setEdit(false);
  }
  useEffect(() => {
    if (totalReplies > 0) {
      getReplies(postId, id, offset);
    }
  }, [offset]);

  return (
    <>
      <div className="Comments fadeIn">
        <div className="profileBox">
          <img
            className="avatar"
            src={getUserAvatar(user.avatar, user.gender, user.username)}
            alt=""
          />
        </div>

        <div className="commentBox">
          <div className="commentWrapper">
            <div
              style={{ minWidth: "200px", maxWidth: "41vw" }}
              className=" comment">
              <Link className="user" to={`/${user.username}`}>
                <Verified name={user.name} verified={user.verified} />
              </Link>
              &nbsp;
              {!emoji ? (
                <>
                  {contents[contents?.length - 1]}
                  <p>
                    {!!media && (
                      <img
                        className="p"
                        alt=""
                        src={getUrl(media, user.username)}
                      />
                    )}
                  </p>
                </>
              ) : (
                <p>
                  <img
                    className="e"
                    alt=""
                    src={Reactions.find((r) => r.name === emoji).icon}
                  />
                </p>
              )}
              {/* <div className=" likesCountSpan"> */}
              {/* {likes ? ( */}
              {/* <span className="span">
                  {" "}
                  {likes}{" "}
                  <ThumbUpAltOutlined
                    style={{
                      color: "#214abd",
                      paddingLeft: "3px",
                      fontSize: "16",
                    }}
                  />
                </span> */}
              {/* ) : (
                  ""
                )} */}
              {/* {disliked ? ( */}
              {/* <span className="span">
                  {" "}
                  <ThumbDownAltOutlined
                    style={{
                      color: "#214abd",
                      paddingRight: "3px",
                      fontSize: "16",
                    }}
                  />
                  {dislikes}
                </span> */}
              {/* ) : (
                  ""
                )} */}
              {/* </div> */}
            </div>
          </div>
          <CommentButtonWrapper>
            <span className="comment_reaction">
              <IconButton
                onClick={() => reactComment(postId, id, liked ? null : "like")}>
                <StyledBadge>
                  {liked ? (
                    <ThumbUpAlt color="primary" />
                  ) : (
                    <ThumbUpAltOutlined />
                  )}
                </StyledBadge>
              </IconButton>
              <span className="comment_react">{likes}</span>
            </span>

            <span className="comment_reaction">
              <IconButton
                onClick={() =>
                  reactComment(postId, id, disliked ? null : "dislike")
                }>
                <StyledBadge>
                  {disliked ? (
                    <ThumbDownAlt color="primary" />
                  ) : (
                    <ThumbDownAltOutlined />
                  )}
                </StyledBadge>
              </IconButton>
              <span className="comment_react">{dislikes}</span>
            </span>
            <span className="reply_icon">
              <IconButton onClick={() => setActive(!active)}>
                <Reply />
              </IconButton>
              <span className="comment_react">&nbsp;</span>
            </span>
            <span className="comment_time">
              <TimeAgo>
                <When date={date} />
              </TimeAgo>
            </span>
          </CommentButtonWrapper>

          {/* comment replay  */}

          {replies?.map((reply) => (
            <Replys
              loggedInUsername={loggedInUsername}
              isMe={isMe}
              key={reply.id}
              {...reply}
              postId={postId}
              commentId={id}
            />
          ))}

          {/* //working on replay comment  */}

          {active && (
            <CommentInput postId={postId} commentId={id} type="reply" />
          )}
        </div>

        {/* need to do  work  */}

        {isMe() ? (
          <div>
            {contents.length > 1 && <small className="edited">Edited</small>}
            <IconButton
              size="small"
              aria-haspopup="true"
              onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={!!anchorEl}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: "20ch",
                },
              }}>
              {user.username == loggedInUsername && (
                <MenuItem onClick={onEdit}>Edit</MenuItem>
              )}

              <MenuItem onClick={onDelete}>Delete</MenuItem>
            </Menu>
            <EditPost
              open={edit}
              close={() => setEdit(false)}
              content={contents[contents?.length - 1]}
              onSave={onSave}
            />
          </div>
        ) : (
          <>
            {
              //here commented user is user.username
              user.username == loggedInUsername && (
                <div>
                  {contents.length > 1 && (
                    <small className="edited">Edited</small>
                  )}
                  <IconButton
                    size="small"
                    aria-haspopup="true"
                    onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={!!anchorEl}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                        width: "20ch",
                      },
                    }}>
                    <MenuItem onClick={onEdit}>Edit</MenuItem>
                    <MenuItem onClick={onDelete}>Delete</MenuItem>
                  </Menu>
                  <EditPost
                    open={edit}
                    close={() => setEdit(false)}
                    content={contents[contents?.length - 1]}
                    onSave={onSave}
                  />
                </div>
              )
            }
          </>
        )}
      </div>

      {replies.length < totalReplies && (
        <Button
          style={{
            textTransform: "inherit",
            fontSize: "14px",
          }}
          onClick={() => setOffset(replies.length)}
          variant="text"
          color="primary">
          Get more replies..
        </Button>
      )}
    </>
  );
};

export default ({
  loggedInUsername,
  comments,
  postId,
  isMe,
  totalComments,
}) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (totalComments > 0) {
      getComments(postId, offset);
    }
  }, [offset]);
  return (
    <div>
      {comments?.map((comment) => (
        <Comments
          loggedInUsername={loggedInUsername}
          key={comment.id}
          {...comment}
          postId={postId}
          isMe={isMe}
        />
      ))}
      {comments.length < totalComments && (
        <Button
          style={{
            textTransform: "inherit",
            fontSize: "14px",
          }}
          onClick={() => setOffset(comments.length)}
          variant="text"
          color="primary">
          Get more comments..
        </Button>
      )}
      <CommentInput postId={postId} type="comment" />
    </div>
  );
};
