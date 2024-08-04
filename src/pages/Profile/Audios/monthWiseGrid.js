import React, { useState, useEffect } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { IoMdAdd } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import AddMonthButton from "./AddMonthButton";
import SingleAlbum from "./SingleAlbum";

function MonthWiseGrid({
  ThisMonth,
  MonthList,
  setSelectedMonth,
  setAlbumSelected,
  fistDateOfUpload,
}) {
  var fistsMonth = new Date(fistDateOfUpload?.date).getMonth();

  const MonthListUpdated = [];
  

  
  for (let i = fistsMonth; i <= ThisMonth; i++) {
    MonthListUpdated.push(MonthList[i]);
  }
  return (
    <div>
      <div style={{ height: "65vh", overflowY: "scroll" }}>
        <Grid container>
          {MonthListUpdated.map((item) => (
            <SingleAlbum
              setSelectedMonth={setSelectedMonth}
              setAlbumSelected={setAlbumSelected}
              item={item}
            />
          ))}

          {/* <Grid xs={2}>
            <AddMonthButton MonthList={MonthList} />
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
}

export default MonthWiseGrid;
