import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  ListItemAvatar,
  Avatar,
  Grid,
} from "@material-ui/core";
import axios from "axios";

import { BACKEND_URL } from "../../../../shared/constants/Variables";
import { userHeader } from "../../../../shared/functions/Token";
import { getUserAvatar } from "../../../../shared/functions";
import { Spinner } from "../../../../shared";
import { getBlocklist } from "../../Hooks";
import { NoItem } from "../../style";

import "./style.scss"
import PeopleSkeleton from "../../../../skeleton/ProfileSearch/PeopleSkeleton";

export default () => {
  document.title = "Blocklist";
  const { list, setList, working } = getBlocklist();
  function unblock(id) {
    axios
      .post(`${BACKEND_URL}/profile/unblock`, { id }, { headers: userHeader() })
      .then(() => {
        setList(list.filter((u) => u.id !== id));
      })
      .catch((err) => {
        throw err;
      });
  }
  if (list.length < 1 && working) {
    if (working) {
      return (<div className="block-list-section">
        {Array.apply(null, new Array(10))?.map((item, index) => (
          <PeopleSkeleton key={index} />
        ))}
      </div>);
    } else {
      return <NoItem>{/* <span>No Item.</span> */}</NoItem>;
    }
  } else {
    return (

      <List>
        <div className="block-list-section">

          {list.map(({ id, avatar, gender, username, name }) => (
            <ListItem
              key={username}
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "rgb(255 255 255)",
                border: "1px solid #e4e4e4",
                borderRadius: "4px",
                maxWidth: "475px"
              }}
            >

              <span className="avater-box">
                <ListItemAvatar>
                  <Avatar src={getUserAvatar(avatar, gender, username)} alt="" />
                </ListItemAvatar>

                <ListItemText primary={name?.join(" ")} />
              </span>

              <button
                className="unblock-btn"
                onClick={() => unblock(id)}
              >
                Unblock
              </button>

            </ListItem>

          ))}
        </div>
      </List>



    );
  }
};
