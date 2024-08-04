import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { RiArrowDownSFill } from "react-icons/ri";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

const fontFamilyName = [
  "cursive",
  "Roboto",
  "arial",
  "-webkit-pictograph",
  "sans-serif",
  "monospace",
];

function TextSize({ setCustomFontFamily, customFontFamily }) {
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
    setCustomFontFamily(singleFont);
    setAnchorEl(null);
  };

  return (
    <div>
      <p
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{ textTransform: "capitalize" }}
      >
        {customFontFamily}
        <RiArrowDownSFill style={{ marginTop: "-4px" }} />
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
            className="optionP"
            onClick={() => {
              fontHandler(singleFont);
            }}
            style={{ padding: "10px", fontSize: "12px" }}
          >
            {singleFont}
          </p>
        ))}
      </Popover>
    </div>
  );
}

export default TextSize;
