import React, { useState, useEffect } from "react";
import "./style.scss";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid } from "@material-ui/core";
import DropdownCustome from "./DropdownCustome";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "15%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function FilterCuc({
  setDob,
  setSelectedDayForDeactive,
  mother,
  gender,
  value,
  slelctedyear,
  year,
  setSelectedYear,
  month,
  setSelectedMonth,
  selectedDay,
  setselectedDay,
  setMotherFlag,
  dobYearFlag,
  dobMonthFlag,
  dobDateFlag,
  setGenderFlag,
}) {
  const classes = useStyles();
  const [slelctedmonth, setMonth] = useState("");
  const [dismon, setdismon] = useState(null);
  //   const [slelctedyear, setYear] = useState(0);
  const [day, setDays] = useState("");

  // dynamic date month and years
  const months = [
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
    "November",
    "December",
  ];

  // date year calculation
  var currentTime = new Date();

  // returns the year (four digits)
  var Maxyear = parseInt(currentTime.getFullYear() - 100);
  var Minmyear = parseInt(currentTime.getFullYear() - 18);

  const Years = [];
  //   const days = [1, 2, 3, 45];

  for (let SelectYear = Minmyear; SelectYear > Maxyear; SelectYear--) {
    Years.push(SelectYear);
  }

  //   conver month to month number
  let slelctedmonthToString = slelctedmonth.toLowerCase();
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

  slelctedmonthToString = monthToNum.indexOf(slelctedmonthToString);

  const daysCount = daysInMonth(slelctedmonthToString, slelctedyear);
  const days = [];
  for (let SelectYear = 1; SelectYear <= daysCount + 1; SelectYear++) {
    days.push(SelectYear);
  }

  // days count
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  // // console.log("month year", daysInMonth(2, slelctedyear));
  // // console.log("slelctedmonth", typeof slelctedmonth);
  // // console.log("slelctedyear", typeof slelctedyear);

  //   month changer
  const handleChange = (event) => {
    setMonth(event.target.value);
  };
  //   const handleChangeDay = (event) => {
  //     // setDays(event.target.value);
  //   };
  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [monthDis, setMonthDis] = React.useState("");

  // refactoring code
  // const [year, setYear] = React.useState("");
  // const [month, setSelectedMonth] = React.useState("");
  // const [selectedDay, setselectedDay] = React.useState("");

  // refactoring code

  const handleChange1 = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  useEffect(() => {
    // alert(slelctedmonth);
  }, [slelctedmonth]);

  const handledaysetup = (e) => {
    setSelectedDayForDeactive(e.target.value);
    setselectedDay(e.target.value);
    setGenderFlag(false);
  };

  return (
    <div
      onClick={(e) => setDob("03/08/2021")}
      className="inp_info datrFIlter riiir"
      style={{
        width: "2%",
        border: "2px dotted #d8d8d8",
        padding: "auto 10px",

        justifyContent: "space-around",
        display: "flex",
      }}>
      <Grid container spacing={0}>
        <Grid
          disabled
          style={{ alignItems: "center", display: "flex" }}
          item
          xs={4}>
          <InputLabel placeholder="Year" id="demo-controlled-open-select-label">
            {year === "" ? "Year" : year}
          </InputLabel>

          <FormControl
            disabled={!mother || dobYearFlag}
            className={classes.formControl}>
            {/* <FormControl disabled={dobYearFlag} className={classes.formControl}> */}

            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={"sadasd"}
              // disabled={!mother}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setMotherFlag(true);
              }}>
              {/* <MenuItem disabled value="">
                <em>Year</em>
              </MenuItem> */}
              {Years.map((data) => (
                <MenuItem value={data}>{data}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid style={{ alignItems: "center", display: "flex" }} item xs={4}>
          <InputLabel id="demo-controlled-open-select-label">
            {month === "" ? "Month" : month}
          </InputLabel>
          <FormControl
            disabled={!year || dobMonthFlag}
            className={classes.formControl}>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open1}
              onClose={handleClose1}
              onOpen={handleOpen1}
              value={20}
              onChange={(e) => setSelectedMonth(e.target.value)}>
              {/* <MenuItem disabled value="">
                <em>Month</em>
              </MenuItem> */}

              {monthToNum.map((data) => (
                <MenuItem value={data}>{data}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          disabled={!slelctedmonth}
          style={{ alignItems: "center", display: "flex" }}
          item
          xs={4}>
          <InputLabel id="demo-controlled-open-select-label">
            {selectedDay === "" ? "Day" : selectedDay}
          </InputLabel>
          {/* <FormControl disabled={!month} className={classes.formControl}> */}
          <FormControl
            disabled={!month || dobDateFlag}
            className={classes.formControl}>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open2}
              onClose={handleClose2}
              onOpen={handleOpen2}
              value={""}
              onChange={handledaysetup}>
              {/* <MenuItem style={{ background: "transparent" }}  disabled value="">
                <em>Day</em>
              </MenuItem> */}
              {days.map((data) => (
                <MenuItem value={data}>{data}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default FilterCuc;
