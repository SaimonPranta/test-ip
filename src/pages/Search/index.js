import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Search } from "@material-ui/icons";
import { connect } from "react-redux";
import { parse } from "query-string";
import axios from "axios";

import {
  WebIcon,
  PostIcon,
  ImageIcon,
  AudioIcon,
  VideoIcon,
  GroupIcon,
  NoteIcon,
  PeopleIcon,
} from "../../assets/search";
import {
  Peoples,
  Posts,
  Photos,
  Audios,
  Videos,
  Groups,
  Notes,
  Webs,
} from "./Results";
import { BACKEND_URL } from "../../shared/constants/Variables";
import { availability, authGuard } from "../../shared/HOC";
import { userHeader } from "../../shared/functions/Token";
import { TopBar } from "./style";
import Contactual from "./Results/Contactual/Contactual";
import { Grid } from "@mui/material";
import AdsComponentForSearch from "../Profile/AdsComponent/AdsComponentForSearch";
import store from "../../store";
import GridSkeleton from "../../skeleton/ProfileSearch/GridSkeleton";
import "./style.scss";

import ContractualSkeleton from "../../skeleton/ProfileSearch/ContractualSkeleton";
import PostSkeleton from "../../skeleton/ProfileSearch/PostSkeleton";
import PeopleSkeleton from "../../skeleton/ProfileSearch/PeopleSkeleton";
import WebSkelton from "../../skeleton/ProfileSearch/WebSkelton";
import AdsComponent from "../Profile/AdsComponent/AdsComponent";

const tabs = [
  { name: "web", icon: WebIcon },
  { name: "people", icon: PeopleIcon },
  { name: "posts", icon: PostIcon },
  { name: "photos", icon: ImageIcon },
  { name: "audios", icon: AudioIcon },
  { name: "videos", icon: VideoIcon },
  { name: "groups", icon: GroupIcon },
  { name: "notes", icon: NoteIcon },
];

