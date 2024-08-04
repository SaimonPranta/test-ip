import React from "react";
import { reactionData } from "../../../../pages/Reels/AddReels/utils/reactionData";
import "./react.style.scss";
const Index = ({
  showReactionBar,
  onMouseEnter,
  onMouseLeave,
  handleAddReaction,
  itemId,
}) => {
  return (
    <div className="reaction-wrapper">
      <div
        className={`reactions ${showReactionBar ? "open" : ""}`}
        onMouseEnter={() => onMouseEnter(itemId)}
        onMouseLeave={() => onMouseLeave(null)}
      >
        {reactionData?.map((react, index) => {
          return (
            <div className="reaction" key={index}>
              <img
                src={react?.icon}
                alt=""
                onClick={() => handleAddReaction(react?.name, itemId)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
