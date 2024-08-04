import React, { useState } from "react";
import {
  Public,
  Info,
  People,
  Audiotrack,
  VideoLibrary,
  Group,
  Note,
  Photo,
  Timelapse,
  Create,
  Lock,
} from "@material-ui/icons";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import axios from "axios";
import { CgWorkAlt } from "react-icons/cg";

import { BACKEND_URL } from "../../../shared/constants/Variables";
import { userHeader } from "../../../shared/functions/Token";
import { HoverOver } from "../../../components/Tools";
import { Header } from "./style";
import "./style.scss"
import { useLocation } from "react-router-dom";
import Jobs from "../Jobs";

export default ({noteSortBy, title, counts = 0, privacy, changePrivacy, isMe, sortBy, setSortBy }) => {


  const location = useLocation()

  const [anchorEl, setAnchorEl] = useState(null);

  const [open, setOpen] = useState(false)


  const options = [

    { value: noteSortBy, label: (noteSortBy == 0 || noteSortBy == null) ? "A-Z" : noteSortBy == 1 ? 'A-Z' : 'Z-A' },
    { value: '1', label: 'A-Z' },
    { value: '-1', label: 'Z-A' }
  ]

  const origin = {
    vertical: "top",
    horizontal: "right",
  };
  function onPrivacyChange(prv) {
    const name = title.toLocaleLowerCase();
    axios
      .put(
        `${BACKEND_URL}/profile/privacy/${name}`,
        { privacy: prv },
        { headers: userHeader() }
      )
      .then(() => {
        changePrivacy(name, prv);
        setAnchorEl(null);
      })
      .catch(() => {
        setAnchorEl(null);
      });
    setAnchorEl(null);
  }

  return (
    <div style={{ alignItems: "center"}}>
      <Header style={{ height: "25px" }}>
        <div>
          {isMe() && (
            // <HoverOver title="Coming Soon">
            // {/* <HoverOver title="Manage"> */}
            //   <IconButton>
            //     <Create />
            //   </IconButton>
            // </HoverOver>
            <>


                {

                  location.pathname.includes("notes") ?
                  <select
                    className="select-options-in-notes"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                    }}
                  >
                    {options.map(({ value, label }, index) => (
                      <option key={index} value={value}>
                        {label}
                      </option>
                    ))}
                  </select> :
                <HoverOver title="Coming Soon">
                  {/* <HoverOver title="Manage"> */}
                  <IconButton>
                    <Create />
                  </IconButton>
                </HoverOver>

                }

            </>

          )}
        </div>
        <div style={{ display: "flex" }}>
          <span>
            <HeaderIcon title={title} />
          </span>
          <span style={{ fontWeight: 700, margin: "1px 5px" }}>{title}</span>
          <span style={{ fontWeight: 700 }}>{`(${counts})`}</span>
        </div>
        <div>
          {isMe() && (
            <HoverOver title="Privacy">
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                color="inherit"
              >
                {privacy === "private" ? (
                  <Lock />
                ) : privacy === "friends" ? (
                  <People />
                ) : (
                  <Public />
                )}
              </IconButton>
            </HoverOver>
          )}
        </div>
      </Header>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={origin}
        keepMounted
        transformOrigin={origin}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => onPrivacyChange("public")}>Public</MenuItem>
        <MenuItem onClick={() => onPrivacyChange("friends")}>
          Followers
        </MenuItem>
        <MenuItem onClick={() => onPrivacyChange("private")}>Private</MenuItem>
      </Menu>
    </div>
  );
};

function HeaderIcon({ title }) {
  switch (title.toLocaleLowerCase()) {
    case "about":
      return <Info fontSize="large" />;
    case "friends":
      return <People fontSize="large" />;
    case "photos":
      return <Photo fontSize="large" />;
    case "audios":
      return <Audiotrack fontSize="large" />;
    case "videos":
      return <VideoLibrary fontSize="large" />;
    case "groups":
      return <Group fontSize="large" />;
    case "notes":
      return <Note fontSize="large" />;
    case "activity log":
      return <Timelapse fontSize="large" />;
    case "jobs":
      return <CgWorkAlt />;
    default:
      return <Info fontSize="large" />;
  }
}