function SearchResult({ location: { search }, history: { push } }) {
  const { tab, query } = parse(search);

  const user1 = JSON.parse(localStorage.getItem("u"));

  function isMe() {
    return store.getState().auth.user.id === user1.id;
  }

  document.title = !!query ? `${query} | Search` : "Search";

  const [input, setInput] = useState(query || "");

  useEffect(() => {
    setInput(query);
  }, [query]);

  const [working, setWorking] = useState(false);

  //old code
  // const [input, setInput] = useState(query || "");

  const [web, setWeb] = useState([]);
  const [people, setPeople] = useState([]);
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [videos, setVideos] = useState([]);
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState([]);

  function updateResult(name, data = []) {
    switch (name) {
      case "web":
        setWeb(data);
        break;
      case "people":
        setPeople(data);
        break;
      case "posts":
        setPosts(data);
        break;
      case "photos":
        setPhotos(data);
        break;
      case "audios":
        setAudios(data);
        break;
      case "videos":
        setVideos(data);
        break;
      case "groups":
        setGroups(data);
        break;
      case "notes":
        setNotes(data);
        break;
      default:
        break;
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    const key = input.trim();

    if (!!key) {
      push(`/search?tab=${tab}&query=${key.split(" ").join("+")}`);
    }
  }

  function changeTab(name) {
    push(`/search?tab=${name}&query=${input.split(" ").join("+")}`);
  }
  useEffect(() => {
    const key = query.trim();
    if (!!key) {
      setWorking(true);
      axios
        .get(`${BACKEND_URL}/profile/search/${tab}?search=${query.trim()}`, {
          headers: userHeader(),
        })
        .then(({ data }) => {
          updateResult(tab, data);
          setWorking(false);
        })
        .catch((e) => {
          updateResult(tab);
          setWorking(false);
          throw e;
        });
    }
  }, [tab, query]);

  return (
    <div>
      <TopBar>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Looking for..."
            value={input.split("+").join(" ")}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <Search />
          </button>
        </form>

        <div>
          {tabs.map((item) => (
            <label
              key={item.name}
              className={tab === item.name ? "a" : ""}
              onClick={() => changeTab(item.name)}
            >
              <img alt="" src={item.icon} />
              <span>{item.name}</span>
            </label>
          ))}
        </div>
      </TopBar>

      <div style={{ height: 75 }} />

      {
        // working ?
        //   <Spinner height={20} /> :

        // skeleton with contractul ads

        // <div className="skeleton-grid-for-homesearch-section">
        //   <ContractualSkeleton />
        //   <div className="skeleton-grid-for-homesearch">
        //     {
        //       skeletondata?.map((item, index) => (

        //         <GridSkeleton key={index} />
        //       ))

        //     }
        //   </div>
        // </div>

        <Grid container>
          <Grid xs={9}>
            <div className="">
              {/* search ads  */}
              {/* <Contactual input={input} /> */}

              {tab === "web" &&
                (working ? (
                  <div className="skeleton-grid-for-homesearch-section">
                    {/* <ContractualSkeleton /> */}

                    {Array.apply(null, new Array(10))?.map((item, index) => (
                      <WebSkelton key={index} />
                    ))}
                  </div>
                ) : (
                  <>
                    {/* <Contactual input={input} /> */}
                    <Webs webs={web} search={query} setWebs={setWeb} />
                  </>
                ))}
              {tab === "people" &&
                (working ? (
                  <div className="skeleton-grid-for-homesearch-section">
                    {/* <ContractualSkeleton /> */}

                    <div className="people-skeleton-section">
                      {Array.apply(null, new Array(10))?.map((item, index) => (
                        <PeopleSkeleton key={index} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="group-sections-search">
                    {/* <Contactual input={input} /> */}
                    <Peoples
                      people={people}
                      search={query}
                      setPeople={setPeople}
                    />
                  </div>
                ))}

              {tab === "posts" &&
                (working ? (
                  <div className="skeleton-grid-for-homesearch-section">
                    {/* <ContractualSkeleton /> */}

                    {Array.apply(null, new Array(10))?.map((item, index) => (
                      <PostSkeleton key={index} />
                    ))}
                  </div>
                ) : (
                  <>
                    {/* <Contactual input={input} /> */}
                    <Posts posts={posts} search={query} />
                  </>
                ))}
              {tab === "photos" &&
                (working ? (
                  <div className="skeleton-grid-for-homesearch-section">
                    {/* <ContractualSkeleton /> */}
                    <div className="skeleton-grid-for-homesearch">
                      {Array.apply(null, new Array(10))?.map((item, index) => (
                        <GridSkeleton key={index} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* <Contactual input={input} /> */}
                    <Photos photos={photos} search={query} />
                  </>
                ))}
              {tab === "audios" &&
                (working ? (
                  <div className="skeleton-grid-for-homesearch-section">
                    {/* <ContractualSkeleton /> */}
                    <div className="skeleton-grid-for-homesearch">
                      {Array.apply(null, new Array(10)).map((item, index) => (
                        <GridSkeleton key={index} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* <Contactual input={input} /> */}
                    <Audios audios={audios} search={query} />
                  </>
                ))}
              {tab === "videos" &&
                (working ? (
                  <div className="skeleton-grid-for-homesearch-section">
                    {/* <ContractualSkeleton /> */}
                    <div className="skeleton-grid-for-homesearch">
                      {Array.apply(null, new Array(10))?.map((item, index) => (
                        <GridSkeleton key={index} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* <Contactual input={input} /> */}
                    <Videos videos={videos} search={query} />
                  </>
                ))}
              {tab === "groups" &&
                (working ? (
                  <div className="skeleton-grid-for-homesearch-section">
                    {/* <ContractualSkeleton /> */}
                    <div className="skeleton-grid-for-homesearch">
                      {Array.apply(null, new Array(10))?.map((item, index) => (
                        <GridSkeleton key={index} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="group-sections-search">
                    {/* <Contactual input={input} /> */}
                    <Groups
                      groups={groups}
                      isMe={isMe}
                      setGroups={setGroups}
                      search={query}
                    />
                  </div>
                ))}

              {tab === "notes" &&
                (working ? (
                  <div className="skeleton-grid-for-homesearch-section">
                    {/* //   <ContractualSkeleton /> */}
                    <div className="skeleton-grid-for-homesearch">
                      {Array.apply(null, new Array(10))?.map((item, index) => (
                        <GridSkeleton key={index} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* <Contactual input={input} /> */}
                    <Notes notes={notes} search={query} />
                  </>
                ))}
            </div>
          </Grid>

          <Grid xs={3}>
            {/* <AdsComponentForSearch /> */}

            <AdsComponent posts={posts} />
          </Grid>
        </Grid>
      }
    </div>
  );
}

export default connect((store) => ({ auth: store.auth }))(
  authGuard(availability(withRouter(SearchResult)))
);
