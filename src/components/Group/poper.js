import React, { useState, useEffect, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Popover from "@material-ui/core/Popover";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
// import {
//   editPrivacy,
//   deletePost,
//   editContent,
//   hidePost,
// } from "../../sockets/emit";
import { DeletePost } from "../Post/Dialogs";
import axios from "axios";
import { userHeader } from "../../shared/functions/Token";
import { BACKEND_URL } from "../../shared/constants/Variables";

function Poper({ groupid, setGroups, groups, handleOpen }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const [deleteModal, setDeleteModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const hanndleDelete = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function onDelete() {
    axios
      .delete(`${BACKEND_URL}/groups/${groupid}`, { headers: userHeader() })
      .then(() => console.log("Delete successful"))
      .catch((er) => {
        console.log(er.message);
      });

    const updateGroups = groups.filter((group) => group.id !== groupid);
    console.log(updateGroups);
    setGroups(updateGroups);

    setDeleteModal(false);
    setAnchorEl(null);
  }

  // useEffect(() => {}, [deleteModal]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <p className="groups-action-btn-1" onClick={handleClick}>
        <HiDotsVertical />
      </p>

      <Popover
        className="popercustome"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <p
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            setAnchorEl(null);
            handleOpen(groupid);
          }}
        >
          <BiEdit
            style={{
              fontSize: "20px",
              marginRight: "4px",
            }}
          />{" "}
          Edit
        </p>

        <p
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            setDeleteModal(true);
            setAnchorEl(null);
            hanndleDelete();
            // setAnchorEl(null);
          }}
        >
          <AiOutlineDelete style={{ fontSize: "20px", marginRight: "4px" }} />{" "}
          Delete
        </p>
      </Popover>

      <DeletePost
        open={deleteModal}
        anchorEl={anchorEl1}
        close={() => {
          setDeleteModal(false);
          // setAnchorEl(null);
        }}
        action={onDelete}
      />
    </div>
  );
}

export default Poper;
