import React from "react";
import "./style.scss";
import Store from "./Store";
import DisplayAds from "../ads/display/DisplayAds";

const Stores = ({ stores = [], search = "" }) => {
  return (
    <>
      {stores?.length > 0 ? (
        <div className="stores">
          {stores.map((store, index) =>
            store?.adStatus ? (
              <DisplayAds key={store?.id} item={store} />
            ) : (
              <Store key={index} store={store} />
            )
          )}
          {/* {stores.map((store, index) => {
            return <Store key={index} store={store} />;
            
          })} */}
        </div>
      ) : (
        <h2>Comment empty</h2>
      )}
    </>
  );
};

export default Stores;
