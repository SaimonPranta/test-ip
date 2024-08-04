import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { ContentItem, BottomOption, Poster } from "../style";
import { BACKEND_URL } from "../../../shared/constants/Variables";
import { userHeader } from "../../../shared/functions/Token";
import { getUrl } from "../../../shared/functions";
import { Spinner } from "../../../shared";
import { getMedia } from "../Hooks";
import Header from "../Header";
import "./style.scss";
import MonthWiseGrid from "../Utils/monthWiseGrid";
import FilterYear from "../Utils/FilterYear";
import { makeStyles } from "@material-ui/core/styles";

import Poper from "./poper";
import EditModal from "./EditModal"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Photos({ username, privacy, changePrivacy, isMe, history }) {
  document.title = "Photos";

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  
  // custome function
  var fulldate = new Date();
  var ThisYear = fulldate.getFullYear();
  var ThisMonth = fulldate.getMonth() + 1;
  
  var AlbumNameAndMonthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November	",
    "December",
  ];
  

  const [edit, setEdit] = useState(null);
  const [openEdit, setOpen] = React.useState(false);
  const [pictitle, setPicTitle] = useState("");
  const [des, setDes] = useState("");
  const [editing, setEditing] = useState(false);
  const [albumYear, setAlbumYear] = useState(ThisYear);
  const [totalMonth, setMotalMonth] = useState(0);
  const [albumSelected, setAlbumSelected] = useState(false);
  const [addEditBtn, setAddEditBtn] = useState(false);
  const [editIcon, setEditIcon] = useState(true);
  const [editIconID, setEditIconID] = useState(null);
  const [albInputName, setAlbInputName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWordTag, setselectedWordTag] = useState(null);
  const [hyperLink, sethyperLink] = useState('');

  const [deleteModal, setDeleteModal] = useState(false);
  const [downloadFile, setDownloadFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [totalAlbum, setTotalAlbum] = useState(0);

  const [inputEditId, setInputEditId] = useState("");

  // useEffect(() => { handleOpen(photo.id);}, [])

  const Month = [0];
  for (let SelectMonth = 1; SelectMonth <= totalMonth; SelectMonth++) {
    Month.push(SelectMonth);
  }
  // dicstructring
  const { media, counts, working, setMedia } = getMedia(username, "photo");

  useEffect(() => {
    albumYear < ThisYear ? setMotalMonth(11) : setMotalMonth(ThisMonth);
  }, [
    AlbumNameAndMonthName,
    totalMonth,
    albumYear,
    setAlbumYear,
    setMotalMonth,
  ]);
  
  let downloadRef = useRef();

  function onEdit(id) {
    const e = media.find((i) => i.id === id);
    
    if (!e) {
      return;
    }
    e === editIconID ? setEditIcon(true) : setEditIcon(false);
    setEdit(e);
    setPicTitle(e.pictitle);
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


  const open = Boolean(anchorEl);

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

    const linkandTag2= `{${selectedWordTag}: ${hyperLink}}`

    setEditing(true);
    const t = pictitle.trim();
    const d = des.trim();
    // console.log("d :>> ", pictitle);
    axios
      .put(
        `${BACKEND_URL}/profile/media/title/${edit.id}`,
        { 
          pictitle: t,
          attachedlinkpictitle: replaceReadyTitile,
          linkandtag: linkandTag2
        },
        { headers: userHeader() }
      )
      .then(() => {
        setMedia(
          monthWisePic.map((i) => {
            if (i.id === edit.id) {
              i.pictitle = t;
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
    setEditIcon(true);
  };
  var monthToNum = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November	",
    "December",
  ];


  const numberOfSelectedMonth = monthToNum.indexOf(selectedMonth);

  const monthWisePic = media.filter(
    (singleMonth) =>
      new Date(singleMonth.date).getMonth() === numberOfSelectedMonth
  );

  const fistDateOfUpload = media[0];


  const [AlbumNamewithMonth, setAlbumNamewithMonth] = useState([]);
  useEffect(() => {
    for (var i = 0; i < ThisMonth; i++) {
      // alert(i);
      setAlbumNamewithMonth([...AlbumNamewithMonth, AlbumNameAndMonthName[i]]);
    }
  }, [ThisMonth]);




  return (
    <>
      <Header
        // counts={albumSelected ? monthWisePic.length : totalMonth + 1}

        counts={albumSelected ? monthWisePic.length : totalAlbum}
        title={albumSelected ? "Photos " : `Album `}
        isMe={isMe}
        privacy={privacy}
        changePrivacy={changePrivacy}
      />
      {working && <Spinner height={15} />}

      <div style={{ padding: "10px", color: "black" }} className="">
        {!albumSelected ? (
          <div>
            <MonthWiseGrid
              totalAlbum={totalAlbum}
              setTotalAlbum={setTotalAlbum}
              fistDateOfUpload={fistDateOfUpload}
              setSelectedMonth={setSelectedMonth}
              setAlbumSelected={setAlbumSelected}
              MonthList={AlbumNameAndMonthName}
              ThisMonth={ThisMonth}
            />

            <FilterYear albumYear={albumYear} setAlbumYear={setAlbumYear} />
          </div>
        ) : (
          <div>
            <Grid container>
              <Grid xs={12}>
                {monthWisePic.length > 0 ? (
                  monthWisePic.map((photo) => (
                    <ContentItem
                      style={{
                        display: "flex",
                        borderBottom: "1px solid #e4e4e4",
                        background: "transparent",
                      }}
                      key={photo.id}
                    >
                      <Poster
                        style={{
                          // padding: "10px",
                          position: "relative",
                          background: "transparent",
                          minWidth: "14%",
                          padding: "6px",
                          backgroundColor: "#e4e4e4",
                          margin: "5px 0px ",
                        }}
                        onClick={() =>
                          history.push(
                            `/${username}/timeline?post=${photo.post}`
                          )
                        }
                      >


                      <img className="photo-tabs-img" alt="" src={getUrl(photo.url, username)} />

                      </Poster>
                      <BottomOption style={{ width: "100%" }}>
                        <div
                          className=""
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: "100%",
                          }}
                        >
                          <Grid
                            container
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              height: "100%",
                            }}
                          >
                            <Grid xs={6}>
                              <div
                                className=""
                                style={{
                                  marginTop: "-25px",
                                }}
                              >

                                <h4
                                  onClick={() =>
                                    history.push(
                                      `/${username}/timeline?post=${photo.post}`
                                    )
                                  }
                                  style={{
                                    flex: "1 1 auto",
                                    wordBreak: "break-all",
                                  }}
                                >


                                  {/* //hoverover korle title er chanr korte he eikhan theke   */}
                                  {photo.pictitle?.substr(0, 66) || "Untitled"}


                                </h4>

                                {/* using HTML */}

                                {/* {photo.id !== editIconID || editIcon ? ( */}
                                <p
                                  onClick={() =>
                                    history.push(
                                      `/${username}/timeline?post=${photo.post}`
                                    )
                                  }
                                  style={{
                                    marginTop: "10px",
                                    flex: "1 1 auto",
                                    wordBreak: "break-all",
                                  }}
                                >
                                  {/* //hoverover korle title er chanr korte he eikhan theke   */}
                                  {photo.title?.substr(0, 66) || "Untitled"}

                                </p>
                              </div>
                            </Grid>
                            <Grid xs={6}>
                              <div
                                style={{
                                  textAlignLast: "end",
                                  textAlign: "-webkit-right",
                                }}
                              >
                                {isMe() && (
                                  <p
                                    style={{ width: "58px" }}
                                  >




                                    <Poper
                                      username={username}
                                      handleOpen={handleOpen}
                                      photoid={photo.id}
                                      photoPictitle={photo?.pictitle}
                                      photourl={photo.url}
                                      Fullphoto={photo}

                                    />



    
                                  </p>
                                )}
                              </div>
                            </Grid>
                          </Grid>
                        </div>

                     
                        <EditModal selectedWordTag={selectedWordTag} hyperLink={hyperLink} sethyperLink={sethyperLink} setselectedWordTag={setselectedWordTag} setPicTitle={setPicTitle}  inputEditId={inputEditId} photo={photo} saveHandler={saveHandler } openEdit={openEdit}  classes={classes} onClose={handleClose}/>
                        
                      </BottomOption>
                    </ContentItem>
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
                        color: "#000",
                      }}
                    >
                      No photos
                    </p>
                  </div>
                )}
              </Grid>
            </Grid>



          </div>
        )}
      </div>
    </>
  );
}

export default withRouter(Photos);
