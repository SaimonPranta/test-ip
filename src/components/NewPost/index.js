import React, { useState, useEffect, useRef } from "react";
import { NavLink, withRouter, useHistory } from "react-router-dom";

import {
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
  Grid,
} from "@material-ui/core";
import { Public, People, Lock, Close } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import {
  MIMETYPE_REXEX_IMG,
  MIMETYPE_REXEX_VID,
  MIMETYPE_REXEX_AUD,
  MIMETYPE_REXEX_FILE,
} from "../../shared/constants/RegEx";
import {
  imageTypes,
  videoTypes,
  audioTypes,
  fileTypes,
} from "../../shared/constants/Variables";
import {
  AudioIcon,
  LiveIcon,
  PhotoIcon,
  VideoIcon,
  FileIcon,
  Poll
} from "../../assets/media";
import Pdf from "../../assets/media/pdf.png";
import Txt from "../../assets/media/txt.png";
import Psd from "../../assets/media/psd.png";
import Docx from "../../assets/media/docx.png";

import { Create, Drop, Left, Right, Container, Spin } from "./style";
import { generateId } from "../../shared/functions/String";
import { Video, Photo, Audio } from "../../shared/Media";
import { Spinner } from "../../shared";
import { HoverOver } from "../Tools";

import { HiOutlinePhotograph } from "react-icons/hi";
import { MdMusicNote } from "react-icons/md";
import { FaPhotoVideo } from "react-icons/fa";
import { BiFileBlank } from "react-icons/bi";
import ProgressBar from "react-bootstrap/ProgressBar";
import { connect } from "react-redux";

import CreatePollModal from "./CreatePollModal";
import OpenModal from "../../pages/Profile/Poll/OpenModal";

import "./style.scss";

