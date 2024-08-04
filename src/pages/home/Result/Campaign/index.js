import React from "react";
import "./style.scss";

// import { HomeSearch } from "../../../Search/style";
// import Empty from "../../../Search/Results/Empty";
import Note from "./Note";
import CampaignCart from "./Modals/CampaignsCart";
import DisplayAds from "../ads/display/DisplayAds";

const Index = ({ campaigns = [], search, loggedIn }) => {
  if (campaigns.length > 0) {
    return (
      <>
        <div className="search-campaigns">
          {campaigns.map((item) =>
            item?.adStatus ? (
              <DisplayAds key={item?.id} item={item} />
            ) : ( 
              <CampaignCart item={item} />
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
