import React from "react";
import "./style.scss";

// import { HomeSearch } from "../../../Search/style";
// import Empty from "../../../Search/Results/Empty";
import Audio from "./Audio";
import DisplayAds from "../ads/display/DisplayAds";

const Index = ({ audios = [], search, loggedIn }) => {

  if (audios.length > 0) {
    return (
      <>
        {/* <HomeSearch> */}
        <div className="audio-search">
          {audios.map((item, index) =>
            item?.adStatus ? (
              <DisplayAds key={index} item={item} loggedIn={loggedIn} />
            ) : (
              <Audio loggedIn={loggedIn} key={index} {...item} />
            )
          )}
        </div>
        {/* </HomeSearch> */}
      </>
    );
  } else {
    return (
      <>
        <h2>Comment empty</h2>
        {/* <Empty tab="Audios" tag={search} /> */}
      </>
    );
  }
};
export default Index;
