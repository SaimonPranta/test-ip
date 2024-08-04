import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles, Card, CardHeader, CardContent, Avatar, Typography } from '@material-ui/core';
import { getUserAvatar, getUrl } from '../../../../shared/functions';

import "../style.scss"

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

export default ({ id, image, privacy, date, pictitle, title, user,
  postId, loggedIn, attachedlinkpictitle }) => {

  const classes = useStyles();

  const updateAttachedlinkpictitle = attachedlinkpictitle?.replaceAll("&lt;", "<")

  return (
    <Card className={classes.root}>

      <CardHeader
        className={classes.header}
        avatar={
          <Avatar className={classes.avatar} >
            <img style={{ height: '25px', width: '25px' }} src={getUserAvatar(user.avatar, user.gender, user.username)} alt='' />
          </Avatar>
        }


        title={
          <Link to={loggedIn ? `/${user.username}` : '/signup'} style={{ color: '#000000' }}>
            <Typography variant='h6' component='h6'>
              {user.name.join(' ')}
              {/* {user.username}  */}
            </Typography>
          </Link>
        }
      // subheader={<When date={date} />}
      />

      <Link to={loggedIn ? `/${user.username}/timeline?post=${postId}`
        : '/signup'} style={{ color: '#000000' }}>
          
        <img className="home-photo-tabs-img" alt="" src={getUrl(image, user.username)} />

      </Link>

      <CardContent className={classes.title}>
        <Typography style={{ color: '#000000', fontSize: '16px' }} variant='span' color='textSecondary' component='span'>

          {
            updateAttachedlinkpictitle?.includes('<script') ? " "
              :
              updateAttachedlinkpictitle?.includes('<a') ?
                <div dangerouslySetInnerHTML={{ __html: updateAttachedlinkpictitle }}></div> : pictitle
          }

        </Typography>
      </CardContent>

    </Card>
  );
};
