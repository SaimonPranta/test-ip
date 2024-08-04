import React, { useEffect, useState } from "react";
import { LinearProgress, withStyles } from "@material-ui/core";
import zxcvbn from "zxcvbn";

const BorderLinearProgress = withStyles(() => ({
  root: {
    height: 5,
    borderRadius: 5,
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "green",
  },
}))(LinearProgress);

export default ({ password, passArr }) => {
  const [score, setScore] = useState(0);
  const [bgColor, setBgColor] = useState("#ca0000");
  useEffect(() => {
    const s = zxcvbn(password, passArr).score;
    if (password.length >= 8) {
      setScore(s + 1);
    } else if (password.length > 12) {
      setScore(0);
    } else {
      setScore(s);
    }
    // eslint-disable-next-line
  }, [password]);
  useEffect(() => {
    if (score === 0) {
      setBgColor("#e5e5e5");
    } else if (score === 1) {
      setBgColor("#f3f300ab");
    } else if (score === 2) {
      setBgColor("#f3f30061");
    } else if (score === 3) {
      setBgColor("#aac7fde8");
    } else if (score === 4) {
      setBgColor("#aac7fd8c");
    }
    // else {
    //   setBgColor("#32ca00");
    // }
  }, [score]);
  return (
    <BorderLinearProgress
      variant="determinate"
      value={score * 20}
      style={{ backgroundColor: bgColor }}
    />
  );
};
