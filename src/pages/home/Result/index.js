/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import { Avatar, Button, Menu, MenuItem, Typography } from "@material-ui/core";
import axios from "axios";

import {
  WebIcon,
  PostIcon,
  ImageIcon,
  AudioIcon,
  VideoIcon,
  NoteIcon,
  CampaignsIcon,
  JobsIcon,
  StoreIcon,
  InvestorIcon,
} from "../../../assets/search";

import InfiniteScroll from "react-infinite-scroll-component";

import { BACKEND_URL } from "../../../shared/constants/Variables";
import { getUserAvatar, getUrl } from "../../../shared/functions";
import "./style.scss";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";

import Photos from "./Photos";
import Audios from "./Audios";
import Videos from "./Videos";
import Notes from "./Notes";
import Campaign from "./Campaign";
import HomeSearchGrid from "../../../skeleton/HomeSearch/HomeSearchGrid";
import PostAndWebSkeleton from "../../../skeleton/HomeSearch/PostAndWebSkeleton";
import ContactualPromotionAds from "./ads/contactual/ContactualPromotoinAds";
import Jobs from "./Jobs";
import Store from "./Stores/Store";
import Stores from "./Stores";
import Investors from "./Investors";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ loggedIn, tab, setTab, query, country }) => {
  const [results, setResults] = useState([]);
  const [working, setWorking] = useState(false);
  const [screen, setScreen] = useState(window.innerWidth < 600);
  const [menu, setMenu] = useState(null);
  const [offset, setOffset] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [ishegiht, setIsheight] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreen(window.innerWidth < 600);
    });
  }, []);

  useEffect(() => {
    if (!!query) {
      setWorking(true);
      setResults([]);
      setTotalData(0);
      setHasMore(true);
      setIsheight(false);

      axios
        .get(
          `${BACKEND_URL}/search/${tab}/?q=${query}&offset=${offset}&country=${country}`
        )
        .then(({ data }) => {
          setResults(data?.data);
          setWorking(false);
          let page = Math.floor(data?.totaldata / 5);
          setTotalData(page);
        })
        .catch((err) => {
          setWorking(false);
          throw err;
        });
    }
  }, [tab, query]);

  const fetchMoreData = () => {
    /* here we need to change height={60} */

    if (totalData <= offset / 5) {
      setHasMore(false);
      return;
    } else {
      let temp = offset + 5;
      setIsheight(true);
      setOffset(temp);
      loadData(temp);
      // loadData();
    }
  };

  const loadData = (currentOffset) => {
    axios
      .get(
        `${BACKEND_URL}/search/${tab}/?q=${query}&offset=${currentOffset}&country=${country}`
      )
      // .get(`${BACKEND_URL}/search/${tab}/?q=${query}&offset=${offset}`)
      .then(({ data }) => {
        setResults(results.concat(data?.data));
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  };

  function switchTab(n) {
    setResults([]);
    setTab(n);
  }

  //calling history from react router
  const history = useHistory();

  return (
    <div className="sTab ">
      <figure className="tabs">
        <label
          className={tab === "web" ? "active" : ""}
          onClick={() => {
            tab === "web" ? "" : switchTab("web");
            setOffset(0);
          }}
        >
          <img src={WebIcon} alt="" />
          Web
        </label>

        <label
          className={tab === "posts" ? "active" : ""}
          onClick={() => {
            tab === "posts" ? "" : switchTab("posts");
            setOffset(0);
          }}
        >
          <img src={PostIcon} alt="" />
          Posts
        </label>

        <label
          className={tab === "images" ? "active" : ""}
          onClick={() => {
            tab === "images" ? "" : switchTab("images");
            setOffset(0);
          }}
        >
          <img src={ImageIcon} alt="" />
          Images
        </label>

        {!screen ? (
          <>
            <label
              className={tab === "audios" ? "active" : ""}
              onClick={() => {
                tab === "audios" ? "" : switchTab("audios");
                setOffset(0);
              }}
            >
              <img src={AudioIcon} alt="" />
              Audios
            </label>

            <label
              className={tab === "videos" ? "active" : ""}
              onClick={() => {
                tab === "videos" ? "" : switchTab("videos");
                setOffset(0);
              }}
            >
              <img src={VideoIcon} alt="" />
              Videos
            </label>

            <label
              className={tab === "notes" ? "active" : ""}
              onClick={() => {
                tab === "notes" ? "" : switchTab("notes");
                setOffset(0);
              }}
            >
              <img src={NoteIcon} alt="" />
              Notes
            </label>
            <label
              className={tab === "campaigns" ? "active" : ""}
              onClick={() => {
                tab === "campaigns" ? "" : switchTab("campaigns");
                setOffset(0);
              }}
            >
              <img src={CampaignsIcon} alt="" />
              Campaigns
            </label>
            <label
              className={tab === "jobs" ? "active" : ""}
              onClick={() => {
                tab === "jobs" ? "" : switchTab("jobs");
                setOffset(0);
              }}
            >
              <img src={JobsIcon} alt="" />
              Jobs
            </label>
            <label
              className={tab === "store" ? "active" : ""}
              onClick={() => {
                tab === "store" ? "" : switchTab("store");
                setOffset(0);
              }}
            >
              <img src={StoreIcon} alt="" />
              Store
            </label>
            <label
              className={tab === "investor" ? "active" : ""}
              onClick={() => {
                tab === "investor" ? "" : switchTab("investor");
                setOffset(0);
              }}
            >
              <img src={InvestorIcon} alt="" />
              Investor
            </label>
          </>
        ) : (
          <label
            ref="menuCont"
            className={
              tab === "audios" || tab === "videos" || tab === "others"
                ? "active"
                : ""
            }
          >
            <button
              className="more-btn"
              onClick={(e) => setMenu(e.currentTarget)}
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </label>
        )}
      </figure>

      <Menu open={!!menu} anchorEl={menu} onClose={() => setMenu(null)}>
        <MenuItem
          className={tab === "audios" ? "active" : ""}
          onClick={() => {
            setMenu(null);
            switchTab("audios");
          }}
        >
          <img src={AudioIcon} alt="audios" />
          Audios
        </MenuItem>

        <MenuItem
          className={tab === "videos" ? "active" : ""}
          onClick={() => {
            setMenu(null);
            switchTab("videos");
          }}
        >
          <img src={VideoIcon} alt="videos" />
          Videos
        </MenuItem>

        <MenuItem
          className={tab === "others" ? "active" : ""}
          onClick={() => {
            setMenu(null);
            switchTab("others");
          }}
        >
          <img src={NoteIcon} alt="others" />
          Notes
        </MenuItem>
      </Menu>

      {
        <Grid container>
          <Grid xs={12}>
            <div>
              {tab === "web" ? (
                working ? (
                  <div className="post-and-web-skeleton-homesearch-section">
                    {Array.apply(null, new Array(10))?.map((item, index) => (
                      <PostAndWebSkeleton key={index} />
                    ))}
                  </div>
                ) : results?.length < 1 ? (
                  <div className="nores fadeIn">
                    {/* <Contactual input={query} /> */}

                    <span>
                      <p>
                        Your search - <strong>{query}</strong> - did not match
                        any <strong>{tab}</strong>.
                      </p>
                      <div className="sug">Suggetions:</div>
                      <ul>
                        <li>Make sure that all words are splled correctly.</li>
                        <li>Try different keywords.</li>
                        <li>Try more general keywords.</li>
                        <li>Try fewer keywords.</li>
                      </ul>
                    </span>
                  </div>
                ) : (
                  <div id="scrollableDiv" className="post-and-web-section">
                    {/* <div className="post-and-web-section"> */}

                    <InfiniteScroll
                      dataLength={results?.length || 0}
                      next={fetchMoreData}
                      hasMore={hasMore}
                      scrollableTarget="scrollableDiv"
                    >
                      {results?.map((item, i) =>
                        item?.adStatus ? (
                          <div className="rsgal fadeIn" key={i}>
                            <ContactualPromotionAds
                              item={item}
                              loggedIn={loggedIn}
                            />
                          </div>
                        ) : (
                          <div className="rsgal fadeIn" key={i}>
                            <Button
                              onClick={() => {
                                if (loggedIn) {
                                  history.push(`/${item.user.username}`);
                                } else {
                                  history.push("/signup");
                                }
                              }}
                            >
                              <Avatar
                                style={{ border: "1px solid #0009" }}
                                alt=""
                                src={getUserAvatar(
                                  item.user.avatar,
                                  item.user.gender,
                                  item.user.username
                                )}
                              />
                            </Button>

                            <ul>
                              {item.links.map((l, i) => (
                                <li key={i}>
                                  <a href={l} target="blank">
                                    {l}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </InfiniteScroll>
                  </div>
                )
              ) : tab === "posts" ? (
                working ? (
                  <div className="post-and-web-skeleton-homesearch-section">
                    {Array.apply(null, new Array(10))?.map((item, index) => (
                      <PostAndWebSkeleton key={index} />
                    ))}
                  </div>
                ) : results?.length < 1 ? (
                  <div className="nores fadeIn">
                    {/* <Contactual input={query} /> */}

                    <span>
                      <p>
                        Your search - <strong>{query}</strong> - did not match
                        any <strong>{tab}</strong>.
                      </p>
                      <div className="sug">Suggetions:</div>
                      <ul>
                        <li>Make sure that all words are splled correctly.</li>
                        <li>Try different keywords.</li>
                        <li>Try more general keywords.</li>
                        <li>Try fewer keywords.</li>
                      </ul>
                    </span>
                  </div>
                ) : (
                  <div id="scrollableDiv" className="post-and-web-section">
                    <InfiniteScroll
                      dataLength={results?.length || 0}
                      hasMore={hasMore}
                      next={fetchMoreData}
                      scrollableTarget="scrollableDiv"
                    >
                      {results.map((item, i) =>
                        item?.adStatus ? (
                          <div className="rsgal fadeIn" key={i}>
                            <ContactualPromotionAds
                              item={item}
                              loggedIn={loggedIn}
                            />
                          </div>
                        ) : (
                          <div className="rsgal fadeIn" key={i}>
                            <Button
                              onClick={() => {
                                if (loggedIn) {
                                  history.push(`/${item.user.username}`);
                                } else {
                                  history.push("/signup");
                                }
                              }}
                            >
                              <Avatar
                                alt="profileImage"
                                src={getUserAvatar(
                                  item.user.avatar,
                                  item.user.gender,
                                  item.user.username
                                )}
                              />
                            </Button>
                            <Content content={item.content} />
                          </div>
                        )
                      )}
                    </InfiniteScroll>
                  </div>
                )
              ) : tab === "images" ? (
                working ? (
                  // <Spinner height={30} />

                  // skeleton here.
                  <div className="skeleton-grid-for-homesearch-section">
                    <div className="skeleton-grid-for-homesearch">
                      {Array.apply(null, new Array(10))?.map((item, index) => (
                        <HomeSearchGrid key={index} />
                      ))}
                    </div>
                  </div>
                ) : results?.length < 1 ? (
                  <div className="nores fadeIn">
                    {/* <Contactual input={query} /> */}

                    <span>
                      <p>
                        Your search - <strong>{query}</strong> - did not match
                        any <strong>{tab}</strong>.
                      </p>
                      <div className="sug">Suggetions:</div>
                      <ul>
                        <li>Make sure that all words are splled correctly.</li>
                        <li>Try different keywords.</li>
                        <li>Try more general keywords.</li>
                        <li>Try fewer keywords.</li>
                      </ul>
                    </span>
                  </div>
                ) : (
                  <div
                    id="scrollableDiv"
                    className={
                      ishegiht
                        ? "home-sections-image-infinite-scroll-2nd-hit"
                        : "home-sections-image-infinite-scroll"
                    }
                  >
                    <InfiniteScroll
                      dataLength={results?.length || 0}
                      hasMore={hasMore}
                      next={fetchMoreData}
                      scrollableTarget="scrollableDiv"
                    >
                      <Photos
                        loggedIn={loggedIn}
                        photos={results}
                        search={query}
                      />
                    </InfiniteScroll>
                  </div>
                )
              ) : tab === "audios" ? (
                working ? (
                  // skeleton here.
                  <div className="skeleton-grid-for-homesearch-section">
                    <div className="skeleton-grid-for-homesearch">
                      {Array.apply(null, new Array(10))?.map((item, index) => (
                        <HomeSearchGrid key={index} />
                      ))}
                    </div>
                  </div>
                ) : results?.length < 1 ? (
                  <div className="nores fadeIn">
                    {/* <Contactual input={query} /> */}

                    <span>
                      <p>
                        Your search - <strong>{query}</strong> - did not match
                        any <strong>{tab}</strong>.
                      </p>
                      <div className="sug">Suggetions:</div>
                      <ul>
                        <li>Make sure that all words are splled correctly.</li>
                        <li>Try different keywords.</li>
                        <li>Try more general keywords.</li>
                        <li>Try fewer keywords.</li>
                      </ul>
                    </span>
                  </div>
                ) : (
                  <div
                    id="scrollableDiv"
                    className={
                      ishegiht
                        ? "home-sections-image-infinite-scroll-2nd-hit"
                        : "home-sections-audio-infinite-scroll"
                    }
                  >
                    <InfiniteScroll
                      dataLength={results?.length || 0}
                      hasMore={hasMore}
                      next={fetchMoreData}
                      scrollableTarget="scrollableDiv"
                    >
                      <Audios
                        loggedIn={loggedIn}
                        audios={results}
                        search={query}
                      />
                    </InfiniteScroll>
                  </div>
                )
              ) : tab === "videos" ? (
                working ? (
                  // skeleton here.
                  <div className="skeleton-grid-for-homesearch-section">
                    <div className="skeleton-grid-for-homesearch">
                      {Array.apply(null, new Array(10))?.map((item, index) => (
                        <HomeSearchGrid key={index} />
                      ))}
                    </div>
                  </div>
                ) : results?.length < 1 ? (
                  <div className="nores fadeIn">
                    {/* <Contactual input={query} /> */}

                    <span>
                      <p>
                        Your search - <strong>{query}</strong> - did not match
                        any <strong>{tab}</strong>.
                      </p>
                      <div className="sug">Suggetions:</div>
                      <ul>
                        <li>Make sure that all words are splled correctly.</li>
                        <li>Try different keywords.</li>
                        <li>Try more general keywords.</li>
                        <li>Try fewer keywords.</li>
                      </ul>
                    </span>
                  </div>
                ) : (
                  <div
                    id="scrollableDiv"
                    className={
                      ishegiht
                        ? "home-sections-image-infinite-scroll-2nd-hit"
                        : "home-sections-audio-infinite-scroll"
                    }
                  >
                    <InfiniteScroll
                      dataLength={results?.length || 0}
                      hasMore={hasMore}
                      next={fetchMoreData}
                      scrollableTarget="scrollableDiv"
                    >
                      <Videos
                        loggedIn={loggedIn}
                        videos={results}
                        search={query}
                      />
                    </InfiniteScroll>
                  </div>
                )
              ) : tab === "notes" ? (
                working ? (
                  // skeleton here.
                  <div className="skeleton-grid-for-homesearch-section">
                    <div className="skeleton-grid-for-homesearch">
                      {Array.apply(null, new Array(10))?.map((item, index) => (
                        <HomeSearchGrid key={index} />
                      ))}
                    </div>
                  </div>
                ) : results?.length < 1 ? (
                  <div className="nores fadeIn">
                    {/* <Contactual input={query} /> */}

                    <span>
                      <p>
                        Your search - <strong>{query}</strong> - did not match
                        any <strong>{tab}</strong>.
                      </p>
                      <div className="sug">Suggetions:</div>
                      <ul>
                        <li>Make sure that all words are splled correctly.</li>
                        <li>Try different keywords.</li>
                        <li>Try more general keywords.</li>
                        <li>Try fewer keywords.</li>
                      </ul>
                    </span>
                  </div>
                ) : (
                  <div
                    id="scrollDiv"
                    className={
                      ishegiht
                        ? "home-sections-image-infinite-scroll-2nd-hit"
                        : "home-sections-audio-infinite-scroll"
                    }
                  >
                    <InfiniteScroll
                      dataLength={results?.length || 0}
                      next={fetchMoreData}
                      hasMore={hasMore}
                      scrollableTarget="scrollDiv"
                    >
                      <Notes
                        loggedIn={loggedIn}
                        notes={results}
                        search={query}
                      />
                    </InfiniteScroll>
                  </div>
                )
              ) : tab === "campaigns" ? (
                working ? (
                  // skeleton here.
                  <div className="skeleton-grid-for-homesearch-section">
                    <div className="skeleton-grid-for-homesearch">
                      {Array.apply(null, new Array(10))?.map((item, index) => (
                        <HomeSearchGrid key={index} />
                      ))}
                    </div>
                  </div>
                ) : results?.length < 1 ? (
                  <div className="nores fadeIn">
                    {/* <Contactual input={query} /> */}

                    <span>
                      <p>
                        Your search - <strong>{query}</strong> - did not match
                        any <strong>{tab}</strong>.
                      </p>
                      <div className="sug">Suggetions:</div>
                      <ul>
                        <li>Make sure that all words are splled correctly.</li>
                        <li>Try different keywords.</li>
                        <li>Try more general keywords.</li>
                        <li>Try fewer keywords.</li>
                      </ul>
                    </span>
                  </div>
                ) : (
                  <div
                    id="scrollDiv"
                    className={
                      ishegiht
                        ? "home-sections-image-infinite-scroll-2nd-hit"
                        : "home-sections-audio-infinite-scroll"
                    }
                  >
                    <InfiniteScroll
                      dataLength={results?.length || 0}
                      next={fetchMoreData}
                      hasMore={hasMore}
                      scrollableTarget="scrollDiv"
                    >
                      <Campaign
                        loggedIn={loggedIn}
                        campaigns={results}
                        search={query}
                      />
                    </InfiniteScroll>
                  </div>
                )
              ) : tab === "jobs" ? (
                working ? (
                  <div className="skeleton-grid-for-homesearch-section">
                    <div className="skeleton-grid-for-homesearch">
                      {Array.apply(null, new Array(10))?.map((item, index) => (
                        <HomeSearchGrid key={index} />
                      ))}
                    </div>
                  </div>
                ) : results?.length < 1 ? (
                  <div className="nores fadeIn">
                    {/* <Contactual input={query} /> */}

                    <span>
                      <p>
                        Your search - <strong>{query}</strong> - did not match
                        any <strong>{tab}</strong>.
                      </p>
                      <div className="sug">Suggetions:</div>
                      <ul>
                        <li>Make sure that all words are splled correctly.</li>
                        <li>Try different keywords.</li>
                        <li>Try more general keywords.</li>
                        <li>Try fewer keywords.</li>
                      </ul>
                    </span>
                  </div>
                ) : (
                  <div
                    id="scrollDiv"
                    className={
                      ishegiht
                        ? "home-sections-image-infinite-scroll-2nd-hit"
                        : "home-sections-audio-infinite-scroll"
                    }
                  >
                    <InfiniteScroll
                      dataLength={results?.length || 0}
                      next={fetchMoreData}
                      hasMore={hasMore}
                      scrollableTarget="scrollDiv"
                    >
                      <Jobs loggedIn={loggedIn} jobs={results} search={query} />
                    </InfiniteScroll>
                  </div>
                )
              ) : tab === "store" ? (
                working ? (
                  <div className="skeleton-grid-for-homesearch-section">
                    <div className="skeleton-grid-for-homesearch">
                      {Array.apply(null, new Array(10))?.map((item, index) => (
                        <HomeSearchGrid key={index} />
                      ))}
                    </div>
                  </div>
                ) : results?.length < 1 ? (
                  <div className="nores fadeIn">
                    {/* <Contactual input={query} /> */}

                    <span>
                      <p>
                        Your search - <strong>{query}</strong> - did not match
                        any <strong>{tab}</strong>.
                      </p>
                      <div className="sug">Suggetions:</div>
                      <ul>
                        <li>Make sure that all words are splled correctly.</li>
                        <li>Try different keywords.</li>
                        <li>Try more general keywords.</li>
                        <li>Try fewer keywords.</li>
                      </ul>
                    </span>
                  </div>
                ) : (
                  <div
                    id="scrollDiv"
                    className={
                      ishegiht
                        ? "home-sections-image-infinite-scroll-2nd-hit"
                        : "home-sections-audio-infinite-scroll"
                    }
                  >
                    <InfiniteScroll
                      dataLength={results?.length || 0}
                      next={fetchMoreData}
                      hasMore={hasMore}
                      scrollableTarget="scrollDiv"
                    >
                      <Stores
                        loggedIn={loggedIn}
                        stores={results}
                        search={query}
                      />
                    </InfiniteScroll>
                  </div>
                )
              ) : tab === "investor" ? (
                working ? (
                  <div className="skeleton-grid-for-homesearch-section">
                    <div className="skeleton-grid-for-homesearch">
                      {Array.apply(null, new Array(10))?.map((item, index) => (
                        <HomeSearchGrid key={index} />
                      ))}
                    </div>
                  </div>
                ) : results?.length < 1 ? (
                  <div className="nores fadeIn">
                    {/* <Contactual input={query} /> */}

                    <span>
                      <p>
                        Your search - <strong>{query}</strong> - did not match
                        any <strong>{tab}</strong>.
                      </p>
                      <div className="sug">Suggetions:</div>
                      <ul>
                        <li>Make sure that all words are splled correctly.</li>
                        <li>Try different keywords.</li>
                        <li>Try more general keywords.</li>
                        <li>Try fewer keywords.</li>
                      </ul>
                    </span>
                  </div>
                ) : (
                  <div
                    id="scrollDiv"
                    className={
                      ishegiht
                        ? "home-sections-image-infinite-scroll-2nd-hit"
                        : "home-sections-audio-infinite-scroll"
                    }
                  >
                    <InfiniteScroll
                      dataLength={results?.length || 0}
                      next={fetchMoreData}
                      hasMore={hasMore}
                      scrollableTarget="scrollDiv"
                    >
                      <Investors
                        loggedIn={loggedIn}
                        investors={results}
                        search={query}
                      />
                    </InfiniteScroll>
                  </div>
                )
              ) : (
                <div>No Contents.</div>
              )}
            </div>
          </Grid>
        </Grid>
      }
    </div>
  );
};

function Content({ content = "" }) {
  const [active, setActive] = useState(false);
  if (content.length > 200) {
    return (
      <p style={{ wordBreak: "break-all" }}>
        {active ? content : content.substr(0, 190)}{" "}
        <span
          style={{ color: "#00f", cursor: "pointer" }}
          onClick={() => setActive(!active)}
        >
          {active ? "Less" : "More"}
        </span>
      </p>
    );
  } else {
    return <p style={{ wordBreak: "break-all" }}>{content}</p>;
  }
}
