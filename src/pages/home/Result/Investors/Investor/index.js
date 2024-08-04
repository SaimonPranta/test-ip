import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { FaDonate } from "react-icons/fa";
import { getRatioHeight } from "../../../../../shared/functions/getRatioHeight";
import { useHistory } from "react-router-dom";
import { getCommercialMedia } from "../../../../../shared/functions";
import { getDaysLeft } from "../../../../../shared/functions/getDaysLeft";
import { wordLengthChecker } from "../../../../../shared/functions/26WordLengthChecker";
import { getMedia } from "../../../../../shared/functions/getMedia copy";
function Investor({ investor }) {
  const cardRef = useRef(null);
  const history = useHistory();
  const [cardHeight, setCardHeight] = useState(300);

  useEffect(() => {
    setCardHeight(cardRef?.current?.clientWidth);
  }, [cardRef]);

  const handleInvestorDetails = (id) => {
    console.log("called 1");
    history.push(`/investors/${id}`);
  };
  return (
    <div className="donee" ref={cardRef}>
      <div
        className="inner"
        onClick={() => handleInvestorDetails(investor?._id)}
      >
        <div
          className="donee-header"
          style={{
            height: getRatioHeight(cardHeight),
          }}
        >
          <img
            style={{
              height: `${getRatioHeight(cardRef?.current?.clientWidth)}px`,
            }}
            draggable={false}
            className="image"
            src={getMedia(
              investor?.media[0]?.name,
              investor?.commercialId?.userName,
              "investors"
            )}
            alt=""
          />
        </div>

        <div
          className="donee-body"
          // ref={(el) => (contentRef.current[index] = el)}
        >
          <div className="top-part">
            <div className="days-left-wrapper">
              <p className="left-days">{getDaysLeft(investor?.endDate)}</p>
            </div>
            <div className="category-wrapper">
              <p className="category">{investor?.category}</p>
            </div>
          </div>
          <p className="donee-title">
            {wordLengthChecker(investor?.donationTitle, 35)}
          </p>
          <p
            className="donee-body-content"
            // style={{ height: `${maxHeight !== 0 && maxHeight}px` }}
          >
            {wordLengthChecker(investor?.description, 60)}
          </p>
        </div>
        <div className="fund-raised">
          <div className="track-progress">
            <p>Fund Raised</p>
            <p className="total-amount">${investor?.amount}</p>
          </div>
          <div class="progress-container">
            <div
              class="progress"
              style={{ width: `${investor?.amountPercentage}%` }}
            >
              <span className="percent-value">
                {investor?.amountPercentage}%
              </span>
            </div>
            <div
              class="percentage"
              style={{ left: `${investor?.amountPercentage}%` }}
            >
              ${investor?.collectedAmount}
            </div>
          </div>
        </div>
        <div className="donee-footer">
          {investor?.collectedAmount >= investor?.amount ? (
            <button>
              <FaDonate />
              Complete
            </button>
          ) : (
            <button
            //  onClick={(e) => handleMakeDonate(e, investor)}
            >
              <FaDonate />
              Donate Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Investor;
