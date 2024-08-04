import React, { useEffect, useState } from "react";
import { AdsDiv, Badge } from "./style";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import classNames from "classnames";


import firstImg from "../../../assets/banner/1.jpg"
import secondImg from "../../../assets/banner/2.jpg"
import thirdImg from "../../../assets/banner/3.jpg"
import fourthImg from "../../../assets/banner/4.jpg"
import fiveImg from "../../../assets/banner/5.jpg"

import "./style.scss"


// const WhiteTextTypography = withStyles({
//   root: {
//     color: "#0048ba",
//     margin: "0px auto",
//   },
// })(Typography);
let timer = 0;
let TIMEOUT = 3000;
function AdsComponentForSearch() {
  const fakeData = [
    {
      name: "Rent/Own $1 Trial",
      ShopLink: "https://www.npmjs.com/package/request-country",
      // banner: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      banner: firstImg,
    },
    {
      name: "IdentityIQ $1 Trial",
      ShopLink:
        "https://www.aptugo.com/?utm_source=materialui&utm_medium=referral",
      banner: secondImg
      // banner:"https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      name: "Credit Scores $1 Trial",
      ShopLink: "https://mui.com/components/badges/",
      banner: thirdImg
      // banner:
      //   "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
    {
      name: "Because $3 Trial",
      ShopLink: "https://mui.com/components/badges/",
      banner: fourthImg
      // banner:
      //   "https://images.unsplash.com/photo-1542959864-4b02e6607fe4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "CHANCE TO WIN $2  TRIAL",
      ShopLink: "https://mui.com/components/badges/",
      banner: fiveImg
      // banner:
      //   "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
  ];
  let timer;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [content, setContent] = React.useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [eventH, setEventH] = useState(true);
  // custome handler
  const MouseHandler = (e, item) => {
    // e.persist();
    setContent(item);

    handleClick(e);
  };

  const [header, setHeader] = useState(0);
  const [header1, setHeader1] = useState(false);

  const listenScrollEvent = () => {
    if (window.scrollY < 190) {
      return setHeader1(false);
    } else {
      if (window.scrollY > 190) {
        return setHeader1(true);
      }
    }
  };

  // here checking posts length


  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, [header1]);

  return (
    <div className="Ads-parent"
      style={{
        // overflow: "hidden",
        marginTop: "5px",
        marginLeft: '25px',
        display: "flex",
        flexDirection: "column",
        textAlignLast: "center",
        // position: "relative",
        // top: "0px",
        position: header1 ? "fixed" : "relative",
        // position: "relative",
        top: header1 ? "20px" : "none",
      }}
    >
      {/* <h3
        style={{
          backgroundColor: "white",
          color: "black",
          margin: "5px 20px 30px",
        }}
        //   onMouseOut={(e) => showWhereClicked(e)}
      >
        Sponsors
      </h3> */}



      {/* {fakeData.map((item, i) => (
        <a
          key={i}
          style={{ color: "black" }}
          href={item.ShopLink}
          target="_blank"
          // onMouseOver={(e) => {
          //   let a = e.currentTarget;
          //   e.persist();
          //   timer = setTimeout(() => {
          //     setAnchorEl(a);
          //   }, 3000);
          //   // );
          // }}
          // onMouseLeave={
          //   (e) => {
          //     clearTimeout(timer);
          //     setAnchorEl(null);
          //   }
          // }
        >
          <AdsDiv
          // onMouseLeave={(e) => {
          // setAnchorEl(null);
          // }}
          // onMouseOut={(e) => {
          //   setAnchorEl(null);
          // }}
          >
            {" "}
            <Badge>
              Ad
            </Badge>{" "}
            <img
              className="profile-ads-image"
              src={item.banner}
              alt={item.name}
            />
            <p
              onMouseEnter={(e) => {
                MouseHandler(e, item);
              }}
              style={{
                color: "black",
                padding: "7px 10px",
                backgroundColor: "#fff",
                // display: "block",
              }}
            >
              {item.name}
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
              <div
                onMouseLeave={(e) => {
                  setAnchorEl(null);
                }}
                style={{
                  width: "25vw",
                  height: "20vh",
                }}
              >
                <Typography
                  variant="h5"
                  // sx={{ p: 2 }}
                  justify="center"
                  align="center"
                >
                  {content.name}
                </Typography>
                <div style={{ width: "100%" }}>
                  <Typography
                    // sx={{ p: 2 }}
                    justify="center"
                    align="center"
                  >
                    {content.name}
                  </Typography>
                </div>
                <div style={{ align: "center" }}>
                  <img
                    // style={{ width: "50%", height: " 50%" }}
                    src={content.banner}
                  />
                </div>
              </div>
            </Popover>
          </AdsDiv>
        </a>
      ))} */}


    </div>
  );
}

export default AdsComponentForSearch;
