import React, { useRef, useState, useEffect } from "react";

import { Waypoint } from "react-waypoint";

import { Typography } from "@material-ui/core";


import "./style.scss";
import { HoverOver } from "../../../../components/Tools";

const white = "#fff";


export default ({ src, title = "", duration }) => {
    const [paused, setPaused] = useState(true);
    const [ctime, setCtime] = useState(0);
    const [dur, setDur] = useState(duration);
    const [active, setActive] = useState(true);
    const [repeat, setRepeat] = useState(
        localStorage.getItem("audio_repeat") === "false" ? false : true
    );

    let audio = useRef();

 





    function pauseOnScroll() {
        // console.log("sdsdfsd");
        audio.pause();
        setPaused(true);
    }

    function getArray(n) {
        const a = [];
        for (let i = 0; i < n; i++) {
            a.push(i);
        }
        return a;
    }

  
    return (
        <div
            style={{

                color: white,
                backgroundColor: "#555",
                position: "relative",
                // minWidth: 100,
                height: "100%",
                width: "100%",
                cursor: "pointer",
            }}
            onMouseOver={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onMouseMove={() => setActive(true)}
        // onMouseEnter={() => setActive(false)}
        >
            <Waypoint
                // onEnter={handleEnterViewport}
                onLeave={pauseOnScroll}
            >


                <span    >
                    <audio
                        style={{ width: "100%", height: 144 }}
                        ref={(ref) => (audio = ref)}
                        src={src}
                        loop={repeat}
                        onEnded={() => setPaused(true)}
                        onLoadedMetadata={() => {
                            if (!duration) {
                                setDur(audio.duration);
                            }
                        }}
                        onTimeUpdate={() =>
                            setCtime((100 / audio.duration) * audio.currentTime)
                        }
                    />

                    <div
                        style={{
                            display: "flex",
                            position: "absolute",
                            top: 0,
                            left: "50%",
                            transform: "translate(-50%)",
                            alignItems: "center",
                            justifyContent: "space-around",
                            zIndex: -1,
                            width: "100%",
                            maxWidth: 300,
                            height: "100%",
                        }}
                    >
                        {getArray(20).map((i) => (
                            <div
                                key={i}
                                className="bar"
                                style={{ animationPlayState: paused ? "paused" : "running" }}
                            />
                        ))}
                    </div>
                </span>


            </Waypoint>

            {!!title && (
                <div>
                    <HoverOver title={title}>
                        <Typography
                            component="h3"
                            variant="h6"
                            style={{
                                marginTop: 70,
                                padding: 5,
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden"
                            }}
                            align="center"
                        >
                            {title}
                        </Typography>
                    </HoverOver>
                </div>
            )}

        </div>
    );
};
