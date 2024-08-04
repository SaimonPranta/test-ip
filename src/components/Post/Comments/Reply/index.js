import React, { useState } from "react";
import {
  MoreVert,
  ThumbUpAlt,
  ThumbUpAltOutlined,
  ThumbDownAlt,
  ThumbDownAltOutlined,
} from "@material-ui/icons";
import {
  IconButton,
  Menu,
  MenuItem,
  withStyles,
  createStyles,
  Badge,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { reactReply, deleteReply, editReply } from "../../../../sockets/emit";
import { Replies, CommentButtonWrapper, TimeAgo } from "../../style";
import { getUserAvatar, getUrl } from "../../../../shared/functions";
import Reactions from "../../../Layout/Onlinebar/Reactions";
import { Verified } from "../../../Tools";
import { EditPost } from "../../Dialogs";
import { When } from "../../..";
import "../style.scss";

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

export default ({
  loggedInUsername,
  isMe,
  postId,
  commentId,
  id,
  user,
  contents,
  date,
  likes,
  dislikes,
  liked,
  disliked,
  media,
  emoji,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(false);
  function onEdit() {
    setEdit(true);
    setAnchorEl(null);
  }
  function onDelete() {
    deleteReply(postId, commentId, id);
    setAnchorEl(null);
  }
  function onSave(val) {
    editReply(postId, commentId, id, val);
    setEdit(false);
  }


  return (
    <Replies>
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
            className="comment"
            style={{ minWidth: "200px", maxWidth: "41vw" }}
          >
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
            {/* <p>{contents.length}</p> */}
            {/* <span className="span">
                {" "}
                {likes}{" "}
                <ThumbUpAltOutlined
                  style={{
                    paddingLeft: "4px",
                    color: "#214abd",
                    fontSize: "16",
                  }}
                />
              </span> */}
            {/* ) : (
                  ""
                )} */}
            {/* {disliked ? ( */}
            {/* <span className="span">
                <ThumbDownAltOutlined
                  style={{
                    paddingRight: "4px",
                    color: "#214abd",
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
              onClick={() =>
                reactReply(postId, commentId, id, liked ? null : "like")
              }
            >
              <StyledBadge>
                {liked ? <ThumbUpAlt color="primary" /> : <ThumbUpAltOutlined />}
              </StyledBadge>
            </IconButton>
            <span className="comment_react">{likes}</span>
          </span>
          <span className="comment_reaction">
            <IconButton
              onClick={() =>
                reactReply(postId, commentId, id, disliked ? null : "dislike")
              }
            >
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

          <span className="comment_time">
            <TimeAgo>
              <When date={date} />
            </TimeAgo>
          </span>
        </CommentButtonWrapper>
      </div>



      {isMe() ? (
        <div>
          {contents.length > 1 && <small className="edited">Edited</small>}
          <IconButton
            size="small"
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
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
              }
            }}
          >

            {
              (user.username == loggedInUsername) && (

                <MenuItem onClick={onEdit}>Edit</MenuItem>
              )
            }
            <MenuItem onClick={onDelete}>Delete</MenuItem>
          </Menu>
          <EditPost
            open={edit}
            close={() => setEdit(false)}
            content={contents[contents?.length - 1]}
            onSave={onSave}
          />
        </div>
      ) :
        (
          <>
            {
              (user.username == loggedInUsername) && (

                <div>
                  {contents.length > 1 && <small className="edited">Edited</small>}
                  <IconButton
                    size="small"
                    aria-haspopup="true"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
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
                      }
                    }}
                  >
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
        )
      }
    </Replies>
  );
};
