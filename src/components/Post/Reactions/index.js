import React, { useState } from "react";
import { Menu } from "@material-ui/core";
import {
  AngryIcon,
  HahaIcon,
  LikeIcon,
  LoveIcon,
  SadIcon,
  WowIcon,
} from "../../../assets/reactions";
import {
  AngryGif,
  HahaGif,
  LikeGif,
  LoveGif,
  SadGif,
  WowGif,
} from "../../../assets/reactions/gif";

import { reactPost, unreactPost } from "../../../sockets/emit";
import Payment from "./Payment";
import "./style.scss";
import Share from "../Share";
import { RiShareForwardLine } from "react-icons/ri";
import { CommentIcon, ShareIcon, BoostIcon } from "../../../assets/reactions";
import { makeStyles } from "@material-ui/core/styles";
// import axios from "axios";
// import { HoverOver } from "../../Tools";
// import { FaRegEdit } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

export default ({
  postId,
  reacts,
  myreact,
  comments,
  shares,
  boosts,
  setActive,
  active,
  username,
  setPromotion,
  promotion,
  setLocation,
  isMe,
  handleShow,
  promoteStatus,
  promoteCount
}) => {
  const [boostModal, setBoostModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const reactions = [
    { id: "like", icon: LikeIcon, gif: LikeGif },
    { id: "love", icon: LoveIcon, gif: LoveGif },
    { id: "wow", icon: WowIcon, gif: WowGif },
    { id: "sad", icon: SadIcon, gif: SadGif },
    { id: "haha", icon: HahaIcon, gif: HahaGif },
    { id: "angry", icon: AngryIcon, gif: AngryGif },
  ];

  function onReaction(id) {
    reactPost(postId, id);

    //old code
    // if (myreact === id) {
    //   unreactPost(postId);
    // } else {
    //   reactPost(postId, id);
    // }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const classes = useStyles();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const ipHandler = () => {
    try {
      fetch(
        "https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708"
      )
        .then((response) => response.json())
        .then((data) => {
          setLocation(data);
        });
    } catch (error) {
      console.log(error);
    }

    // setLocation("ipo okay");
  };

  // create a debouncer
  const debounce = (func, delay) => {
    let debounceTimer;
    if (debounceTimer) {
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
      };
    }
  };


  return (
    <div className="CommentIconsContainer ">
      <div className="CommentIconsWrapper">
        {reactions.map(({ id, gif, icon }, i) => (
          <div key={i} className="CommentIcon ">
            <div onClick={() => onReaction(id)} style={{ cursor: "pointer" }}>
              <img
                onMouseEnter={() => { }}
                src={myreact === id ? gif : icon}
                alt=""
              />
              <p className="reactionP" style={{ textTransform: "capitalize" }}>
                {id}
              </p>
            </div>
            <p>{reacts ? reacts[id] : 0}</p>
          </div>
        ))}

        <div className="CommentIcon">
          <div style={{ cursor: "pointer" }} onClick={() => setActive(!active)}>
            <img src={CommentIcon} alt="" />
            <p className="reactionP">Comments</p>
          </div>
          <p>{comments || 0}</p>
        </div>

        <div className="CommentIcon">
          {/* <img src={ShareIcon} alt="" onClick={() => setShareModal(true)} />
           */}
          <div style={{ cursor: "pointer" }} onClick={handleClick("top")}>
            <RiShareForwardLine

              //old code
              // onClick={() => setShareModal(true)}
              // style={{ fontSize: "35px" }}
              className="share-icon"
            />
            <p className="reactionP">Share</p>
          </div>
          <p>{shares || 0}</p>
        </div>

        {/* New Code */}

        {/* <div className="CommentIcon">
          <div
            style={{ cursor: "pointer" }}
          >
            <HoverOver title="Upcoming">
              <img src={BoostIcon} alt="" />
            </HoverOver>
            <HoverOver title="Upcoming">
              <p className="reactionP">Promote</p>
            </HoverOver>
          </div>
          <p>{boosts || 0}</p>
        </div> */}

        {/* //Old code  do no*/}

        {
          isMe() && (
            <div className="CommentIcon">
              <div
                // onClick={() => {
                //   ipHandler();
                //   setPromotion(!promotion);
                // }}

                onClick={handleShow}
                style={{ cursor: "pointer" }}
              >

                <img src={BoostIcon} alt="promotions" />

                {/* -----------------Previous promote Modal---------------------- */}
                {/* <img src={BoostIcon} alt="" onClick={() => setBoostModal(true)} /> */}
                {
                  (promoteStatus == 0) && <p className="reactionP">Promote</p>
                }
                {
                  (promoteStatus == 1) && <p className="reactionP">Applied</p>
                }
                {
                  (promoteStatus == 3) && <p className="reactionP">Payment</p>
                }
                {
                  (promoteStatus == 4) && <p className="reactionP">Processing</p>
                }
                {
                  (promoteStatus == 5) && <p className="reactionP">Running</p>
                }
                {
                  (promoteStatus == 6) && <p className="reactionP">Complete</p>
                }
                {
                  (promoteStatus == 10) && <p className="reactionP">Rejected</p>
                }
                {
                  (promoteStatus == 11) && <p className="reactionP">Resubmit</p>
                }
                {
                  (promoteStatus == 13) && <p className="reactionP">Banned</p>
                }

              </div>
              <p>{promoteCount || 0}</p>
            </div>

          )
        }




      </div>

      <Payment open={boostModal} close={() => setBoostModal(false)} />
      {/* <Share
        close={() => setShareModal(false)}
        open={shareModal}
        postId={postId}
        username={username}
      /> */}

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={origin}
        transformOrigin={origin}
      >

        <Share />
        {/* <MenuItem>
              <p
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}       
              >
                {" "}
                <FaRegEdit
                  style={{ fontSize: "20px", marginRight: "4px" }}
                />{" "}
                Edit
              </p>
        </MenuItem> */}
      </Menu>
    </div>
  );
};
