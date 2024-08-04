import React from "react";
import { Grid } from "@material-ui/core";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./style.scss";

function FilterYear({ fistDateOfUpload, setAlbumYear, albumYear }) {
  // custome function
  var fulldate = new Date();
  var ThisYear = fulldate.getFullYear();

  var ThisMonth = fulldate.getMonth();
  const addYear = () => {
    ThisYear <= albumYear
      ? setAlbumYear(albumYear)
      : setAlbumYear(albumYear + 1);
  };

  // year selection and disablity
  var yearRestriction = new Date(fistDateOfUpload?.date).getFullYear();

  return (
    <div className="filterDiv">
      <Grid container>
        <Grid xs={1} onClick={() => setAlbumYear(albumYear - 1)}>
          {yearRestriction > albumYear ? (
            <p>
              {" "}
              <IoIosArrowBack />
            </p>
          ) : (
            ""
          )}
        </Grid>
        <Grid xs={10}>
          <div className="filterBox">
            <p>{albumYear}</p>
          </div>
        </Grid>
        <Grid xs={1} onClick={addYear}>
          <p>
            {" "}
            <IoIosArrowForward />
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

export default FilterYear;
