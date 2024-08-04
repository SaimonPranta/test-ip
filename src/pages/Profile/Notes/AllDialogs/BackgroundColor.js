import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { RiArrowDownSFill } from "react-icons/ri";
import { FaPaintBrush } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const fontFamilyName = ["White", "red", "green", "black", "salmon", "yellow"];

function BackgroundColor({ setCustomBackgroundcolor, customBackgroundcolor }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const fontHandler = (singleFont) => {
    setCustomBackgroundcolor(singleFont);
    setAnchorEl(null);
  };

  return (
    <div>
      <p
        style={{
          textDecorationColor: customBackgroundcolor,
          // backgroundColor: "grey",
          textDecorationLine: "underline",
          textTransform: "capitalize",
          fontWeight: "bold",
        }}
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
        // style={{ textTransform: "capitalize" }}
      >
        <FaPaintBrush style={{ marginTop: "-4px" }} />
      </p>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {fontFamilyName.map((singleFont) => (
          <p
            onClick={() => {
              fontHandler(singleFont);
            }}
            style={{
              padding: "10px",

              fontSize: "12px",
            }}
          >
            {singleFont}
          </p>
        ))}
      </Popover>
    </div>
  );
}

export default BackgroundColor;
