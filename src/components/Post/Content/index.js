import React, { useState, useRef } from "react";
import { connect } from "react-redux";

import { Audio, Photo, Video } from "../../../shared/Media";
import { FormatContent, Slider } from "../../Tools";
import { getUrl } from "../../../shared/functions";
import "./style.scss";
import Txt from "../../../assets/media/txt.png";
import Psd from "../../../assets/media/psd.png";
import Pdf from "../../../assets/media/pdf.png";
import Docx from "../../../assets/media/docx.png";

const Contect = ({ media = [], contents = [], postId, preview, auth, user }) => {
  const [active, setActive] = useState(false);
  const post = contents[contents.length - 1];

  const previewUrl = preview?.url + "&feature=youtu.be";
  let url = previewUrl?.match(/(v=.*&)/g)
  
  // for currently used youtube link
  // let url = preview?.url?.match(/(v=.*)/g)
  let generateUrl;
  if (url) {
    generateUrl = 'https://www.youtube.com/embed/' + url[0].slice(2, -1)
  }


  function getContent() {
    if (post.length <= 300 || active) {
      return <FormatContent>{post}</FormatContent>;
    } else {
      if (active) {
        return (
          <>
            <FormatContent>{post}</FormatContent>
            <span onClick={() => setActive(!active)}>&nbsp; less</span>
          </>
        );
      } else {
        return (
          <>
            <FormatContent>{post.substr(0, 300)}</FormatContent>
            <span style={{ color: '#0048bA', fontWeight: '600' }} onClick={() => setActive(!active)}>&nbsp; more...</span>
          </>
        );
      }
    }
  }


  const postMedia = document.querySelector(`#id${postId}`);
  const videos = document.querySelectorAll(`#id${postId} video`);
  const audios = document.querySelectorAll(`#id${postId} audio`);
  const slBtns = document.querySelectorAll(`#id${postId} .slick-arrow`);
  function onChangeSlide() {
    setTimeout(() => {
      for (const video of videos) {
        video.pause();
      }
      for (const audio of audios) {
        audio.pause();
      }
    }, 0);
  }
  function toggleSlBtn(val = false) {
    for (const btn of slBtns) {
      if (val) {
        btn.classList.remove("hidden");
      } else {
        btn.classList.add("hidden");
      }
    }
  }
  for (const btn of slBtns) {
    btn.addEventListener("click", onChangeSlide);
  }
  if (postMedia) {
    postMedia.addEventListener("mouseenter", () => toggleSlBtn(true));
    postMedia.addEventListener("mouseleave", () => toggleSlBtn(false));
  }

  return (
    <div className="ContentWraper">
      {media.length < 1 ? (
        <>
          {!!post && (
            <div className="content">
              {post.length <= 150 ? (
                <h2
                  style={{
                    fontFamily: " 'Fira Sans', sans-serif",
                    wordBreak: "break-all",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <FormatContent>{post}</FormatContent>
                </h2>
              ) : (
                <p style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
                  {getContent()}
                </p>
              )}


              {preview?.images?.length > 0 && (
                // <a
                //   href={preview.url}
                //   target="_blank"
                //   style={{ color: "black" }}
                // >
                //   <div>
                //     <img
                //       style={{ width: "100%" }}
                //       src={preview.images[0]}
                //       alt=""
                //     />
                //     <b>{preview.title}</b>
                //     <p>{preview.description}</p>
                //   </div>
                // </a>
                <>

                  {/* old code */}
                  {/* <iframe width="880" height="500" src={generateUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

                  {/* new code */}
                  <iframe className="iframe-video" src={generateUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="mda-cont">
          {!!post && (
            <div
              className="cont-left"
              style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}
            >
              {getContent()}
            </div>
          )}

          <div className="mda" id={`id${postId}`}>
            <Slider onSwipe={onChangeSlide} autoplay={false}>
              {media.map(
                ({
                  id,
                  types,
                  types2,
                  url,
                  poster = "",
                  title,
                  duration,
                  name,
                }) => {
                  switch (types) {
                    case "image":
                      return (
                        <div key={id}>
                          <div
                            className="mdbk"
                            style={{ backgroundImage: `url(${getUrl(url, user.username)})` }}
                          >
                            <div style={{ backgroundColor: "#0008" }}>
                              <Photo src={getUrl(url, user.username)} />
                              {/* <img src={getUrl(url)} alt="" /> */}
                            </div>
                          </div>
                        </div>
                      );
                    case "video":
                      return (

                        <div key={id}>

                          <div
                            className="mdbk"
                            style={{
                              backgroundImage: `url(${getUrl(poster, user.username)})`,
                            }}
                          >
                            <div
                              style={{
                                backgroundColor: "#0008",
                                maxHeight: 540,
                              }}
                            >
                              <Video
                                src={getUrl(url, user.username)}
                                title={title}
                                duration={duration}
                              />
                            </div>
                          </div>

                        </div>
                      );
                    case "audio":
                      return (
                        <div key={id}>
                          <div className="mdbk">
                            <div>
                              <Audio
                                src={getUrl(url, user.username)}
                                title={title}
                                duration={duration}
                              />
                            </div>
                          </div>
                        </div>
                      );

                    default:
                      switch (types2) {
                        case "txt":
                          return (
                            <div>
                              <img src={Txt} alt="" />
                            </div>
                          );
                        case "pdf":
                          return (
                            <div>
                              <img src={Pdf} alt="" />
                            </div>
                          );
                        case "psd":
                          return (
                            <div>
                              <img src={Psd} alt="" />
                            </div>
                          );
                        case "docx":
                          return (
                            <div>
                              <img src={Docx} alt="" />
                            </div>
                          );
                        default:
                          return "";
                      }
                  }
                }
              )}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect((store) => ({ auth: store.auth }))(Contect);