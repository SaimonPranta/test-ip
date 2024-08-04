import React from "react";
import "./style.scss";
import Investor from "./Investor";
import DisplayAds from "../ads/display/DisplayAds";

const Investors = ({ investors = [], search = "" }) => {
  return (
    <>
      {investors?.length > 0 ? (
        <div className="investors">
          {investors.map((investor, index) =>
            investor?.adStatus ? (
              <DisplayAds key={investor?.id} item={investor} />
            ) : (
              <Investor key={index} investor={investor} />
            )
          )}
          {/* {investors.map((investor, index) => {
            return <Investor key={index} investor={investor} />;
            
          })} */}
        </div>
      ) : (
        <h2>Comment empty</h2>
      )}
    </>
  );
};

export default Investors;
