import React, { useState, useEffect, useRef } from "react";

import { withRouter } from "react-router-dom";
import axios from "axios";

import { BACKEND_URL } from "../../../shared/constants/Variables";
import { userHeader } from "../../../shared/functions/Token";
import { getUrl } from "../../../shared/functions";
import { getMedia } from "../Hooks";
import Header from "../Header";
import "./style.scss";



import Poper from "./poper";
import EditModal from "./EditModal"
import GridSkeleton from "../../../skeleton/TimelineSkeleton/GridSkeleton";



function Photos({ username, privacy, changePrivacy, isMe, history }) {
    document.title = "Photos";

    const [anchorEl, setAnchorEl] = React.useState(null);



  

    const [edit, setEdit] = useState(null);
    const [openEdit, setOpen] = React.useState(false);
    const [pictitle, setPicTitle] = useState("");
    const [des, setDes] = useState("");
    const [editing, setEditing] = useState(false);


    const [editIconID, setEditIconID] = useState(null);
    const [selectedWordTag, setselectedWordTag] = useState(null);
    const [linkId, setLinkId] = useState("");
    const [hyperLink, sethyperLink] = useState('');
    const [inputEditId, setInputEditId] = useState("");

    // const [modalShow, setModalShow] = React.useState(false);


    // dicstructring
    const { media, counts, working, setMedia } = getMedia(username, "photo");

    function onEdit(id) {
        const e = media.find((i) => i.id === id);
        if (!e) {
            return;
        }
        setEdit(e);
        setPicTitle(e?.pictitle);
        setLinkId(e?.link_id)
    }

    const handleOpen = (customeid, photoPictitle) => {
        setInputEditId(photoPictitle)
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




        setEditing(true);
        const t = pictitle?.trim();
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
                            // i.Picname = d;
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


    const editHandler = (photo) => {
        onEdit(photo);
        setEditIconID(photo);
        setAnchorEl(null);
    };

    const saveHandler = () => {
        setAnchorEl(null);
        onSave();
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
        <>
            <Header
                // counts={albumSelected ? monthWisePic.length : totalMonth + 1}
                counts={media.length}
                title="Photos "
                isMe={isMe}
                privacy={privacy}
                changePrivacy={changePrivacy}
            />
            {working ?

                <div className="profile-photo-container-section">


                    <div className="photos-container-section">
                        {
                            Array.apply(null, new Array(10))?.map((map, index) => (

                                <GridSkeleton key={index} />
                            ))
                        }
                    </div>
                </div >
                :
                <div className="profile-photo-container-section">


                    <div className="photos-container-section">

                        {
                            media.length > 0 ?
                                media.map((photo) => (
                                    <div className="photo-container" key={photo.id} >

                                        <div className="photo-container-box">

                                            {/*  */}
                                            <div style={{ backgroundImage: `url('${getUrl(photo.url, username)}')` }} className="photo-box" >

                                                <div style={{ backgroundColor: "#0008" }}>
                                                    {/* <div style={{ height: "162px" }}> */}
                                                    <div >
                                                        <img onClick={() => history.push(`/${username}/timeline?post=${photo.post}`)} className="photo-tabs-img" alt="img" src={getUrl(photo.url, username)} />
                                                    </div>
                                                </div>

                                                <div className="open-porper-modal">
                                                    {isMe() && (
                                                        <p >

                                                            <Poper
                                                                username={username}
                                                                handleOpen={handleOpen}
                                                                photoid={photo.id}
                                                                photoPictitle={photo?.pictitle}
                                                                photourl={photo.url}
                                                                Fullphoto={photo}
                                                                media={media}
                                                                setMedia={setMedia}
                                                            />
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h6 className="photo-title">
                                                    {
                                                        handleReplacetag(photo?.attachedlinkpictitle, photo?.pictitle)
                                                        // photo.attachedlinkpictitle?.includes('<a') ? <div dangerouslySetInnerHTML={{ __html: photo?.attachedlinkpictitle }}></div> : photo?.pictitle
                                                    }
                                                </h6>
                                            </div>

                                        </div>

                                        <EditModal selectedWordTag={selectedWordTag}
                                            hyperLink={hyperLink} sethyperLink={sethyperLink}
                                            setselectedWordTag={setselectedWordTag} setPicTitle={setPicTitle} pictitle={pictitle}
                                            linkId={linkId} setLinkId={setLinkId}
                                            setInputEditId={setInputEditId} inputEditId={inputEditId} photo={photo}
                                            saveHandler={saveHandler} show={openEdit} openEdit={openEdit} onClose={handleClose}
                                            onHide={() => {
                                                setOpen(false)
                                                setselectedWordTag(null);
                                                sethyperLink('');
                                            }}
                                        />

                                    </div>
                                )
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
                                                color: "#000",
                                            }}
                                        >
                                            {/* No photos */}
                                        </p>
                                    </div>
                                )}
                    </div>

                </div>

            }
        </>
    );
}

export default withRouter(Photos);
