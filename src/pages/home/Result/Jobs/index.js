import React from "react";
import "./style.scss";
import Job from "./Job";
import DisplayAds from "../ads/display/DisplayAds";

const Jobs = ({ jobs = [], search = "" }) => {
  return (
    <>
      {jobs?.length > 0 ? (
        <div className="jobs">
          {jobs.map((job, index) =>
            job?.adStatus ? (
              <DisplayAds key={job?.id} item={job} />
            ) : (
              <Job key={index} job={job} />
            )
          )}
          {/* {jobs.map((job, index) => {
            return <Job key={index} job={job} />;
            
          })} */}
        </div>
      ) : (
        <h2>Comment empty</h2>
      )}
    </>
  );
};

export default Jobs;
