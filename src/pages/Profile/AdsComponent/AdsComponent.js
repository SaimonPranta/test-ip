import React, { useEffect, useState } from "react";
import { AdsDiv, Badge } from "./style";

import "./style.scss"
import axios from "axios";
import { BACKEND_URL, PROMOTION_URL } from "../../../shared/constants/Variables";
import { userHeader } from "../../../shared/functions/Token";
import { getUrl } from "../../../shared/functions";


import { connect } from "react-redux";
import store from "../../../store";
import { withRouter } from "react-router-dom";


let TIMEOUT = 30000;

//important note it will need when contry comes from redux 
// {
//   posts,
//   site: {
//     location: { country },
//   }, 
// }
function AdsComponent(posts) {

  const [sideBarAdsData, setSideBarAdsData] = useState([]);
  const [promoteData, setPromoteData] = useState([]);

  useEffect( () => {


    let mount = false;
    if (!mount) {
      sideBarApiHandlers();

    }

    return () => {
      mount = true;
    }
  }, [])


  useEffect(() => {
    let interval = setInterval(async () => {
      await sideBarApiHandlers();
    }, TIMEOUT);
    return () => {
      clearInterval(interval);
    };
  }, []);


// fetch sidebar api from promotion backend
  const sideBarApiHandlers = async () => {
    try {
      const { data } = await axios.get(`${PROMOTION_URL}/add/sidebar-ads`,
        { headers: userHeader() }
      )

      const promoteData = data?.allDoc;
      setPromoteData(promoteData)
      const totalData = await Promise.all(
        promoteData.map(async (item, key) => {
          const { data } = await axios.get(`${BACKEND_URL}/promotion-app/get-media/${item?.postId}`,
            { headers: userHeader() }
          )

          return data?.data;

        }));

      setSideBarAdsData(totalData);
    } catch (error) {
    }
  }


  const [header1, setHeader1] = useState(false);

  const listenScrollEvent = (lengt) => {
    if (window.scrollY < 190) {
      setHeader1(false)
    }
    if (((window.scrollY < 190) && (lengt < 5)) || ((window.scrollY < 190) && (lengt > 5))) {
      return setHeader1(false);
    } else {
      if (window.scrollY > 190 && !(lengt < 5)) {
        return setHeader1(true);
      }
    }


  };

  // here checking posts length
  useEffect(() => {
    let mount = false;
    if (!mount) {
      listenScrollEvent(posts?.posts.length)
    }
    return () => {
      mount = true
    }

  }, [posts?.posts.length]);


  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, [header1]);


  return (
    <div className="Ads-parent"
      style={{
        position: header1 ? "fixed" : "relative",
        top: header1 ? "-9px" : "none",
      }}
    >

      {/* important note our custom  display ads here */}

      {sideBarAdsData.map((item, i) => (
        <a
          key={i}
          href={promoteData[i]?.adUrl}
          target="_blank"
        >

          {
            item?.postType === "photo" ?
              <AdsDiv>
                {" "}
                <Badge>
                  Sponsored
                </Badge>{" "}

                <img
                  className="profile-ads-image"
                  src={getUrl(item?.mediaUrl, promoteData[i]?.userName)}
                  alt={item?.mediaUrl}
                />

                <p

                  style={{
                    textAlign: "center",
                    padding: "0px 10px",
                    backgroundColor: "#fff",
                  }}
                >
                  {promoteData[i]?.adTitle}

                </p>


              </AdsDiv>
              :
              <AdsDiv>
                {" "}
                <Badge>
                  Sponsored
                </Badge>{" "}


                <video src={getUrl(item?.mediaUrl, promoteData[i]?.userName)} autoPlay loop muted className="profile-ads-video">
                  {/* <source src={getUrl(item?.mediaUrl, promoteData[i]?.userName)} /> */}
                </video>

                <p
                  style={{
                    // color: "black",
                    textAlign: "center",
                    padding: "0px 10px",
                    backgroundColor: "#fff",
                  }}
                >
                  {promoteData[i]?.adTitle}
                </p>

              </AdsDiv>
          }

        </a>
      ))}


    </div>
  );
}

export default AdsComponent;

// it will need when contry comes from redux
// export default connect((store) => ({ site: store.site}))(
//   withRouter(AdsComponent)
// );
