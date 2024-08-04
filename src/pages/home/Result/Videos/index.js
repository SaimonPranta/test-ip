import React from "react";
import './style.scss'

// import { HomeSearch } from "../../../Search/style";
// import Empty from "../../../Search/Results/Empty";
import Video from "./Video";
import DisplayAds from "../ads/display/DisplayAds";

const Index = ({ videos = [], search, loggedIn }) => {
  if (videos.length > 0) {
    return (
      <>
        {/* <HomeSearch> */}
        <div className="search-video">
          {videos.map((item) =>
            item?.adStatus ? (
              <DisplayAds key={item?.id} item={item} loggedIn={loggedIn} />
            ) : (
              <Video key={item.id} {...item} loggedIn={loggedIn} />
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
        {/* <Empty tab="Videos" tag={search} /> */}
      </>
    );
  }
};

export default Index;