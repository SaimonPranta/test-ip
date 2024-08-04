import React, { useRef, useState, useEffect } from "react";

import { Typography } from "@material-ui/core";


import "./style.scss";
import { HoverOver } from "../../../../components/Tools";
import { getUrl } from "../../../../shared/functions";

const white = "#fff";


export default ({ src, title = "", username, thumbnailImage }) => {



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
        >



            <span    >
          
                {

                    (thumbnailImage === "default.png" && !src?.includes('blob:')) ? "" :
                        < img className="audio-image-thumbnail" src={src?.includes('blob:') ? src : getUrl(src, username)} />
                }

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

                </div>
            </span>



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
