import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles, Card, CardHeader, CardContent, Avatar, Typography } from '@material-ui/core';
import Note from "../../../../assets/profile/notes.jpg";
import { getUrl, getUserAvatar } from '../../../../shared/functions';


import "./style.scss";


const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 250,
      // maxWidth: '100%',
      marginTop: 10,
      boxShadow: '1px 1px 1px -1px rgb(0 0 0 / 20%), 0px 0px 1px 1px rgb(0 0 0 / 10%)',
    },
    header: {
      padding: 3
    },
    avatar: {
      height: 25,
      width: 25
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


export default ({ loggedIn, title, user, attachedlinkpictitle, name, thumbnailImg, thumbnailUrl }) => {


  const classes = useStyles();
  const updateAttachedlinkpictitle = attachedlinkpictitle?.replaceAll("&lt;", "<");



  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar className={classes.avatar}>
            <img style={{ height: '25px', width: '25px' }} src={getUserAvatar(user.avatar, user.gender, user.username)} alt='' />
          </Avatar>
        }
        // action={
        //   <IconButton>
        //     <MoreVert />
        //   </IconButton>
        // }
        title={
          <Link to={loggedIn ? `/${user.username}` : '/signup'} style={{ color: '#000000' }}>
            <h5>
              {user.name.join(' ')}
            </h5>
          </Link>
        }
      // subheader={<When date={date} />}
      />
      <span className='home-search-notes'>
        <img className="profile-photo-tabs-img"
          src={(thumbnailImg === "default.png") ? Note : getUrl(thumbnailUrl, user?.username)}
          alt={title} />
      </span>

      <CardContent className={classes.title}>
        {/* <img className={classes.img} src={Note} alt={title} /> */}
        <Typography
          style={{ color: '#000000', fontSize: '16px' }}
          color='textSecondary'
          component='p'
          variant='p'
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
