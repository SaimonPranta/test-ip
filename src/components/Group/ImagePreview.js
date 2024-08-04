import React from "react";
import { getUrl } from "../../shared/functions";

const ImagePreview = ({ src, grpImg, username, thumbnailImageFromDb }) => {
  return (
    <div>
      {(thumbnailImageFromDb === "default.png" && !src?.includes("blob:")) ||
      src === undefined ? (
        <img className="groups-tabs-img" src={grpImg} alt="" />
      ) : (
        <img
          className="groups-tabs-img"
          alt="img"
          src={src?.includes("blob:") ? src : getUrl(src, username)}
        />
      )}
    </div>
  );
};

export default ImagePreview;
