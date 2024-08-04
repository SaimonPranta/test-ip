import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share, MoreVert, Lock, People, Public } from '@material-ui/icons';
import { makeStyles, createStyles, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from '@material-ui/core';

import { getUserAvatar, getUrl } from '../../../../shared/functions';
import { Audio } from '../../../../shared/Media';
import { When } from '../../../../components';
import SearchAudioIndex from '../../../../shared/Media/Audio/SearchAudioIndex';
import ThumbPreview from './ThumbPreview';

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
    media: {
      height: '150px',
      paddingTop: 0,
    },
    title: {
      padding: 10
    },
  })
);

export default ({ id, audio, privacy, date, title, pictitle, user, duration, loggedIn, attachedlinkpictitle, thumbnailImg, thumbnailUrl }) => {
  const classes = useStyles();

  const updateAttachedlinkpictitle = attachedlinkpictitle?.replaceAll("&lt;", "<");

  const [showThumb, setShowThumb] = useState(true);

  const changeShowThumb = () => {
    setShowThumb(false);
  }


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
            <Typography variant='h5' component='h5'>
              {user.name.join(' ')}
              {/* {user.username} */}
            </Typography>
          </Link>
        }
      // subheader={<When date={date} />}
      />

      <CardMedia className={classes.media} image={audio} title={title}>

        {
          showThumb ?
            <ThumbPreview changeShowThumb={changeShowThumb} thumbnailImg={thumbnailImg} thumbnailUrl={thumbnailUrl} username={user.username} />
            :
            <SearchAudioIndex src={getUrl(audio, user.username)} title={title} duration={duration} />
        }

      </CardMedia>

      <CardContent className={classes.title}>
        <Typography style={{ color: '#000000', fontSize: '16px', fontWeight: '500' }} variant='span' color='textSecondary' component='span'>
          {
            updateAttachedlinkpictitle?.includes('<script') ? " "
              :
              updateAttachedlinkpictitle?.includes('<a') ?
                <div dangerouslySetInnerHTML={{ __html: updateAttachedlinkpictitle }}></div> : pictitle
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
