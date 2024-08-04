import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";

const useStyles = makeStyles({
  root: {
    width: "100 %",
    padding: "0px 20px",
  },
});

// export default function FontSlider({ setCustomeFontSize }) {
export default function FontSlider({
  setCustomeFontSize,
  singleStory,
  setSingleStory,
  setCustomBackground,
  CustomeFontSize,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(CustomeFontSize);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("fontSize", newValue);
    setCustomeFontSize(newValue);
    setSingleStory({
      ...singleStory,
      fontSize: CustomeFontSize,
    });
  };
  useEffect(() => {}, [CustomeFontSize]);

  return (
    <div
      style={{ marginTop: "18px" }}
      className={("customeFontDiv", classes.root)}
    >
      <Grid container spacing={2}>
        <Slider
          size="small"
          defaultValue={18}
          aria-label="Small"
          valueLabelDisplay="auto"
          value={value}
          onChange={handleChange}
          aria-labelledby="continuous-slider"
        />
      </Grid>
    </div>
  );
}
