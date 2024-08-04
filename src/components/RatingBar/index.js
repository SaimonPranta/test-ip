import React from "react";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import "./style.scss";
const RatingBar = ({ rating }) => {
  const renderStar = (index) => {
    if (rating > index && rating < index + 1) {
      return <IoMdStarHalf />;
    } else if (rating > index) {
      return <IoMdStar />;
    } else {
      return <IoMdStarOutline />;
    }
  };
  return (
    <div className="rating-wrapper">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`${
            rating > index || index + 1 <= rating ? "active" : ""
          } rating`}
        >
          {renderStar(index)}
        </span>
      ))}
    </div>
  );
};

export default RatingBar;
