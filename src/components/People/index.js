import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FriendCard, FriendAvatar, FriendInfo, Button, CustomButton, WorkAndEducation } from "./style";
import { BACKEND_URL } from "../../shared/constants/Variables";
import { friendRequest } from "../../shared/functions/Friend";
import { userHeader } from "../../shared/functions/Token";
import { getUserAvatar } from "../../shared/functions";
import { Unfriend, Block } from "./Dialogs";
import { Verified } from "../Tools";
import store from "../../store";




export default ({ user, setPeople, onRemove }) => {
  const [working, setWorking] = useState(false);
  const [openUnfriend, setOpenUnfriend] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);




  function onRequest(operation) {
    setWorking(true);
    friendRequest(operation, user.username)
      .then(() => {
        if (operation === "send") {
          setPeople({
            ...user,
            isRequested: "sent",
          });
        } else if (operation === "accept") {
          setPeople({
            ...user,
            isRequested: null,
            isFriend: true,
          });
        } else {
          setPeople({
            ...user,
            isRequested: null,
            isFriend: false,
          });
        }
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }
  function onBlock() {
    setWorking(true);
    setOpenBlock(false);
    axios
      .post(
        `${BACKEND_URL}/profile/block`,
        { userid: user.id },
        { headers: userHeader() }
      )
      .then(() => {
        setWorking(false);
        onRemove(user.id);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }
  function isMe() {
    return store.getState().auth.user.username === user.username;
  }
  return (
   
   
   <FriendCard>
      <Link
        style={{ color: "black", display: "flex" , marginBottom: "3px" }}
        to={`/${user.username}`}
      >

        <FriendAvatar src={getUserAvatar(user.avatar, user.gender, user.username)} alt="" />
        
        <FriendInfo style={{ alignSelf: "center" }}>
          <span style={{fontSize: '16px', fontWeight: '500'}}>
              <Verified  name={user.name} verified={user.verified} />
          </span>


          {user.works?
            <WorkAndEducation >Works at ({user.works})</WorkAndEducation> : <WorkAndEducation>Workes doesn't add yet.</WorkAndEducation>
          }

          {
            user.education ?
            <WorkAndEducation>Studies at ({user.education})</WorkAndEducation> : <WorkAndEducation>Educations doesn't add yet.</WorkAndEducation>
          }
          
          {/* {user.info?.map((txt, i) => (
            <p key={i}>{txt}</p>
          ))} */}


        </FriendInfo>
      </Link>



      {!isMe() && (
        <span style={{ display: "flex" }}>

          {user.isFriend && (

            //old code 
            // <Button
            //   variant="outlined"
            //   onClick={() => setOpenUnfriend(true)}
            //   disabled={working}
            // >
            //   Unfollow
            // </Button>

            <CustomButton
  
              onClick={() => setOpenUnfriend(true)}
              disabled={working}>
              Unfollow
            </CustomButton>

          )}
          {user.isFriend && (
            <CustomButton
              // variant="outlined"
              onClick={() => setOpenBlock(true)}
              disabled={working}
            >
              Block
            </CustomButton>
          )}


          {user.isRequested === "sent" && (
            <CustomButton
              onClick={() => onRequest("cancel")}
              disabled={working}
            >
              Cancel
            </CustomButton>
          )}


          {user.isRequested === "received" && (
            <>
              <CustomButton
                // color="primary"
                // variant="contained"

                onClick={() => onRequest("accept")}
                disabled={working}
              >
                Confirm
              </CustomButton>
              <CustomButton
                // style={{
                //   background: "#3f51b5",
                //   color: "white",
                //   textTransform: "none",
                // }}
                // variant="outlined"
                onClick={() => onRequest("cancel")}
                disabled={working}
              >
                Delete
              </CustomButton>
            </>
          )}


          {!user.isFriend && !["sent", "received"].includes(user.isRequested) && (
            <CustomButton
              // color="primary"
              // variant="contained"
              onClick={() => onRequest("send")}
              disabled={working}
            >
              Follow
            </CustomButton>
          )}


          {!user.isFriend &&
            !["sent", "received"].includes(user.isRequested) &&
            onRemove && (
              <CustomButton
                // style={{
                //   background: "#3f51b5",
                //   color: "white",
                //   textTransform: "none",
                // }}
                // variant="outlined"
                onClick={() => onRemove(user.id)}
                disabled={working}
              >
                Remove
              </CustomButton>
            )}


        </span>
      )}



      <Block
        open={openBlock}
        close={() => setOpenBlock(false)}
        username={user.username}
        action={onBlock}
      />


      <Unfriend
        open={openUnfriend}
        close={() => setOpenUnfriend(false)}
        username={user.username}
        action={() => {
          onRequest("cancel");
          setOpenUnfriend();
        }}
      />


    </FriendCard>

  );
};
