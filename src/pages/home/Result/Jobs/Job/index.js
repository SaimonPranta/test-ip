import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import "./style.scss";
import { convertToDate } from "../../../../../shared/functions/timeConverter";
function Job({ job }) {
  const history = useHistory();

  const handleJobDetails = (id) => {
    const user1 = JSON.parse(localStorage.getItem("u"));
    history.push(`${user1?.username}/business/${job?.commercial}/job/${id}`);
  };

  return (
    <div className="job" onClick={() => handleJobDetails(job._id)}>
      <div className="job-header">
        <h3 className="job-name">{job?.jobDetails?.jobTitle ?? ""}</h3>
        <h4 className="company-name">{job?.companyName}</h4>
      </div>
      <div className="job-body">
        <h4 className="salary-range">
          Salary range: ${job?.jobDetails?.startSalary}k - $
          {job?.jobDetails?.endSalary}k
        </h4>
        <span className="job-skills">
          Skills:
          {job?.jobDetails?.jobSkills?.map((item, index) => (
            <span className="skill" key={index}>
              {item}
              {index + 1 !== job?.jobDetails?.length && ","}
            </span>
          ))}
        </span>
      </div>

      <div className="job-footer">
        <h4 className="company-location">Location: {job?.location}</h4>
        <div className="apply-deadline">
          <h5 className="job-deadline">
            {convertToDate(job?.applicationDeadline)}
          </h5>
        </div>
      </div>
      <div className="job-type">
        <p>{job?.jobDetails?.workplace}</p>
      </div>
    </div>
  );
}

export default Job;
