import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, createStyles, Card, CardHeader, CardContent, Avatar, Typography } from '@material-ui/core';

import axios from "axios";
import "./style.scss";

import { getUrl, getUserAvatar } from "../../../../../shared/functions";
import { BACKEND_URL } from "../../../../../shared/constants/Variables";

const useStyles = makeStyles(() =>

  createStyles({
    root: {
      maxWidth: 250,
      marginTop: '10px',
      boxShadow: '1px 1px 1px -1px rgb(0 0 0 / 20%), 0px 0px 1px 1px rgb(0 0 0 / 10%)',
    },
    header: {
      padding: 3
    },
    avatar: {
      height: 25,
      width: 25
    },
    media: {
      height: 145,
    },
    title: {
      padding: 10
    },
  })
);

const DisplayAds = ({ loggedIn, item }) => {
  const classes = useStyles();

  const [mediaUrlData, setMediaUrlData] = useState([]);


  useEffect(() => {
    let mount = false;
    if (!mount) {
      displayAdsMedisUrl();
    }

    return () => {
      mount = true;
    };
  }, []);

  const displayAdsMedisUrl = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/promotion-app/get-public-media/${item?.postId}`
      );
      setMediaUrlData(data?.data);
    } catch (error) {
      console.log("Something went wrong.");
    }
  };


  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Link
            to={loggedIn ? `/${item?.userName}` : "/signup"}
            style={{ color: "#000000" }}>
            <Avatar className={classes.avatar}>
              <img
                style={{ height: "25px", width: "25px" }}
                src={getUserAvatar(item?.adAvater, "male", item?.userName)}
                alt=""
              />
            </Avatar>
          </Link>
        }
        title={<div className="display-ads-sponsord">Sponsored</div>}
      />

      <Link className="contactual-ads-sections" to={`/${item?.userName}/timeline?pid=${item.postId}`}>
        {mediaUrlData?.postType === "photo" ? (
          <img
            className="home-photo-tabs-img"
            alt={mediaUrlData?.mediaUrl}
            src={getUrl(mediaUrlData?.mediaUrl, item?.userName)}
          />
        ) : (
          <video
            src={getUrl(mediaUrlData?.mediaUrl, item?.userName)}
            autoPlay
            loop
            muted
            className="display-home-video-tabs-img"></video>
        )}

        <CardContent className={classes.title}>
          <Typography>{item?.adTitle}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default DisplayAds;
