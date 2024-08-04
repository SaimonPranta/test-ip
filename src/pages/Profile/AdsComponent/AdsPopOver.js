import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";

export default function AdsPopOver({tabs}) {

  // custome states 
  const [selectdName, setSelectedName ] = React.useState("Link name")
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {

    // const fatchedData;
    axios.get("/adsPopOver", (req, res) => {
      detailedData = req.body
    })

  }, [selectName ])

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Ads Hover
      </Button>
    </div>
  );
}
