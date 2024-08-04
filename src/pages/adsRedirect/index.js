import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import { BACKEND_URL, PROMOTION_URL } from "../../shared/constants/Variables";
import { getUrl } from "../../shared/functions";
import { useParams, useHistory } from "react-router-dom";
import { userHeader } from "../../shared/functions/Token";

const Index = () => {
  const [timer, setTimer] = useState({ min: 14, sec: 60 });
  const [randomNumber, setRandomNumber] = useState(0);
  const [ads, setAds] = useState([]);
  const [intervalFunction] = useState();
  const [info, setInfo] = useState({});
  const [isApproved, setIsApproved] = useState(false);
  const { customLink } = useParams();
  const [query, setQuery] = useState("");
  const history = useHistory();

  useEffect(() => {
    let isExecuted = false
    const queryParams = new URLSearchParams(history.location.search);
    const userQuery = queryParams.get("ref");
    if (userQuery) {
      setQuery(userQuery);
    }



    const handleCallApi = () => {
      if (isExecuted) {
        return
      }
      if (customLink) {
        isExecuted = true
        localStorage.setItem("lastRedirectTime", Date.now());
        axios(`${BACKEND_URL}/shortener/${customLink}`, {
          headers: userHeader(),
        }).then((data) => {
          if (data?.data?.redirect) {
            history.push("/");
          }
          if (data?.data?.data) {
            setInfo(data.data.data);
            axios
              .put(`${BACKEND_URL}/shortener/${data.data.data._id}?userID=${userQuery}`, {
                view: true,
              })
              .then((data2) => { 
                if (data2?.data?.restrictCampaignRedirect) {
                  return history.push("/")
                }
                if (userQuery && data2.data.subID) {
                  const targetUrlFormServer = data.data.data.targetUrl;
                  axios
                    .post(`${BACKEND_URL}/new-reports`, {
                      shortenerID: data.data.data._id,
                      userID: userQuery,
                    })
                    .then(({ data }) => {
                      if (data.redirectTo) {
                        history.push(data.redirectTo);
                      }
                      if (data.user) {
                        // window.location = `${targetUrlFormServer}&s1=${userQuery}`;
                        // window.location = `${targetUrlFormServer}&s1=${data?.user?.username}`;
                      }
                    });
                  // This url with userID
                  window.location = `${targetUrlFormServer}&s1=${data2.data.subID}`;
                  // window.location = `${data.data.data.targetUrl}&s1=${userQuery}`;
                }
              });
          }
        });
      }
    }
    const timeout = setTimeout(handleCallApi, 5000);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   const queryParams = new URLSearchParams(history.location.search);
  //   const userQuery = queryParams.get("ref");
  //   if (userQuery) {
  //     setQuery(userQuery);
  //   }

  //   const previousTime = localStorage.getItem("lastRedirectTime");

  //   const difference = previousTime ? Date.now() - Number(previousTime) : 2000;

  //   if (difference > 1000 && customLink) {
  //     localStorage.setItem("lastRedirectTime", Date.now());
  //     axios(`${BACKEND_URL}/shortener/${customLink}`, {
  //       headers: userHeader(),
  //     }).then((data) => {
  //       if (data?.data?.redirect) {
  //         history.push("/");
  //       }
  //       if (data?.data?.data) {
  //         setInfo(data.data.data);
  //         axios
  //           .put(`${BACKEND_URL}/shortener/${data.data.data._id}`, {
  //             view: true,
  //           })
  //           .then((data2) => {
  //             if (userQuery) {
  //               const targetUrlFormServer = data.data.data.targetUrl;
  //               axios
  //                 .post(`${BACKEND_URL}/new-reports`, {
  //                   shortenerID: data.data.data._id,
  //                   userID: userQuery,
  //                 })
  //                 .then(({ data }) => {
  //                   if (data.redirectTo) {
  //                     history.push(data.redirectTo);
  //                   }
  //                   if (data.user) {
  //                     // This url with username
  //                     // window.location = `${targetUrlFormServer}&s1=${data?.user?.username}`;
  //                   }
  //                 });
  //               // This url with userID
  //               window.location = `${targetUrlFormServer}&s1=${userQuery}`;
  //               // window.location = `${data.data.data.targetUrl}&s1=${userQuery}`;
  //             }
  //           });
  //       }
  //     });
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(history.location.search);
    const userQuery = queryParams.get("ref");
    if (userQuery) {
      setQuery(userQuery);
    }
    handelTimer();

    axios.get(`${PROMOTION_URL}/add/redirect-ads`).then(async (data) => {
      const allData = await Promise.all(
        data?.data?.data.map(async (item) => {
          const data = await axios.get(
            `${BACKEND_URL}/promotion-app/get-redirect-ads-media/${item.postId}`
          );
          return {
            ...data.data.data,
            userName: item.userName,
            adTitle: item.adTitle,
            id: item._id,
            adUrl: item.adUrl,
          };
        })
      );
      const filterAds = allData.filter((item) => item.mediaUrl);
      setAds(filterAds);
    });

    return () => clearInterval(intervalFunction);
  }, []);

  useEffect(() => {
    setRandomNumber(getRandomNumber(1, ads.slice(0, 24).length));
  }, [ads]);

  useEffect(() => {
    if (timer.min === 0) {
      clearInterval(intervalFunction);
      setIsApproved(true);
    }
  }, [timer]);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const handelTimer = () => {
    setInterval(() => {
      setTimer((pre) => {
        if (pre.sec === 0) {
          return {
            min: pre.min - 1,
            sec: 60,
          };
        } else {
          return {
            ...pre,
            sec: pre.sec - 1,
          };
        }
      });
    }, 1000);
  };

  const handleContinue = () => {
    if (isApproved && query) {
      return window.open(`${info.targetUrl}&s1=${query}`, "_blank");
    }
    if (isApproved && !query) {
      return window.open(`${info.targetUrl}`, "_blank");
    }
  };
  const handleAdsClick = (id, url) => {
    setTimeout(() => {
      axios
        .put(`${BACKEND_URL}/shortener/${info._id}`, {
          click: true,
          taskID: id,
        })
        .then((data) => {
          if (data.data.success) {
            setIsApproved(true);
          }
        });
    }, 60000);
    window.open(url, "_blank");
  };

  return (
    <div className="ads-redirect-container">
      <div className="dialog-container">
        <p>Complete any one task & get instant access</p>
      </div>
      <div className="ads-container">
        {ads.slice(0, 24).map((item, index) => {
          return (
            <div
              key={item._id}
              className="main-container"
              onClick={() => handleAdsClick(item.id, item.adUrl)}>
              <div className="sponsored">
                <p>Sponsored</p>
              </div>
              <div className="head">
                <img src={getUrl(item?.mediaUrl, item.userName)} alt="" />
              </div>
              <div className="footer">
                <p>{item.adTitle}</p>

                {randomNumber === index + 1 && (
                  <button
                    onClick={handleContinue}
                    className={` ${!isApproved ? "disable" : ""}`}>
                    <span>Skip</span>
                    {!isApproved && `(${timer.min}:${timer.sec}s)`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
