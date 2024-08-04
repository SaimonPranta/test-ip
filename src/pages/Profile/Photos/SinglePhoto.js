import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { getUrl } from "../../../shared/functions";
import { BottomOption, ContentItem, Poster } from "../style";

function SinglePhoto({ history, isMe, username, photo }) {
  const [edit, setEdit] = useState(null);
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);
  const [albumYear, setAlbumYear] = useState(ThisYear);
  const [totalMonth, setMotalMonth] = useState(0);
  const [albumSelected, setAlbumSelected] = useState(false);
  const [addEditBtn, setAddEditBtn] = useState(false);
  const [editIcon, setEditIcon] = useState(true);
  const [editIconID, setEditIconID] = useState(null);
  const [albInputName, setAlbInputName] = useState("");

  const editHandler = (photo) => {
    onEdit(photo);
    setEditIconID(photo);
    // alert(photo);
  };
  const saveHandler = () => {
    onSave();
    setEditIcon(true);
  };

  const something = (event) => {
    if (event.keyCode === 13) {
      // console.log("enter");
      onSave();
      setEditIcon(true);
    }
  };
  return (
    <ContentItem
      style={{
        display: "flex",
        // justifyContent: "space-between",
        borderBottom: "1px solid #e4e4e4",
      }}
      key={photo.id}
    >
      <Poster
        style={{
          padding: "20px",
          backgroundColor: "transparent",
          position: "relative",
        }}
        onClick={() => history.push(`/${username}/timeline?post=${photo.post}`)}
      >
        <img alt="" src={getUrl(photo.url, username)} />
      </Poster>
      <BottomOption style={{ width: "84%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* <HoverOver title={photo.title?.substr(0, 128)}> */}
          {/* {photo.id !== editIconID || editIcon ? ( */}
          {photo.id !== editIconID || editIcon ? (
            <p
              style={{
                flex: "1 1 auto",
                wordBreak: "break-all",
              }}
            >
              {/* //hoverover korle title er chanr korte he eikhan theke   */}
              {photo.title?.substr(0, 66) || "Untitled"}
            </p>
          ) : (
            <input
              maxLength="66"
              type="text"
              style={{
                width: "80%",
                border: "1px solid #e4e4e4",
                height: "25px",
                padding: "0px 5px 0px",
                borderRadius: "4px",
              }}
              Value={photo.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          {/* </HoverOver> */}
          {isMe() && (
            <IconButton
            // onClick={() => onEdit(photo.id)}
            >
              {photo.id !== editIconID || editIcon ? (
                <Edit onClick={() => editHandler(photo.id)} />
              ) : (
                <FaSave onKeyDown={(e) => something(e)} onClick={saveHandler} />
              )}
            </IconButton>
          )}
        </div>
        <p
          style={{
            flex: "1 1 auto",
            wordBreak: "break-all",
            padding: "10px 0px",
          }}
        >
          {/* //hoverover korle title er chanr korte he eikhan theke   */}
          {(photo.name, photo.title?.substr(0, 66) || "Untitled")}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p>Like (25) </p>
          <p>Comment (4) </p>
          <p>Share (0) </p>
        </div>
      </BottomOption>
    </ContentItem>
  );
}

export default SinglePhoto;
