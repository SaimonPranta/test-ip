import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import { ContentItem, Poster, BottomOption } from "../style";
import { Edit } from "@material-ui/icons";
import { FaSave } from "react-icons/fa";

function ListViewSingle({
  data,
  isMe,
  history,
  setTitle,
  editIconID,
  editIcon,
  getUrl,
  username,
  saveHandler,
  editHandler,
}) {
  return (
    <Grid container>
      <Grid xs={12}>
        {data.map((photo) => (
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
              onClick={() =>
                history.push(`/${username}/timeline?post=${photo.post}`)
              }
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
                      <FaSave onClick={saveHandler} />
                    )}
                  </IconButton>
                )}
              </div>
            </BottomOption>
          </ContentItem>
        ))}
      </Grid>
    </Grid>
  );
}

export default ListViewSingle;
