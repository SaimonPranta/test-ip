import React, { useState } from "react";
import "./style.scss";
import user from "../../assets/home/User.png";
import Stories from "./Stories";
import Reels from "./Reels";
import News from "./News";
import Modal from "./common/Modal";
import { getStories } from "../../pages/Stories/Hooks";
import { getReels } from "../../pages/Reels/Hooks";

const Story = () => {
  const [render, setRender] = useState(false);

  const {stories} = getStories(render, setRender);
  const {reels} = getReels();
  
  return (
    <div className="story-wrapper">
      <div className="stories">
        <h4 className="story-title">Stories</h4>
        <Stories data={stories?.data} render={render} setRender={setRender}/>
      </div>

      <div className="reels">
      <h4 className="story-title">Reels</h4>
        <Reels data={reels?.data} />
      </div>

      <div className="news">
      <h4 className="story-title">News</h4>
        <News />
      </div>
    </div>
  );
};

export default Story;
