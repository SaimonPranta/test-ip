import React from "react";
import { Link } from "react-router-dom";
import Note from "../../../../assets/profile/notes.jpg";
import { Share, MoreVert, Lock, People, Public } from "@material-ui/icons";
import {
  makeStyles,
  createStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";

import { getUrl, getUserAvatar } from "../../../../shared/functions";
import { When } from "../../../../components";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 290,
      margin: "15px",
      boxShadow:
        "1px 1px 1px -1px rgb(0 0 0 / 20%), 0px 0px 1px 1px rgb(0 0 0 / 10%)",
    },
    header: {
      padding: 3,
    },
    avatar: {
      height: 30,
      width: 30,
    },
    img: {
      height: "30px",
      width: "30px",
      margin: "0px 5px 5px 0px",
    },
    title: {
      padding: 10
    },
  })
);

export default ({ id, note, privacy, date, title, user, attachedlinkpictitle, name, thumbnailImgUrl, thumbnailImg }) => {
  const classes = useStyles();


  const updateAttachedlinkpictitle = attachedlinkpictitle?.replaceAll("&lt;", "<")

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar className={classes.avatar}>
            <img
              style={{ height: "30px", width: "30px" }}
              src={getUserAvatar(user.avatar, user.gender, user.username)}
              alt=""
            />
          </Avatar>
        }
        // action={
        //   <IconButton>
        //     <MoreVert />
        //   </IconButton>
        // }
        title={
          <Link to={`/${user.username}`} style={{ color: "#000000" }}>
            <h5>{user.name.join(" ")}</h5>
          </Link>
        }
        subheader={<When date={date} />}
      />


      {/* <img className="profile-photo-tabs-img" src={Note} alt={title} /> */}



      <span className='home-search-notes'>
        <img className="profile-photo-tabs-img"
          src={(thumbnailImg === "default.png") ? Note : getUrl(thumbnailImgUrl, user.username)}
          alt={title} />
      </span>


      {/* <img className={classes.img} src={Note} alt={title} /> */}
      <CardContent className={classes.title}>
        <Typography
          style={{ color: '#000000', fontSize: '16px' }}
          color="textSecondary"
          component="p"
          variant="p"
        >

          {
            updateAttachedlinkpictitle?.includes('<script') ? " "
              :
              updateAttachedlinkpictitle?.includes('<a') ?
                <div dangerouslySetInnerHTML={{ __html: updateAttachedlinkpictitle }}></div> : name
          }

        </Typography>
      </CardContent>



      {/* <CardActions disableSpacing>
        <IconButton>{privacy === 'private' ? <Lock /> : privacy === 'friends' ? <People /> : <Public />}</IconButton>
        <IconButton>
          <Share />
        </IconButton>
      </CardActions> */}
    </Card>
  );
};
