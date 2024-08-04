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
import SingleAlbum from "../Photos/SingleAlbum";
import { IoMdAdd } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import AddMonthButton from "./AddMonthButton";

function MonthWiseGrid({
  fistDateOfUpload,
  ThisMonth,
  MonthList,
  setSelectedMonth,
  setAlbumSelected,
  totalAlbum,
  setTotalAlbum,
}) {


  var fistsMonth = new Date(fistDateOfUpload?.date).getMonth();

  const MonthListUpdated = [];
  var total = 0;

  for (let i = fistsMonth; i < ThisMonth; i++) {
    MonthListUpdated.push(MonthList[i]);
    total = total + 1;
  }
  useEffect(() => {
    setTotalAlbum(total);
  }, [totalAlbum]);
  setTotalAlbum();

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
