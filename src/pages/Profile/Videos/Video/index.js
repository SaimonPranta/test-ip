import React, { useRef, useState, useEffect } from "react";
import { Waypoint } from 'react-waypoint';


import { HoverOver } from "../../../../components/Tools";
import { getUrl } from "../../../../shared/functions";

import "./style.scss";

const white = "#fff";

export default ({ next, prev, src, title = "", duration, username, thumbnailImage }) => {
    const [paused, setPaused] = useState(true);
    const [ctime, setCtime] = useState(0);
    const [dur, setDur] = useState(duration);
    const [silent, setSilent] = useState(false);
    const [active, setActive] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);
    const [repeat, setRepeat] = useState(localStorage.getItem('video_repeat') === 'false' ? false : true);
    const [elem, setElem] = useState()

    const [sound, setSound] = useState(
        localStorage.getItem("sound_lavel") || 100
    );
    let video = useRef();




    useEffect(() => {
        let activeTimeout;
        if (active && !paused) {
            clearTimeout(activeTimeout);
            activeTimeout = setTimeout(() => {
                setActive(false);
            }, 4000);
        }
    }, [active, paused]);
    useEffect(() => {
        // video.volume = sound / 100;
        localStorage.setItem("sound_lavel", sound);
    }, [sound]);
    useEffect(() => {
        localStorage.setItem("video_repeat", repeat);
    }, [repeat]);
    function togglePlay() {
        if (paused) {
            video.play();
            setElem(video);
            setPaused(false);
        } else {
            video.pause();
            setPaused(true);
        }
    }
    function pauseOnScroll() {
        video.pause();
        setPaused(true);
    }
    function toggleFullscreen() {
        // if (fullscreen) {
        //   // todo
        // } else {

        // }
        video
            .requestFullscreen({ navigationUI: "show" })
            .then(() => setFullscreen(true))
            .catch((err) => err);
    }
    function onChangeDuration(e, v) {
        const time = dur * (v / 100);
        video.currentTime = time;
        setCtime(v);
    }
    function format(inp) {
        const h = ~~(inp / 3600);
        const m = ~~((inp / 60) % 60);
        const s = ~~(inp % 60);
        if (h > 0) {
            return `${h > 9 ? "" + h : "0" + h}:${m > 9 ? "" + m : "0" + m}:${s > 9 ? "" + s : "0" + s
                }`;
        } else {
            return `${m > 9 ? "" + m : "0" + m}:${s > 9 ? "" + s : "0" + s}`;
        }
    }

    return (
        <div
            style={{
                backgroundColor: "#424242",
                color: white,
                position: "relative",
                height: "100%",
                width: "100%",
                cursor: "pointer",
            }}
            onMouseEnter={() => setSound(localStorage.getItem("sound_lavel"))}
            onMouseOver={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onMouseMove={() => setActive(true)}
        >

            {

                (thumbnailImage === "default.png" && !src?.includes('blob:')) ? "" :
                    <img className="video-image-thumbnail" src={src?.includes('blob:') ? src : getUrl(src, username)} />

            }



            {/* <Waypoint
                // onEnter={handleEnterViewport}
                onLeave={pauseOnScroll}
            >

                <video
                    style={{ width: "100%",  height: "100%" }}
                    ref={(ref) => (video = ref)}
                    src={src}
                    loop={repeat}
                    onEnded={() => setPaused(true)}
                    onLoadedMetadata={() => {
                        if (!duration) {
                            setDur(video.duration);
                        }
                    }}
                    onTimeUpdate={() =>
                        setCtime((100 / video.duration) * video.currentTime)
                    }
                />

            </Waypoint> */}
            {/* <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {!!title && (
                    <div
                        style={{
                            backgroundColor: "#0008",
                            opacity: active || paused ? 1 : 0,
                        }}
                    >
                        <HoverOver title={title}>
                            <Typography
                                component="h3"
                                variant="h6"
                                style={{
                                    padding: 5,
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}
                                align="center"
                            >
                                {title}
                            </Typography>
                        </HoverOver>
                    </div>
                )}


            </div> */}
        </div>
    );
};
