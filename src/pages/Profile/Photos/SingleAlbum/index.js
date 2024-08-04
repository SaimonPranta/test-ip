import React from "react";
import { Grid } from "@material-ui/core";

import "./style.scss";
import { Link } from "react-router-dom";

function SingleAlbum({ item, setSelectedMonth, setAlbumSelected }) {
  
  console.log("item", item);
  
  const albumselectedHandler = (item) => {
    setSelectedMonth(item);
    setAlbumSelected(true);
  };
  return (
    <Grid
      style={{ position: "relative" }}
      xs={2}
      onClick={() => albumselectedHandler(item)}
    >
      <div style={{ paddng: "5px" }} className="">
        <div className="albumDiv">
          <span
            style={{ fontSize: "18px", fontWeight: "bold", color: "black" }}
          >
            {item}
          </span>
        </div>
      </div>
    </Grid>
  );
}

export default SingleAlbum;
