// import React, { useState } from "react";
// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import Fade from "@material-ui/core/Fade";

// // arrow/
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

// export default function DropdownCustome({ title, datas }) {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const [selectInput, setSelectInout] = useState(title);
//   const inputsetHandler = (inputData) => {
//     setAnchorEl(null);
//     setSelectInout(inputData);
//   };

//   return (
//     <div>
//       <Button
//         style={{
//           textTransform: "none",
//           borderRadius: "0px",
//           marginTop: "8px",
//           width: "100%",
//         }}
//         aria-controls="fade-menu"
//         aria-haspopup="true"
//         onClick={handleClick}
//       >
//         {title} <ArrowDropDownIcon />
//       </Button>
//       <Menu
//         id="fade-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Fade}
//       >
//         {/* {datas.map((data) => {})} */}
//         <MenuItem onClick={() => inputsetHandler("data")}>{"data"}</MenuItem>
//         <MenuItem onClick={handleClose}>My account</MenuItem>
//         <MenuItem onClick={handleClose}>Logout</MenuItem>
//       </Menu>
//     </div>
//   );
// }

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DropdownCustome({
  mother,
  gender,
  value,
  title,
  datas,
  setMonth,
  setYear,
  setDays,
  monthempty,
}) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  datas.length === 12
    ? setMonth(age)
    : datas.length === 82
    ? setYear(age)
    : setDays(age);

  return (
    <div>
      <FormControl disabled={!mother} className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Hwlo</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>{title}</em>
          </MenuItem>
          {datas.map((data) => (
            <MenuItem value={data}>{data}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
