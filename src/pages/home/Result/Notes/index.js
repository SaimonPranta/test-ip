import React from "react";
import "./style.scss";

// import { HomeSearch } from "../../../Search/style";
// import Empty from "../../../Search/Results/Empty";
import Note from "./Note";
import DisplayAds from "../ads/display/DisplayAds";

const Index = ({ notes = [], search, loggedIn }) => {
  if (notes.length > 0) {
    return (
      <>
        <div className="search-notes">
          {notes.map((item) =>
            item?.adStatus ? (
              <DisplayAds key={item?.id} item={item} />
            ) : (
              <Note loggedIn={loggedIn} key={item.id} {...item} />
            )
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>Comment empty</h2>
        {/* <Empty tab="Notes" tag={search} /> */}
      </>
    );
  }
};
export default Index;