const NewPost = ({
  match: { url },
  submitPost,
  showPrivacy = true,
  progress,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [show, setShow] = useState(false);

  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);

  const history = useHistory();
  const [modalShow, setModalShow] = React.useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);
  const [privacy, setPrivacy] = useState("public");
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileType, setFileType] = useState("");
  const [success, setSuccess] = useState(null);

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);


  const origin = {
    vertical: "top",
    horizontal: "right",
  };
  let uploadProgress;
  if (progress) {
    uploadProgress = ((progress.loaded * 100) / progress.total).toFixed(0) || 0;
  }

  useEffect(() => {
    if (!!success) {
      postTextInput.value = "";
    }
  }, [success]);
  let postTextInput = useRef();
  let postImageInput = useRef();
  let postAudioInput = useRef();
  let postVideoInput = useRef();
  let postOtherInput = useRef();
  let postPollInput = useRef();


  function onSubmit() {
    if (!error) {
      const inp = postTextInput.value.trim();
      if (!inp && selectedMedia.length < 1) {
        return;
      }
      const formData = new FormData();

      for (const media of selectedMedia) {
        // eikhan theke medid fila add hoche onSubmit function e; onSubmit ashteche  Timeline er new post theke
        formData.append(media.id, media.file);
      }
      formData.append("date", new Date().toISOString());
      formData.append("privacy", privacy);
      formData.append("content", inp);
      setWorking(true);

      submitPost(formData)
        .then((res) => {
          setIsCreating(false);
          setSelectedMedia([]);
          setSuccess(Date.now());
          setError("");
          setFileType("");
          setWorking(false);
        })
        .catch(
          (err) => {
            setError("post error");
            setWorking(false);
          }
          // .catch(
          //   ({
          //     response: {
          //       date: { message },
          //     },
          //   }) => {
          //     setError(message);
          //     setWorking(false);
          //   }
        );
    } else {
      setError("post error");
      setWorking(false);
    }
  }
  function resetMedia(id) {
    const newSelected = selectedMedia.filter((i) => i.id !== id);
    if (newSelected.length === 0) {
      setFileType("");
    }
    setSelectedMedia(newSelected);
  }

  function mainMimeType(file, sender) {
    // Here i change dot to '/' and type comming from audio,video,image type
    const splitedFile = file.type.split("/")[1];
    if (window.FileReader) {
      const fileReader = new FileReader();
      fileReader.onloadend = function (e) {
        const arr = new Uint8Array(e.target.result).subarray(0, 4);
        let mimeheader = "";
        for (let i = 0; i < arr.length; i++) {
          mimeheader += arr[i].toString(16);
        }
        const supportedFormat = [
          "jpg",
          "jpeg",
          "png",
          "gif",
          "tiff",
          "mp3",
          "wav",
          "mov",
          "webm",
          "ogg",
          "aac",
          "m4a",
          "mpeg",
          "mp4",
          "x-m4a",
          "vnd.dlna.adts",
          "x-ms-wmv",
          "x-matroska",
          "quicktime",
          "mkv",
          "avi",
          "wmv",
          "txt",
          "pdf",
          "docx",
          "psd",
          "iso",
        ];
        if (supportedFormat.includes(splitedFile)) {
          sender(true);
        } else {
          sender(false);
        }
      };
      fileReader.readAsArrayBuffer(file);
    }
  }

  function onSelectMedia(_) {
    const testid = document.getElementById("testid").files;
    _.preventDefault();
    const { files } = _.target;
    const selectedItems = [];
    for (const file of files) {
      const media = {
        file,
        id: generateId(12),
        name: file.name,
      };

      if (
        MIMETYPE_REXEX_VID.test(file.name) &&
        videoTypes.includes(file.type)
      ) {

        mainMimeType(_.target.files[0], (d) => {
          if (!d) {
            setError("Invalid file");
            setWorking(false);
          }
        });

        if (file.size > 600 * 1024 * 1024) {
          // if (file.size > 71680) {
          setError("Video size should be under 600MB.");
          break;
        }
        media.type = "video";
        setFileType("video");
        setError("");
      } else if (

        MIMETYPE_REXEX_IMG.test(file.name) &&
        imageTypes.includes(file.type)
      ) {
        mainMimeType(_.target.files[0], (d) => {
          if (!d) {
            setError("Invalid file");
            setWorking(false);
          }
        });

        // if (file.size > 10240000) {
        if (file.size > 25 * 1024 * 1024) {
          setError("Image size should be under 25MB.");
          break;
        }
        media.type = "image";
        setFileType("image");
        setError("");
      } else if (
        MIMETYPE_REXEX_AUD.test(file.name) &&
        audioTypes.includes(file.type)
      ) {
        mainMimeType(_.target.files[0], (d) => {
          if (!d) {
            setError("Invalid file");
            setWorking(false);
          }
        });
        if (file.size > 300 * 1024 * 1024) {
          setError("Audio size should be under 250MB.");
          break;
        }
        media.type = "audio";
        setFileType("audio");
        setError("");
      } else if (MIMETYPE_REXEX_FILE.test(file.name)) {
        mainMimeType(_.target.files[0], (d) => {
          if (!d) {
            setError("Invalid file");
            setWorking(false);
          }
        });
        if (file.size > 100 * 1024 * 1024) {
          setError("File size should be under 100MB.");
          break;
        }
        media.type = "file";
        setFileType("file");
        setError("");
      } else {
        setError("Invalid media.");
        break;
      }
      selectedItems.push(media);
    }
    setSelectedMedia([...selectedItems]);
  }

  function changePrivacy(p) {
    setPrivacy(p);
    setAnchorEl(null);
  }

  const onAgreeClick = async (e) => {
    e.preventDefault();
    setModalShow(false);
  };

  // useEffect(() => {
  //   clearTimeout(window.postFileUploadError);
  //   if (!!error) {
  //     window.postFileUploadError = setTimeout(() => {
  //       setError("");
  //     }, 10000);
  //   }
  // }, [error]);

  return (
    <div style={{}}>
      {isCreating && <Drop onClick={() => setIsCreating(false)} />}
      <Container
        style={{
          borderBottom: "1px solid #f3f3f3",
          borderRight: "1px solid #f3f3f3",
        }}
      >
        {/* {working && (
          <Spin>
            <Spinner />
          </Spin>
        )} */}

        <Create active={isCreating}>
          <Grid container>
            <Grid item xs={7}>
              <Left>
                {!!error && <Alert severity="error">{error}</Alert>}

                {/* <TextField
              placeholder={`What's on your mind?`}
              fullWidth
              multiline
              rows={4}
              variant="filled"
              inputProps={{ ref: (ref) => (postTextInput = ref) }}
            /> */}

                <textarea
                  placeholder={`What's on your mind?`}
                  // fullWidth
                  // multiline={true}
                  rows={4}
                  style={{
                    fontFamily: "math",
                    border: "1px solid #e4e4e4",
                    padding: "10px",
                  }}
                  // variant='filled'
                  ref={(ref) => (postTextInput = ref)}
                />

                <div>
                  <div>
                    {!fileType && (
                      <HoverOver title="Not Avaiable.">
                        <IconButton onClick={() => { }}>
                          <img
                            alt=""
                            src={LiveIcon}
                            // style={{ height: 30, width: 30 }}
                            className="live-icon"
                          />
                        </IconButton>
                      </HoverOver>
                    )}
                    {(!fileType || fileType === "image") && (
                      <HoverOver title="Photo">
                        <IconButton
                          // style={{ color: "red!important" }}
                          onClick={() => postImageInput.click()}
                        >
                          <HiOutlinePhotograph
                            style={{ color: "red!important" }}
                            className="new-post-icon"
                          />
                        </IconButton>
                      </HoverOver>
                    )}
                    {(!fileType || fileType === "audio") && (
                      <HoverOver title="Audio">
                        <IconButton onClick={() => postAudioInput.click()}>
                          <MdMusicNote className="new-post-icon" />
                        </IconButton>
                      </HoverOver>
                    )}
                    {(!fileType || fileType === "video") && (
                      <HoverOver title="Video">
                        <IconButton onClick={() => postVideoInput.click()}>
                          <FaPhotoVideo className="new-post-icon" />
                        </IconButton>
                      </HoverOver>
                    )}

                    {/* TODO: Upload any type file*/}
                    {(!fileType || fileType === "other") && (
                      <HoverOver title="Add file">
                        <IconButton onClick={() => postOtherInput.click()}>
                          <BiFileBlank className="new-post-icon" />
                        </IconButton>
                      </HoverOver>
                    )}


                    {!fileType && (
                      <HoverOver title="Not Avaiable.">
                        <IconButton onClick={() => { }}>
                          <img
                            alt=""
                            src={Poll}
                            // style={{ height: 30, width: 30 }}
                            className="poll-icon"
                          />
                        </IconButton>
                      </HoverOver>
                    )}



                    <input
                      accept=".svg, .jpg, .jpeg, .png, .gif, .tiff"
                      type="file"
                      // multiple
                      ref={(ref) => (postImageInput = ref)}
                      onChange={onSelectMedia}
                      className="fileInput"
                    />
                    <input
                      accept=".mp3, .wav, .ogg, .aac, .m4a"
                      type="file"
                      // multiple
                      ref={(ref) => (postAudioInput = ref)}
                      onChange={onSelectMedia}
                      className="fileInput"
                    />
                    <input
                      accept=".mpeg, .webm, .mp4, .mkv, .avi, .wmv, .mov"
                      type="file"
                      // multiple
                      ref={(ref) => (postVideoInput = ref)}
                      onChange={onSelectMedia}
                      className="fileInput"
                    />
                    <input
                      accept=".pdf, .txt, .docx, .psd, .iso"
                      type="file"
                      // multiple
                      ref={(ref) => (postOtherInput = ref)}
                      onChange={onSelectMedia}
                      className="fileInput"
                      id="testid"
                    />



                    {/* Poll here  */}
                    {/* <>
                      <OpenModal />
                    </> */}

                    {/* <NavLink to={`${url}/poll`}>Poll</NavLink> */}

                    {/* <span className="UserTabs">
                      <span
                        onClick={(_) => {
                          _.preventDefault();
                          setModalShow(true);
                        }}
                      >
                        Poll
                      </span>
                    </span> */}

                    {/* <CreatePollModal
                      show={modalShow}
                      onClick={onAgreeClick}
                    /> */}
                  </div>
                  <div>
                    {showPrivacy && (
                      <HoverOver title="Privacy">
                        <IconButton
                          color="inherit"
                          onClick={(e) => setAnchorEl(e.currentTarget)}
                        >
                          {privacy === "public" ? (
                            <Public style={{ fontSize: 20 }} />
                          ) : privacy === "friends" ? (
                            <People style={{ fontSize: 20 }} />
                          ) : (
                            <Lock style={{ fontSize: 20 }} />
                          )}
                        </IconButton>
                      </HoverOver>
                    )}
                    <Menu
                      open={!!anchorEl}
                      anchorEl={anchorEl}
                      anchorOrigin={origin}
                      keepMounted
                      transformOrigin={origin}
                      onClose={() => setAnchorEl(null)}
                      style={{ zIndex: 5 }}
                    >
                      <MenuItem onClick={() => changePrivacy("public")}>
                        Public
                      </MenuItem>
                      <MenuItem onClick={() => changePrivacy("friends")}>
                        Followers
                      </MenuItem>
                      <MenuItem onClick={() => changePrivacy("private")}>
                        Only me
                      </MenuItem>
                    </Menu>
                    <Button
                      style={{
                        borderRadius: "2px",
                        height: "28px",
                        fontSize: 15,
                        marginLeft: 5,
                        color: "white",
                        background: "#3f51b5",
                        textTransform: "none",
                        textShadow: "none",
                      }}
                      variant="contained"
                      onClick={onSubmit}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </Left>
            </Grid>
            <Grid item xs={5}>
              <div></div>

              <Right>
                {selectedMedia.map(({ id, type, file, name }) => (
                  <div key={id} >
                    <div
                      style={{
                        width: type === "image" ? "max-content" : 250,
                        height: type === "audio" ? 144 : "",
                        // maxWidth: type === "image" ? "max-content" : "max-content",
                      }}
                    >
                      {working && (
                        <div
                          style={{
                            background: "rgba(255,255,255,0.8)",
                            zIndex: 1,
                            // width: "300px",
                            width: "100%",
                            height: "148px",
                            position: "absolute",
                          }}
                        >
                          <ProgressBar
                            animated
                            label={uploadProgress + "%"}
                            now={uploadProgress}
                            style={{
                              position: "relative",
                              top: "48%",
                              zIndex: "2",
                            }}
                          />
                        </div>
                      )}

                      {type === "image" && (
                        <Photo src={URL.createObjectURL(file)} />
                      )}
                      {type === "video" && (
                        <Video src={URL.createObjectURL(file)} />
                      )}
                      {type === "audio" && (
                        <Audio src={URL.createObjectURL(file)} />
                      )}
                      {name.split(".")[1] === "pdf" && (
                        <img style={{ width: "140px" }} src={Pdf} alt="" />
                      )}
                      {name.split(".")[1] === "psd" && (
                        <img style={{ width: "140px" }} src={Psd} alt="" />
                      )}
                      {name.split(".")[1] === "docx" && (
                        <img style={{ width: "140px" }} src={Docx} alt="" />
                      )}
                      {name.split(".")[1] === "txt" && (
                        <img style={{ width: "140px" }} src={Txt} alt="" />
                      )}
                    </div>
                  </div>
                ))}
              </Right>
            </Grid>
          </Grid>
        </Create>
      </Container>
    </div>
  );
};

export default connect((store) => ({ requests: store.auth.friendrequests }))(
  withRouter(NewPost)
);
