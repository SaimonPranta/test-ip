import React, { useEffect, useState } from "react";
import axios from "axios";

import { BACKEND_URL } from "../../../shared/constants/Variables";
import { userHeader } from "../../../shared/functions/Token";
import { getUrl } from "../../../shared/functions";
import { Spinner } from "../../../shared";
import { getMedia } from "../Hooks";
import Header from "../Header";
import "./style.scss";


import Poper from "./poper";

import { Link, withRouter } from "react-router-dom";

import EditModal from "./EditModal";
import GridSkeleton from "../../../skeleton/TimelineSkeleton/GridSkeleton";
import { HoverOver } from "../../../components/Tools";
import { thumbnail1 } from "../../../assets/media";
import Video from "./Video";


function Videos({ username, privacy, changePrivacy, history, isMe }) {
  document.title = "Videos";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [edit, setEdit] = useState(null);
  const [openEdit, setOpen] = React.useState(false);
  const [pictitle, setPicTitle] = useState("");
  const [linkId, setLinkId] = useState("");
  const [des, setDes] = useState("");
  const [editing, setEditing] = useState(false);
  const [editIcon, setEditIcon] = useState(true);
  const [editIconID, setEditIconID] = useState(null);
  const [inputEditId, setInputEditId] = useState("");

  const [selectedWordTag, setselectedWordTag] = useState(null);
  const [hyperLink, sethyperLink] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [imageIndex, setImageIndex] = useState('');



  //call api and destructring
  const { media, counts, working, setCounts, setMedia } = getMedia(username, "video");


  function onEdit(id) {
    const e = media.find((i) => i.id === id);
    if (!e) {
      return;
    }
    e === editIconID ? setEditIcon(true) : setEditIcon(false);
    setEdit(e);
    setPicTitle(e.pictitle);
    setLinkId(e?.link_id)
  }

  //Thumb image upload start

  const previewImage = (file) => {
    if (file) return URL.createObjectURL(file);
    return '';
  }

  const onInputFileChange = (index, e, id) => {
    const thumb = e.target.files[0];

    setThumbnailImage(thumb);
    setImageIndex(index);

    imageSaveHandler(thumb, id)
  }


  const imageSaveHandler = (thumb, id) => {


    let formData = new FormData();

    formData.append("thumbnail", thumb);
    formData.append("mediaId", id);

    axios.put(`${BACKEND_URL}/posts/add-thumbnail`, formData,
      {
        headers: userHeader()
      }
    ).then((res) => {
    }).catch(err => {
    })

  }


  // Thumb image upload end

  const handleOpen = (customeid, videoPictitle) => {
    setInputEditId(videoPictitle);
    setOpen(true);
    editHandler(customeid);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  function close() {
    setEdit(null);
    setPicTitle("");
    setEditing(false);
  }

  function onSave() {
    setAnchorEl(null);
    if (!edit) {
      return;
    }


    //here genarating title link for store database start
    const genarateLink = `<a href="${hyperLink}" target="_blank">${selectedWordTag}</a>`;
    const replaceReadyTitile = pictitle.replace(selectedWordTag, genarateLink);

    //here generating title link for store databse end
    const linkandTag2 = `{${selectedWordTag}: ${hyperLink}}`

    setEditing(true);
    const t = pictitle?.trim();
    const d = des?.trim();
    const link_id = linkId?.trim();

    axios
      .put(
        `${BACKEND_URL}/profile/media/title/${edit.id}`,
        {
          pictitle: t,
          attachedlinkpictitle: replaceReadyTitile,
          linkandtag: { selectedWordTag: selectedWordTag, hyperLink: hyperLink },
          link_id: link_id
        },
        { headers: userHeader() }
      )
      .then(() => {
        setMedia(
          media.map((i) => {
            if (i.id === edit.id) {
              i.pictitle = t;
              i.link_id = link_id;
            }
            return i;
          })
        );
        close();
        setselectedWordTag(null);
        sethyperLink('');
      })
      .catch((er) => {
        setEditing(false);
        throw er;
      });
    setOpen(false);
  }

  const editHandler = (audio) => {
    onEdit(audio);
    setEditIconID(audio);
    setAnchorEl(null);
  };

  const saveHandler = () => {
    setAnchorEl(null);
    onSave();
    setEditIcon(true);
  };



  const handleReplacetag = (attachedlinkpictitle, name) => {
    const updateAttachedlinkpictitle = attachedlinkpictitle?.replaceAll("&lt;", "<")

    if (updateAttachedlinkpictitle?.includes('<script')) {
      return;
    } else {
      return updateAttachedlinkpictitle?.includes('<a') ? <div dangerouslySetInnerHTML={{ __html: updateAttachedlinkpictitle }}></div> : name
    }

  }

  return (
    <div>
      {
        <Header
          counts={media.length}
          title="Videos"
          isMe={isMe}
          privacy={privacy}
          changePrivacy={changePrivacy}
        />
      }

      {
        working ?

          // <Spinner height={15} />
          <div className="profile-video-container-section">

            <div className="videos-container-section">
              {
                Array.apply(null, new Array(10))?.map((item, index) => (
                  <GridSkeleton key={index} />
                ))
              }
            </div>
          </div>

          :
          <div className="profile-video-container-section">

            <div className="videos-container-section">
              {
                media.length > 0 ? (
                  media.map((video, index) => (
                    <div className="video-container" key={video.id}>
                      <div className="video-container-box">
                        <div className="video-box">
                          <div className="poster-style"
                            onClick={() => history.push(`/${username}/timeline?post=${video.post}`)}
                          >
                            <Video
                              // style={{ backgroundColor: "transparent" }}
                              src={(imageIndex === index) ? previewImage(thumbnailImage) : video?.thumbnailUrl}
                              // title={pictitle}
                              username={username}
                              thumbnailImage={video?.thumbnailImg}
                            />
                            {/* <Video
                              style={{ backgroundColor: "transparent" }}
                              src={getUrl(video.url, username)}
                              title={pictitle}
                            /> */}
                          </div>

                          <div className="open-porper-modal">
                            {isMe() && (

                              <span className="top-section">

                                {/* <HoverOver title="Not Available">
                                  <img src={thumbnail1} alt="thumbnail" />
                                </HoverOver> */}

                                <label className="image-uploader">
                                  <img src={thumbnail1} alt="thumbnail" />
                                  <input id="upload" type="file"
                                    accept="image/*" onChange={(e) => onInputFileChange(index, e, video.id)} />
                                </label>

                                <Poper
                                  username={username}
                                  handleOpen={handleOpen}
                                  videoid={video.id}
                                  videoURL={video.url}
                                  videoPictitle={video.pictitle}
                                  Fullvideo={video}
                                  media={media}
                                  setMedia={setMedia}
                                />
                              </span>
                            )}
                          </div>


                        </div>

                        <div>
                          <h6 className="video-title">
                            {
                              // video?.attachedlinkpictitle?.includes('<a') ? <div dangerouslySetInnerHTML={{ __html: video?.attachedlinkpictitle }}></div> : video?.pictitle
                              handleReplacetag(video?.attachedlinkpictitle, video?.pictitle)
                            }
                          </h6>
                        </div>


                      </div>

                      <EditModal
                        selectedWordTag={selectedWordTag}
                        hyperLink={hyperLink}
                        sethyperLink={sethyperLink}
                        setselectedWordTag={setselectedWordTag}
                        setPicTitle={setPicTitle}
                        pictitle={pictitle}
                        linkId={linkId}
                        setLinkId={setLinkId}
                        inputEditId={inputEditId}
                        saveHandler={saveHandler}
                        show={openEdit}
                        onClose={handleClose}
                        onHide={() => {
                          setOpen(false)
                          setselectedWordTag(null);
                          sethyperLink('');
                        }}
                      />

                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      height: " 50vh",
                      width: "100%",
                      alignItems: "center",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        padding: "10px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                    >
                      {/* No Videos */}
                    </p>
                  </div>
                )}
            </div>

          </div>
      }

   



    </div>
  );
}

export default withRouter(Videos);
