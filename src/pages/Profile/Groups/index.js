import React, { useState } from "react";
import { GroupAdd } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";

import { Group } from "../../../components";
import { Spinner } from "../../../shared";
import { getGroups } from "../Hooks";
import Header from "../Header";
import NewGroup from "./New";
import "./style.scss";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiDeleteBack2Fill, RiDeleteBack2Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import CustomeButton from "../../../Utils/CustomeButton";
import GridSkeleton from "../../../skeleton/TimelineSkeleton/GridSkeleton";

export default ({ username, privacy, changePrivacy, isMe }) => {




  document.title = "Groups";
  const [newModal, setNewModal] = useState(false);
  const [newGroup, setNewGroup] = useState(false);
  const { groups, counts, working, setGroups, setCounts } = getGroups(username);
  function setGroup(data) {
    setGroups([data, ...groups]);
    setCounts(counts + 1);
  }
  function editGroup(id, data) {
    setGroups(
      groups.map((i) => {
        if (i.id === id) {
          return {
            ...i,
            ...data,
          };
        }
        return i;
      })
    );
  }
  return (
    <div>
      <Header
        title="Groups"
        counts={counts}
        privacy={privacy}
        isMe={isMe}
        changePrivacy={changePrivacy}
      />
      <div className="create">
        <span
          // className="customeBtnGroup"
          onClick={() => setNewModal(true)}
        // onClick={() => setNewGroup(true)}
        >
          <CustomeButton title="Create" />
        </span>
      </div>


      {/* {newGroup ? (
        <div>
          <Grid
            container
            style={{
              padding: "0px 15px",
              // border: "1px solid #e4e4e4",
            }}
          >
            <Grid xs={1}>
              <HiOutlineUserGroup
                style={{
                  fontSize: "400%",
                  // border: "1px solid red",
                }}
              />
            </Grid>
            <Grid style={{ display: "flex" }} xs={5}>
              <div>
                {" "}
                <input
                  className="groupInput"
                  type="text"
                  placeholder="Group Name"
                />
                <input
                  className="groupInput"
                  type="text"
                  placeholder="Description"
                />
              </div>
              <div style={{ width: "250px" }}>
                {" "}
                <input
                  className="groupInput"
                  type="search"
                  style={{
                    width: "100%",
                    padding: "0px 4px ",
                    borderRadius: "3px",
                  }}
                  placeholder="Invite followers"
                />
                <div>
                  {" "}
                  <select
                    style={{
                      border: "1px solid #e4e4e4",
                      height: "26px",
                      width: "244px",
                    }}
                    name="Privacy"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
              </div>
            </Grid>
            <Grid
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 0px",
              }}
              xs={6}
            >
              <p
                style={{
                  width: "100%",
                  height: "50%",
                  border: "1px solid #e4e4e4",
                }}
              >
                {" "}
                <span style={{ padding: "0px 10px" }}>
                  Abir{" "}
                  <RiDeleteBack2Line
                    style={{ fontSize: "15px", marginTop: "5px" }}
                  />
                </span>{" "}
              </p>
              <button className="addBtn">Create</button>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div></div>
      )} */}


      <NewGroup
        open={newModal}
        close={() => setNewModal(false)}
        setGroup={setGroup}
      />

      <div className="groups-container-section">

        {
          working ?

            // <Spinner height={10} />

            <>

              {
                Array.apply(null, new Array(10))?.map((item, index) => (
                  <GridSkeleton key={index} />
                ))
              }

            </>

            :
            groups.map((group, index) => (
              <Group
                groups={groups}
                setGroups={setGroups}
                isMe={isMe}
                group={group}
                setGroup={(data) => editGroup(group.id, data)}
                key={group.id}
                index={index}
                id={group.id}
                username={username}
                thumbnailImageFromDb={group?.thumbnailImg}
                thumbnailImageUrl={group?.thumbnailImgUrl}
              />
            ))
        }

      </div>


    </div>
  );
};
