import React, { useState, useContext, useEffect } from "react";
import {
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Public, Lock, People } from "@material-ui/icons";
import axios from "axios";

import { EditNote, ReadNote, } from "./Dialogs";
import { BACKEND_URL } from "../../../shared/constants/Variables";
import { userHeader } from "../../../shared/functions/Token";
import { HoverOver } from "../../../components/Tools";
import { NoteCover } from "../../../assets/profile";
import { When } from "../../../components";
import { getNotes } from "../Hooks";
import Header from "../Header";
import AddNotesModal from "./Modals/AddNotesModal";
import NoteActionPoper from "./Poper/Poper";

import EditModal from "./EditModal";


import { thumbnail, thumbnail1 } from "../../../assets/media";
import GridSkeleton from "../../../skeleton/TimelineSkeleton/GridSkeleton";
import ImagePreview from "./Imagepreview";

export default ({ username, privacy, isMe, changePrivacy }) => {
  document.title = "Notes";
  const [noteModal, setNoteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [anchorElaction, setAnchorElaction] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [readId, setReadId] = useState("");
  const [editId, setEditId] = useState("");
  const [updatedPrivacy, setUpdatedPrivacy] = useState(privacy);
  const [activeId, setActiveId] = useState(null);
  const [pageTotal, setPageTotal] = useState(0);
  const [anchorEl, setAnchorEl] = useState(0);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedWordTag, setselectedWordTag] = useState(null);
  const [hyperLink, sethyperLink] = useState('');
  const [linkId, setLinkId] = useState("");
  const [openEdit, setOpen] = React.useState(false)
  const [edit, setEdit] = useState(null);
  const [title, setTitle] = useState("");
  const [noteName, setNoteName] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [imageIndex, setImageIndex] = useState('');

  const origin = {
    vertical: "top",
    horizontal: "right",
  };

  const { notes, setNotes, counts, noteSortBy, working, setCounts } = getNotes(username, sortBy);





  //Thumb image upload section start

  const previewImage = (file) => {
    if (file) return URL.createObjectURL(file);
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
    formData.append("noteId", id);

    axios.put(
      `${BACKEND_URL}/notes/add-notes-thumbnail`,
      formData,
      {
        headers: userHeader()
      }
    ).then((res) => {
    }).catch(err => {
    })

  }


  //Thumb image upload section end




  function onEdit(id) {


    const e = notes.find((i) => i.id === id);

    if (!e) {
      return;
    }
    setEdit(e);
    setTitle(e?.title);
    setNoteName(e?.name);
    setLinkId(e?.link_id);
  }



  function saveNote(title, note, privacy) {
    setSaving(true);
    axios
      .post(
        `${BACKEND_URL}/profile/notes`,
        { title, note, privacy, date: new Date().toISOString() },
        { headers: userHeader() }
      )
      .then(({ data }) => {
        setNotes([data, ...notes]);
        setSaving(false);
        setAddModal(false);
        setCounts(counts + 1);
      })
      .catch((err) => {
        setSaving(false);
        throw err;
      });
  }
  function editNote(
    id,
    privacyClicked,
    update = {
      privacy: privacyClicked,

      title: null,
      note: null,
    }
  ) {
    setEditing(true);
    axios
      .put(`${BACKEND_URL}/profile/notes/${activeId}`, update, {
        headers: userHeader(),
      })
      .then(() => {
        const newNotes = notes.map((item) => {
          if (item.id === activeId) {
            item = {
              ...item,
              privacy: update.privacy || item.privacy,
              title: update.title || item.title,
              note: update.note || item.note,
            };
          }
          return item;
        });
        setNotes([...newNotes]);
        setEditing(false);
        setAnchorElaction(null);
        setEditModal(false);
      })
      .catch((err) => {
        throw err;
      });
  }


  function deleteNote(noteId) {
    setAnchorEl(null);
    setDeleting(true);
    axios
      .delete(`${BACKEND_URL}/profile/notes/${noteId}`, {
        headers: userHeader(),
      })
      .then(() => {
        const newNotes = notes.filter(({ id }) => id !== noteId);
        setNotes([...newNotes]);
        setDeleteModal(false);
        setDeleting(false);
        setCounts(counts - 1);
      })
      .catch((err) => {
        setDeleting(false);
        throw err;
      });
  }

  // preview
  var myWindow = (url, id) => {

    window.open(`/${url}/${username}/${id}`, "Data", "height=1000,width=2000");
  };
  var dataLimit = 8;
  var pageLimit = 1;
  const [pages] = useState(Math.round(notes.length / dataLimit));
  const totalPage = Math.round(notes.length / dataLimit);

  // pagination section
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }
  function changePageTotal(item) {
    setPageTotal(item);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return notes.slice(startIndex, endIndex);
  };


  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };


  const handleOpen = (customeid) => {
    setOpen(true);
    onEdit(customeid);
    setAnchorEl(null);

  };


  //Modify title with tag
  function saveHandler() {
    if (!edit) {
      return;
    }

    // Here genarating title link for store database start
    const genarateLink = `<a href="${hyperLink}" target="_blank">${selectedWordTag}</a>`;
    const replaceReadyName = noteName.replace(selectedWordTag, genarateLink);

    // Here genarating title link for store database end

    const linkandTag2 = `{${selectedWordTag}: ${hyperLink}}`

    setEditing(true);
    const name = noteName?.trim();
    const link_id = linkId?.trim()

    axios
      .put(
        `${BACKEND_URL}/profile/notes/update-name-with-link/${edit.id}`,
        {
          name: name,
          attachedlinkpictitle: replaceReadyName,
          linkandtag: { selectedWordTag: selectedWordTag, hyperLink: hyperLink },
          link_id: link_id
        },
        { headers: userHeader() }
      )
      .then(() => {
        setNotes(
          notes.map((i) => {
            if (i.id === edit.id) {
              i.name = name;
              i.link_id = link_id;
            }
            return i;
          })
        );
        // close();
        setselectedWordTag(null);
        sethyperLink('');
      })
      .catch((er) => {
        setEditing(false);
        throw er;
      });
    setOpen(false);
  }

  const handleReplacetag = (attachedlinkpictitle, name) => {

    const updateAttachedlinkpictitle = attachedlinkpictitle?.replaceAll("&lt;", "<")

    if (updateAttachedlinkpictitle?.includes('<script')) {
      return;
    } else {
      return updateAttachedlinkpictitle?.includes('<a') ? <div dangerouslySetInnerHTML={{ __html: updateAttachedlinkpictitle }}></div> : name
    }

  }


  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };
  // pagination section

  // array manipulation
  const fontFamily = [
    "Arial",
    "Courier",
    "Garamond",
    "Tahoma",
    "Times",
    "Verdana",
  ];

  const copyItems = [];

  fontFamily.forEach(function (item) {
    copyItems.push(item);
  });


  let Quill = "Quill text";

  // Re-render section when new node added
  useEffect(() => { }, [pageTotal, notes]);





  return (
    <div>
      <Header
        title="Notes"
        counts={counts}
        noteSortBy={noteSortBy}
        privacy={privacy}
        isMe={isMe}
        changePrivacy={changePrivacy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {isMe() && (
        <div>
          <AddNotesModal />
        </div>
      )}

      {
        working ?

          // <Spinner height={10} />

          <div className="profile-note-container-section">

            <div className="note-container-section">
              {
                Array.apply(null, new Array(10))?.map((item, index) => (
                  <GridSkeleton key={index} />
                ))
              }
            </div>
          </div>


          :
          <div className="profile-note-container-section">

            <div className="note-container-section">
              {
                notes.map((note, index) => (
                  <div className="note-container" key={index}>

                    <div className="note-container-box">

                      <div className="note-box" >

                        {/* <img className="image-design"
                          src={(imageIndex === index) ? previewImage(thumbnailImage) : NoteCover}
                          alt={note.title}
                        /> */}

                        <ImagePreview
                          title={note.title}
                          src={(imageIndex === index) ? previewImage(thumbnailImage) : note?.thumbnailImgUrl}
                          onClick={() => {
                            setReadId(note.id);
                            myWindow("view", note?.id);
                          }}
                          NoteCover={NoteCover}
                          username={username}
                          thumbnailImg={note?.thumbnailImg}


                        />

                        <div className="open-porper-modal" >
                          {isMe() && (
                            <span className="top-section" onClick={() => { setSelectedNote(note) }}>

                              <label className="image-uploader">

                                <img src={thumbnail} alt="Camera" />
                                <input id="upload" type="file" style={{ display: 'none' }}
                                  accept="image/*" onChange={(e) => onInputFileChange(index, e, note?.id)} />

                              </label>

                              <NoteActionPoper
                                setAnchorEl={setAnchorEl}
                                anchorEl={anchorEl}
                                username={username}
                                note={selectedNote}
                                noteSelectedId={selectedNote?.id}
                                setEditId={setEditId}
                                setEditModal={setEditModal}
                                isMe={isMe}
                                setDeleteModal={setDeleteModal}
                                editNote={editNote}
                                deleteModal={deleteModal}
                                deleteNote={deleteNote}
                                deleting={deleting}
                                handleOpen={handleOpen}
                              />
                            </span>
                          )}
                          <div className="notes-bottom-section">

                            <p className="time"> <When date={note.date} /> </p>

                            <div className={isMe() ? "active-privacy-section" : "deactive-privacy-section"}>
                              <HoverOver title="Privacy">
                                <div
                                  // className="custompopOver"
                                  onClick={(e) => {
                                    setActiveId(note.id);
                                    setAnchorElaction(e.currentTarget);
                                  }}
                                  // disabled={isMe() ? true : false}
                                 
                                >
                                  {note.privacy === "private" ? (
                                    <Lock />
                                  ) : note.privacy === "friends" ? (
                                    <People />
                                  ) : (
                                    <Public />
                                  )}
                                </div>
                              </HoverOver>

                              <Menu
                                anchorEl={anchorElaction}
                                anchorOrigin={origin}
                                keepMounted
                                transformOrigin={origin}
                                open={!!anchorElaction}
                                onClose={() => setAnchorElaction(null)}
                              >

                                <MenuItem
                                  onClick={() => {
                                    setUpdatedPrivacy("public");
                                    editNote(activeId, "public");
                                  }}
                                >
                                  Public
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    setUpdatedPrivacy("friends");
                                    editNote(activeId, "friends");
                                  }}
                                >
                                  Friends
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    setUpdatedPrivacy("private");
                                    editNote(activeId, "private");
                                  }}
                                >
                                  Only me
                                </MenuItem>
                              </Menu>


                            </div>

                          </div>

                        </div>

                      </div>

                      <div>
                        <h6 className="photo-title">
                          {
                            // note.title
                            //  handleReplacetag(  note?.attachedlinkpictitle)
                            handleReplacetag(note?.attachedlinkpictitle, note?.name)
                          }
                        </h6>
                      </div>

                      <EditModal selectedWordTag={selectedWordTag} setselectedWordTag={setselectedWordTag}
                        hyperLink={hyperLink} sethyperLink={sethyperLink}
                        title={title} setTitle={setTitle} name={noteName} setName={setNoteName} saveHandler={saveHandler}
                        linkId={linkId} setLinkId={setLinkId} show={openEdit} onClose={handleClose}
                        onHide={() => {
                          setOpen(false)
                          setselectedWordTag(null);
                          sethyperLink('');
                        }}

                      />
                    </div>
                  </div>
                ))
              }
            </div>

          </div>
      }




      {/* pagination for pagination */}

      {/* {notes.length === 0 ? (
        <></>
      ) : (
        <div className="pagination">
          <button
            style={{ textAlign: "center", fontSize: "25px", fontWeight: "700" }}
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? "disabled" : ""}`}
          >
            <IoIosArrowBack />
          </button>

          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${currentPage === item ? "active" : null
                }`}
            >
              <span onChange={() => changePageTotal(item)}>{item}</span>
            </button>
          ))}

          <button
            style={{ textAlign: "center", fontSize: "25px", fontWeight: "700" }}
            onClick={goToNextPage}
            className={`next ${currentPage === totalPage ? "disabled" : ""}`}
          >
            <IoIosArrowForward />
          </button>
        </div>
      )} */}


      {/* eikhanei modal open hobe  */}
      <ReadNote
        open={noteModal}
        close={() => {
          setReadId(null);
          setNoteModal(false);
        }}
        id={readId}
        username={username}
      />
      <EditNote
        open={editModal}
        close={() => {
          setEditId(null);
          setEditModal(false);
        }}
        id={editId}
        username={username}
        editing={editing}
        editNote={editNote}
      />
    </div>
  );
};
