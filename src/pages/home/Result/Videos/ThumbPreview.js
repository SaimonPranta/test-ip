import React, { useState } from 'react';

import {
    SkipPrevious,
    SkipNext,
    PlayArrow,
    Pause,
    VolumeOff,
    VolumeDown,
    VolumeUp,
    Sync,
    SyncDisabled,
    PlayCircleOutline,
    CropFree,
    CropSquare,
} from "@material-ui/icons";
import { Slider, withStyles, IconButton, Typography } from "@material-ui/core";

import "./style.scss"
import { getUrl } from '../../../../shared/functions';


const white = "#fff";
const Duration = withStyles({
    root: {
        color: "white",
        height: 8,
    },
    thumb: {
        height: 18,
        width: 18,
        backgroundColor: white,
        border: "2px solid currentColor",
        marginLeft: -8,
        "&:focus, &:hover, &$active": {
            boxShadow: "inherit",
        },
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + 4px)",
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

const Volume = withStyles({
    root: {
        color: "white",
        height: 5,
    },
    thumb: {
        marginTop: -4,
    },
    track: {
        height: 5,
        borderRadius: 4,
    },
    rail: {
        height: 5,
        borderRadius: 4,
    },
})(Slider);


const ThumbPreview = ({ changeShowThumb, thumbnailImg, thumbnailUrl, username }) => {

    const [showPlayer, setShowPlayer] = useState(false);


    return (
        <div onClick={changeShowThumb} onMouseOver={() => setShowPlayer(true)} onMouseLeave={() => setShowPlayer(false)} className='search-video-player-tools-sections'>

            {
                (thumbnailImg === "default.png") ?
                    <div className='background-for-default-img'></div>
                    :
                    <img src={getUrl(thumbnailUrl, username)} alt="thumb-img" />
            }


            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    zIndex: 9999,
                    top: 0,
                    left: 0,
                    display: showPlayer ? "flex" : "none",
                    flexDirection: "column",
                }}
            >

                <div
                    style={{
                        flex: "1 1 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer"
                    }}

                >

                    <PlayCircleOutline
                        style={{
                            color: "#fff",
                            fontSize: 50,
                            backgroundColor: "#0005",
                            borderRadius: "50%",
                        }}
                    />

                </div>
                <div
                    style={{
                        backgroundColor: "#0008",
                        // opacity: active || paused ? 1 : 0,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ flex: 1, textAlign: "center", fontSize: 18 }}>

                        </div>
                        <div style={{ flex: 5, display: "flex" }}>
                            <Duration
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <div style={{ flex: 1, textAlign: "center", fontSize: 18 }}>

                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
                            <IconButton
                                style={{ flex: 1, padding: "2px 5px" }}

                            >

                                <VolumeUp style={{ color: white, fontSize: 22 }} />

                            </IconButton>
                            <div style={{ flex: 4, display: "flex" }}>
                                <Volume value={100} />
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                flex: 1,
                            }}
                        >
                            <IconButton style={{ padding: "2px 5px" }} >
                                <SkipPrevious style={{ color: white, fontSize: 22 }} />
                            </IconButton>
                            <IconButton style={{ padding: 0 }} >
                                <PlayArrow style={{ fontSize: 30, color: white }} />
                            </IconButton>
                            <IconButton style={{ padding: "2px 5px" }}>
                                <SkipNext style={{ color: white, fontSize: 22 }} />
                            </IconButton>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
                        >
                            <IconButton
                                style={{ padding: "2px 5px" }}

                            >
                                <Sync style={{ color: white, fontSize: 22 }} />

                            </IconButton>
                            <IconButton
                                style={{ padding: "2px 5px" }}
                            >
                                {/* <CropSquare style={{ color: white, fontSize: 22 }} />  */}
                                <CropFree style={{ color: white, fontSize: 22 }} />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>





        </div>
    )
}

export default ThumbPreview;


