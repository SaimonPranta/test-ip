import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@material-ui/core";
import {
  Twitter,
  Facebook,
  LinkedIn,
  Instagram,
  Link,
} from "@material-ui/icons";
import styled from "styled-components";

import { getUrl } from "../../../shared/functions";
import VK from "../../../assets/reactions/VK.png";
import { HoverOver } from "../../Tools";

import { FaUserFriends } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdLink } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

import "./style.scss";

const shares = [
  { name: "facebook", Icon: Facebook, color: "#3b5998" },
  { name: "twitter", Icon: Twitter, color: "#00acee" },
  { name: "instagram", Icon: Instagram, color: "#3f729b" },
  { name: "linkedin", Icon: LinkedIn, color: "#0e76a8" },
];

export default ({ open, close, postId, username }) => {
  function openWith(name) {
    window.open(
      getUrl(`/api/share?to=${name}&post=/${username}/timeline?post=${postId}`, username),
      "blank"
    );
  }
  return (
    <div className="share">
      <div className="sharDiv">
        <FaRegEdit style={{ fontSize: "20px", marginRight: "8px" }} />
        <b>Share to Timeline </b>
      </div>
      <div className="sharDiv">
        <IoMdAddCircleOutline
          style={{ fontSize: "20px", marginRight: "8px" }}
        />
        <b> Share to Story</b>
      </div>
      <div className="sharDiv">
        <AiOutlineMessage style={{ fontSize: "20px", marginRight: "8px" }} />{" "}
        <b> Share to Messanger</b>
      </div>
      <div className="sharDiv">
        <HiOutlineUserGroup style={{ fontSize: "20px", marginRight: "8px" }} />{" "}
        <b>Share to Group</b>
      </div>
      <div className="sharDiv">
        <FaUserFriends style={{ fontSize: "20px", marginRight: "8px" }} />
        <b>Share to Followers</b>
      </div>
      <div className="sharDiv">
        <IoMdLink style={{ fontSize: "20px", marginRight: "8px" }} />
        <b> Copy the link</b>
      </div>

      {/* style={{ fontSize: "20px", marginRight: "8px" }} */}
      {/* <IconContainer>
        {shares.map(({ name, Icon, color }) => (
          <HoverOver title={name} key={name}>
            <IconButton
              style={{ backgroundColor: color }}
              onClick={() => openWith(name)}
            >
              <Icon />
            </IconButton>
          </HoverOver>
        ))}
        <HoverOver title="VK">
          <IconButton
            style={{ backgroundColor: "#1A4B78" }}
            onClick={() => openWith("vk")}
          >
            <img alt="" src={VK} />
          </IconButton>
        </HoverOver>
        <HoverOver title="Copy Link">
          <IconButton
            style={{ backgroundColor: "#00a992" }}
            onClick={() => {
              document.getElementById(`postInput${postId}`).select();
              document.execCommand("copy");
            }}
          >
            <Link />
          </IconButton>
        </HoverOver>
      </IconContainer> */}  
      <input
        style={{ position: "absolute", zIndex: "-999", opacity: 0 }}
        defaultValue={`https://micple.com/${username}/timeline?post=${postId}`}
        id={`postInput${postId}`}
      />
    </div>
  );
};

const IconContainer = styled("div")`
  display: flex;
  button {
    margin: auto;
    span {
      svg {
        font-size: 50px !important;
        color: #fff;
      }
      img {
        height: 50px;
        width: auto;
      }
    }
  }
`;
