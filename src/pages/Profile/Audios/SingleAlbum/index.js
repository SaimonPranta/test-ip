import React from "react";
import { Grid } from "@material-ui/core";

import "./style.scss";

function SingleAlbum({ item, setSelectedMonth, setAlbumSelected }) {
  const albumselectedHandler = (item) => {
    setSelectedMonth("September");
    // setSelectedMonth(item);
    setAlbumSelected(true);
    // console.log("item", item);
  };
  return (
    <Grid
      style={{ position: "relative" }}
      xs={2}
      onClick={() => albumselectedHandler(item)}
    >
      <div style={{ paddng: "5px" }} className="">
        <div className="albumDiv">
          <span style={{ fontSize: "18px", fontWeight: "bold", color: "#000" }}>
            {item}
          </span>
        </div>
      </div>
    </Grid>
  );
}

export default SingleAlbum;
