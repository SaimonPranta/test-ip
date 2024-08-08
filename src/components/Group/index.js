import React, { useState } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
} from "@material-ui/core";
import { Public, Lock } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";

import {
  joinGroup,
  leaveGroup,
  getQuestions,
} from "../../shared/functions/Group";
import { getGroupAvatar } from "../../shared/functions";
import { Main, Avatar, Body, Buttons } from "./style";
// import grpImg from "../../assets/profile/Group.png";
import grpImg from "../../assets/profile/Group1.jpg";
import { HoverOver } from "../Tools";
import { Promt } from "..";

import "./style.scss";
import Poper from "./poper";
import EditModal from "./EditModal";
import { BACKEND_URL } from "../../shared/constants/Variables";
import { userHeader } from "../../shared/functions/Token";
import axios from "axios";

import { thumbnail } from "../../assets/media";
import ImagePreview from "./ImagePreview";

const Index = ({
  groups,
  setGroups,
  group,
  setGroup,
  isMe,
  index,
  id,
  username,
  thumbnailImageFromDb,
  thumbnailImageUrl,
}) => {
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openLeave, setOpenLeave] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [working, setWorking] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [openEdit, setOpen] = React.useState(false);
  const [selectedWordTag, setselectedWordTag] = useState(null);
  const [linkId, setLinkId] = useState("");
  const [hyperLink, sethyperLink] = useState("");
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(null);

  const [thumbnailImage, setThumbnailImage] = useState("");
  const [imageIndex, setImageIndex] = useState("");

  function onEdit(id) {
    const e = groups.find((i) => i.id === id);
    if (!e) {
      return;
    }

    setEdit(e);
    setName(e?.name);
    setLinkId(e?.link_id);
  }

  const handleOpen = (id) => {
    setOpen(true);
    setAnchorEl(null);
    onEdit(id);
  };

  //Thum image upload start

  const previewImage = (file) => {
    if (file) return URL.createObjectURL(file);
    return grpImg;
  };

  const onInputFileChange = (index, e, id) => {
    const thumb = e.target.files[0];

    setThumbnailImage(thumb);
    setImageIndex(index);

    imageSaveHandler(thumb, id);
  };

  const imageSaveHandler = (thumb, id) => {
    let formData = new FormData();

    formData.append("thumbnail", thumb);
    formData.append("groupId", id);

    axios
      .put(`${BACKEND_URL}/groups/add-thumbnail-group`, formData, {
        headers: userHeader(),
      })
      .then((res) => {})
      .catch((err) => {
      });
  };

  //Thum image upload end

  function onSave() {
    setAnchorEl(null);
    if (!edit) {
      return;
    }

    // Here genarating title link for store database start
    const genarateLink = `<a href="${hyperLink}" target="_blank">${selectedWordTag}</a>`;
    const replaceReadyTitile = name.replace(selectedWordTag, genarateLink);

    // Here genarating title link for store database end

    const linkandTag2 = `{${selectedWordTag}: ${hyperLink}}`;

    const name1 = name?.trim();
    const link_id = linkId?.trim();

    axios
      .put(
        `${BACKEND_URL}/groups/update-name-with-link/${edit.id}`,
        {
          name: name1,
          attachedlinkpictitle: replaceReadyTitile,
          linkandtag: {
            selectedWordTag: selectedWordTag,
            hyperLink: hyperLink,
          },
          link_id: link_id,
        },
        { headers: userHeader() }
      )
      .then(() => {
        setGroups(
          groups.map((i) => {
            if (i.id === edit.id) {
              i.name = name;
              i.link_id = link_id;
              // i.Picname = d;
            }
            return i;
          })
        );
        // close();
        setselectedWordTag(null);
        sethyperLink("");
      })
      .catch((er) => {
        throw er;
      });
    setOpen(false);
  }

  function leave() {
    setWorking(true);
    leaveGroup(group.id)
      .then(() => {
        setGroup({
          ...group,
          requested: false,
          admin: false,
          joined: false,
        });
        setWorking(false);
        setOpenLeave(false);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }

  function join() {
    setWorking(true);
    getQuestions(group.id)
      .then(({ data }) => {
        if (data.length > 0) {
          setQuestions(data);
          setOpenQuestion(true);
          setWorking(false);
        } else {
          joinNow();
        }
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }
  function joinNow() {
    const count = questions.length;
    for (let i = 0; i < count; i++) {
      if (!answers[i]) {
        return;
      }
    }
    setWorking(true);
    joinGroup(group.id, answers)
      .then(() => {
        setGroup({
          ...group,
          requested: true,
        });
        setOpenQuestion(false);
        setWorking(false);
        setQuestions([]);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }

  const handleReplacetag = (attachedlinkpictitle, name) => {
    const updateAttachedlinkpictitle = attachedlinkpictitle?.replaceAll(
      "&lt;",
      "<"
    );

    if (updateAttachedlinkpictitle?.includes("<script")) {
      return;
    } else {
      return updateAttachedlinkpictitle?.includes("<a") ? (
        <div
          dangerouslySetInnerHTML={{
            __html: updateAttachedlinkpictitle,
          }}></div>
      ) : (
        name
      );
    }
  };

  return (
    <>
      <div className="single-groups-container-section">
        <div className="groups-container">
          <div className="groups-container-box">
            <div className="img-box">
              {/* previuos code */}
              {/* <img className="groups-tabs-img" alt="img" src={!!group.avatar ? getGroupAvatar(group.avatar) : grpImg} /> */}

              {/* <img className="groups-tabs-img" alt="img"
                src={(imageIndex === index) ? previewImage(thumbnailImage) : grpImg}
               /> */}

              <ImagePreview
                src={
                  imageIndex === index
                    ? previewImage(thumbnailImage)
                    : thumbnailImageUrl
                }
                grpImg={grpImg}
                username={username}
                thumbnailImageFromDb={thumbnailImageFromDb}
              />

              <div className="open-porper-modal">
                {isMe() && location.pathname.includes("/groups") && (
                  <span className="top-section">
                    {/* <HoverOver title="Not Available">
                        <img src={thumbnail} alt="thumbnail" />
                      </HoverOver> */}

                    <label className="image-uploader">
                      <img src={thumbnail} alt="thumbnail" />
                      <input
                        id="upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => onInputFileChange(index, e, id)}
                      />
                    </label>

                    <Poper
                      setGroups={setGroups}
                      groups={groups}
                      groupid={group?.id}
                      handleOpen={handleOpen}
                    />
                  </span>
                )}
              </div>

              <EditModal
                selectedWordTag={selectedWordTag}
                hyperLink={hyperLink}
                setselectedWordTag={setselectedWordTag}
                sethyperLink={sethyperLink}
                linkId={linkId}
                setLinkId={setLinkId}
                name={name}
                setName={setName}
                saveHandler={onSave}
                show={openEdit}
                onHide={() => {
                  setOpen(false);
                  setselectedWordTag(null);
                  sethyperLink("");
                }}
              />
            </div>

            <div className="text-box">
              {/* <h6> {group.name}</h6> */}
              <h6>
                {
                  // group.attachedlinkpictitle?.includes('<a') ? <div dangerouslySetInnerHTML={{ __html: group?.attachedlinkpictitle }}></div> : group?.name
                  handleReplacetag(group?.attachedlinkpictitle, group?.name)
                }
              </h6>
              <p>
                {group.ppd} (posts a day) {group.members} (Members).
              </p>
            </div>
          </div>

          <div></div>

          <Buttons>
            {group.requested ? (
              <Button
                onClick={leave}
                variant="outlined"
                color="primary"
                disabled={working}>
                Cancel Request
              </Button>
            ) : !group.admin ? (
              <>
                {group.joined ? (
                  <Button
                    onClick={() => setOpenLeave(true)}
                    variant="contained"
                    color="primary"
                    disabled={working}>
                    Leave
                  </Button>
                ) : (
                  <Button
                    onClick={join}
                    variant="contained"
                    color="primary"
                    disabled={working}>
                    Join
                  </Button>
                )}
              </>
            ) : (
              ""
            )}
          </Buttons>
        </div>
      </div>

      {/* old code  */}
      {/* <Main>
        <Avatar
          src={!!group.avatar ? getGroupAvatar(group.avatar) : grpImg}
          alt=""
        />
        <Body style={{ padding: "0px", margin: "0px" }}>
          <Link to={`/groups/${group.id}`}>
            <Typography
              component="h2"
              style={{ fontSize: 18, fontWeight: "bold", color: "black" }}
            >
              {group.name}
            </Typography>
          </Link>
          <Typography component="p" variant="body1" style={{ margin: "3px 0" }}>
            {group.members} Members. {group.ppd} post(s) a day.
          </Typography>

          <HoverOver title="Group privacy">
            {group.privacy === "public" ? <Public /> : <Lock />}
          </HoverOver>

        </Body>  */}

      {/* <Buttons>
        {
          group.requested ? (
            <Button
              onClick={leave}
              variant="outlined"
              color="primary"
              disabled={working}
            >
              Cancel Request
            </Button>
          ) : !group.admin ? (
            <>
              {group.joined ? (
                <Button
                  onClick={() => setOpenLeave(true)}
                  variant="contained"
                  color="primary"
                  disabled={working}
                >
                  Leave
                </Button>
              ) : (
                <Button
                  onClick={join}
                  variant="contained"
                  color="primary"
                  disabled={working}
                >
                  Join
                </Button>
              )}
            </>
          ) : (
            ""
          )
        } */}
      {/*      <IconButton>
            <MoreVert />
          </IconButton>
        </Buttons>
      </Main> */}

      <Dialog open={openQuestion} fullWidth maxWidth="sm">
        <h2
          style={{
            margin: "10px 0px ",
            padding: "15px",
            borderBottom: "1px solid #e4e4e4",
          }}>
          Answer Questions
        </h2>

        <Grid style={{ padding: "15px" }} container>
          <Grid item={true} xs={1}>
            <img
              style={{ height: "50px" }}
              src={!!group.avatar ? getGroupAvatar(group.avatar) : grpImg}
            />
          </Grid>
          <Grid style={{ padding: "0px 10px" }} item={true} xs={10}>
            <h3 style={{ marginBottom: "3px" }}>{group.name}</h3>
            <p
              style={{
                display: "flex",
                fontSize: "13px",
                flexDirection: "row",
                alignItems: "center",
              }}
              className="">
              {group.privacy === "public" ? (
                <Public style={{ color: "grey", fontWeight: "100" }} />
              ) : (
                <Lock />
              )}
              | {group.members} Members.
            </p>
          </Grid>
        </Grid>

        <div
          style={{
            fontSize: "16px",
            color: "grey",
            color: "#2b2b2b",
            fontFamily: "inherit",
            margin: "0px 10px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "rgb(239, 239, 239)",
            padding: " 18px",
          }}>
          <b>Your membership is pending approval</b>
          <br />
          <small
            style={{
              lineHeight: "10px",
              fontFamily: "inherit",
              fontFamily: " revert",
              fontSize: " 15px",
            }}>
            Answer these questions from the group admins to help them review
            your request to join. Only the admins and moderators will see your
            answers.
          </small>
        </div>

        <DialogContent style={{ padding: "8px 0px" }}>
          {questions.map((item, i) => (
            <fieldset
              style={{
                display: " flex",
                borderRadius: "5px",
                flexDirection: "column",
                border: "1px solid #e4e4e4",
                marginTop: "10px",
              }}
              key={i}>
              <label>
                <strong>{item}</strong>
              </label>
              {/* <TextField label="Your answer" fullWidth value={answers[i]} /> */}
              <textarea
                placeholder="Your Answer"
                onChange={(e) => {
                  answers[i] = e.target.value;
                  setAnswers(answers);
                }}
                style={{
                  border: "1px solid #e4e4e4",
                  borderRadius: "6px",
                  padding: "12px",
                  margin: "5px 0px",
                }}
              />
            </fieldset>
          ))}
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            disabled={working}
            onClick={() => {
              answers.map(() => "");
              setAnswers(answers);
              setWorking(false);
              setOpenQuestion(false);
            }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={working}
            onClick={joinNow}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Promt
        open={openLeave}
        close={() => {
          setOpenLeave(false);
          setWorking(false);
        }}
        working={working}
        takeAction={leave}
        message="Are you sure you want to leave the group?"
        title="Leave Group"
        btnText="Leave"
      />
    </>
  );
};

export default Index;
