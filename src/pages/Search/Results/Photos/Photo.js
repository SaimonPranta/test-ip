import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles, Card, CardHeader, CardContent, Avatar, Typography } from '@material-ui/core';

import { getUserAvatar, getUrl } from '../../../../shared/functions';
import { When } from '../../../../components';

import "../style.scss"

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 290,
      margin: '15px',
      boxShadow: '1px 1px 1px -1px rgb(0 0 0 / 20%), 0px 0px 1px 1px rgb(0 0 0 / 10%)',
    },
    header: {
      padding: 3
    },
    avatar: {
      height: 30,
      width: 30
    },
    media: {
      height: 139,
    },
    title: {
      padding: 10
    },
  })
);

export default ({ postId, id, url, privacy, date, pictitle, title, user, attachedlinkpictitle }) => {
  const classes = useStyles();

  const updateAttachedlinkpictitle = attachedlinkpictitle?.replaceAll("&lt;", "<")




  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar className={classes.avatar}>
            <img style={{ height: '30px', width: '30px' }} src={getUserAvatar(user.avatar, user.gender, user.username)} alt='' />
          </Avatar>
        }
        // action={
        //   <IconButton>
        //     <MoreVert />
        //   </IconButton>
        // }
        title={
          <Link to={`/${user.username}`} style={{ color: '#000000' }}>
            <Typography variant='h6' component='h6'>
              {user.name.join(' ')}
            </Typography>
          </Link>
        }
        subheader={<When date={date} />}
      />

      <Link to={`/${user.username}/timeline?post=${postId}`} style={{ color: '#000000' }}>

        {/* <CardMedia className={classes.media} image={getUrl(url, user.username)} title={title} /> */}
        <img className="profile-photo-tabs-img" alt="" src={getUrl(url, user.username)} />

      </Link>

      <CardContent className={classes.title}>
        <Typography style={{ color: '#000000', fontSize: '16px' }} variant='span' color='textSecondary' component='span'>
          {/* old code */}
          {/* {title} */}

          {/* new code */}
          {/* {pictitle} */}
          {
            updateAttachedlinkpictitle?.includes('<script') ? " "
              :
              updateAttachedlinkpictitle?.includes('<a') ?
                <div dangerouslySetInnerHTML={{ __html: updateAttachedlinkpictitle }}></div> : pictitle
          }
        </Typography>
      </CardContent>



      {/* old code here is share button  */}
      {/* <CardActions disableSpacing>
        <IconButton>{privacy === 'private' ? <Lock /> : privacy === 'friends' ? <People /> : <Public />}</IconButton>
        <IconButton>
          <Share />
        </IconButton>
      </CardActions> */}


    </Card>
  );
};
