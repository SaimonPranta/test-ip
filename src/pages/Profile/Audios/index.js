import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { BACKEND_URL } from "../../../shared/constants/Variables";
import { userHeader } from "../../../shared/functions/Token";
import { getUrl } from "../../../shared/functions";

import { getMedia } from "../Hooks";
import Header from "../Header";
import "./style.scss";
import Poper from "./poper";

import { Link, withRouter } from "react-router-dom";

import EditModal from "./EditModal"
import GridSkeleton from "../../../skeleton/TimelineSkeleton/GridSkeleton";
import { HoverOver } from "../../../components/Tools";
import { thumbnail1 } from "../../../assets/media";
import { NoteCover } from "../../../assets/profile";
import Audio from "./Audio/index";



function Audios({ username, privacy, changePrivacy, history, isMe }) {
  document.title = "Audios";
  // custome function


  const [anchorEl, setAnchorEl] = React.useState(null);

  const [edit, setEdit] = useState(null);
  const [openEdit, setOpen] = React.useState(false);
  const [pictitle, setPicTitle] = useState("");
  const [linkId, setLinkId] = useState("");
  const [des, setDes] = useState("");
  const [editing, setEditing] = useState(false);
  const [editIcon, setEditIcon] = useState(true);
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [imageIndex, setImageIndex] = useState('');
  const [editIconID, setEditIconID] = useState(null);
  const [selectedWordTag, setselectedWordTag] = useState(null);
  const [hyperLink, sethyperLink] = useState('');

  const [inputEditId, setInputEditId] = useState("");



  //call api and destructring
  const { media, counts, working, setCounts, setMedia } = getMedia(username, "audio");

  //Thumb Image upload section start

  const previewImage = (file) => {
    if (file) return URL.createObjectURL(file)
    return NoteCover;
  }


  const onInputFileChange = (index, e, id) => {
    const thumb = e.target.files[0];

    setThumbnailImage(thumb);
    setImageIndex(index);

    imageSaveHandler(thumb, id);

  }


  const imageSaveHandler = (thumb, id) => {



    let formData = new FormData();

    formData.append("thumbnail", thumb);
    formData.append("mediaId", id);


    axios.put(`${BACKEND_URL}/posts/add-thumbnail`,

      formData
      ,
      {
        headers: userHeader()
      }
    ).then((res) => {
    }).catch(err => {
    })

  }


  //Thumb Image upload section end

  function onEdit(id) {
    // console.log("id check -> " ,id);
    const e = media.find((i) => i.id === id);

    // console.log("check 2 -> ", e )

    if (!e) {
      return;
    }
    e === editIconID ? setEditIcon(true) : setEditIcon(false);
    setEdit(e);
    setPicTitle(e.pictitle);
    setLinkId(e?.link_id);
  }

  const handleOpen = (customeid, audioPictitle) => {

    setInputEditId(audioPictitle)
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


    // Here genarating title link for store database start
    const genarateLink = `<a href="${hyperLink}" target="_blank">${selectedWordTag}</a>`;
    const replaceReadyTitile = pictitle.replace(selectedWordTag, genarateLink);

    // Here genarating title link for store database end

    const linkandTag2 = `{${selectedWordTag}: ${hyperLink}}`



    setEditing(true);
    const t = pictitle?.trim();
    const d = des?.trim();
    const link_id = linkId?.trim()

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
    // console.log(updateAttachedlinkpictitle)
    if (updateAttachedlinkpictitle?.includes('<script')) {
      return;
    }
    else {
      return updateAttachedlinkpictitle?.includes('<a') ? <div dangerouslySetInnerHTML={{ __html: updateAttachedlinkpictitle }}></div> : name
    }
  }

  return (
    <div className="audio">
      {
        <Header
          counts={media.length}
          title="Audios"
          isMe={isMe}
          privacy={privacy}
          changePrivacy={changePrivacy}
        />
      }
      {
        working ?

          // <Spinner height={15} />
          <div className="profile-audio-container-section">

            <div className="audios-container-section">
              {
                Array.apply(null, new Array(10))?.map((item, index) => (
                  <GridSkeleton key={index} />
                ))
              }
            </div>
          </div>

          :

          <div className="profile-audio-container-section">

            <div className="audios-container-section">

              {
                media?.length > 0 ? (
                  media?.map((audio, index) => (
                    <div className="audio-container" key={audio.id}>

                      <div className="audio-container-box">

                        <div className="audio-container-box"
                          onClick={() => history.push(`/${username}/timeline?post=${audio.post}`)}>
                          <Audio
                            // title={audio.title}
                            style={{ padding: "0px", border: "1px solid red" }}

                            src={
                              (imageIndex === index) ? previewImage(thumbnailImage) : audio?.thumbnailUrl
                            }
                            username={username}
                            thumbnailImage={audio?.thumbnailImg}

                          />
                          {/* <Audio
                            // title={audio.title}
                            style={{ padding: "0px", border: "1px solid red" }}
                            src={getUrl(audio.url, username)}
                            duration={audio.duration}
                          /> */}
                          {/* <img
                            src={previewImage(thumbnailImage)} /> */}

                        </div>

                        <div className="open-porper-modal">

                          {isMe() && (
                            <span className="top-section">



                              <label className="image-uploader">
                                <img src={thumbnail1} alt="thumbnail" />
                                <input id="upload" type="file"
                                  accept="image/*" onChange={(e) => onInputFileChange(index, e, audio.id)} />
                              </label>


                              <Poper
                                username={username}
                                handleOpen={handleOpen}
                                audioid={audio?.id}
                                audioPictitle={audio?.pictitle}
                                audiourl={audio?.url}
                                FullAudio={audio}
                                media={media}
                                setMedia={setMedia}
                              />

                            </span>
                          )}

                        </div>

                      </div>

                      <div>
                        <h6 className="audio-title" >
                          {
                            // audio.attachedlinkpictitle?.includes('<a') ? <div dangerouslySetInnerHTML={{ __html: audio?.attachedlinkpictitle }}></div> : audio?.pictitle
                            handleReplacetag(audio?.attachedlinkpictitle, audio?.pictitle)

                          }
                          {/* {audio.pictitle?.substr(0, 66) || "Untitled"} */}
                        </h6>
                      </div>

                      <EditModal selectedWordTag={selectedWordTag} hyperLink={hyperLink} sethyperLink={sethyperLink}
                        setselectedWordTag={setselectedWordTag} setPicTitle={setPicTitle} pictitle={pictitle}
                        setInputEditId={setInputEditId} inputEditId={inputEditId}
                        linkId={linkId} setLinkId={setLinkId}
                        saveHandler={saveHandler} openEdit={openEdit} show={openEdit} onClose={handleClose}
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
                      {/* No Audios */}
                    </p>
                  </div>


                )}

            </div>

          </div>
      }

    </div>
  );
}

export default withRouter(Audios);
