import React, { useState, useRef } from "react";
import { getUrl } from "../../../shared/functions";
export default ({ src }) => {
  const [fullscreen, setFullscreen] = useState(false);
  let img = useRef();
  // console.log(img);
  function toggleFullscreen() {
    if (fullscreen) {
      setFullscreen(false);
    } else {
      img
        .requestFullscreen({ navigationUI: "show" })
        .then((d) => {
          setFullscreen(true);
        })
        .catch((err) => err);
    }
  }
  console.log(src, "src");
  return (
    <div>
      <img
        ref={(ref) => (img = ref)}
        onClick={toggleFullscreen}
        src={src}
        alt=""
        type="image/gif"
        style={{
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "luminosity",
        }}
      />
    </div>
  );
};
