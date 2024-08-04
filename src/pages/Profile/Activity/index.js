/* eslint-disable import/no-anonymous-default-export */
 
import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@material-ui/core';
import axios from 'axios';

import { deletePost, deleteComment, deleteReply, unreactPost } from '../../../sockets/emit';
import { BACKEND_URL } from '../../../shared/constants/Variables';
import { userHeader } from '../../../shared/functions/Token';
import { When } from '../../../components';
import { Spinner } from '../../../shared';
import { getActivities } from '../Hooks';
import Header from '../Header';
import './style.scss';

export default ({ isMe }) => {
  document.title = 'Activities';
  const { counts, activity, setActivity, working } = getActivities();
  function remove(id) {
    setActivity(activity.filter((i) => i.id !== id));
    axios
      .delete(`${BACKEND_URL}/profile/activity/${id}`, { headers: userHeader() })
      .then(() => {})
      .catch((e) => {
        throw e;
      });
  }
  function unReact(id, postId) {
    unreactPost(postId);
    remove(id);
  }
  function unComment(id, postId, commentId) {
    deleteComment(postId, commentId);
    remove(id);
  }
  function unReply(id, postId, commentId, replyId) {
    deleteReply(postId, commentId, replyId);
    remove(id);
  }
  function unHide(id, postId) {
    axios
      .put(`${BACKEND_URL}/profile/activity/show/${postId}`, { headers: userHeader() })
      .then(() => {})
      .catch((e) => {
        throw e;
      });
    remove(id);
  }
  function unPost(id, postId) {
    deletePost(postId);
    remove(id);
  }
  if (working) {
    return <Spinner height={30} />;
  }
  return (
    <div>
      <Header counter={counts} title='Activity Log' isMe={isMe} />
      <List className='activities'>
        {activity.map((item) => {
          if (item.type === 'react') {
            return (
              <ListItem key={item.id}>
                <ListItemText style={{marginTop:"0"}} primary={`You reacted to ${item.poster}'s post.`} secondary={<When date={item.date} />} />
                <ListItemSecondaryAction>
                  <Button variant='contained' style={{background:"#3f51b5", color:"white", textTransform:"none", textShadow:"none"}} onClick={() => unReact(item.id, item.post)}>
                    Undo React
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          } else if (item.type === 'post') {
            return (
              <ListItem key={item.id}>
                <ListItemText style={{marginTop:"0"}}
                  primary={`You posted on ${item.group ? item.group.name : 'your timeline'}.`}
                  secondary={<When date={item.date} />}
                />
                <ListItemSecondaryAction>
                  <Button size='small' variant='contained' style={{background:"#3f51b5", color:"white", textTransform:"none", textShadow:"none"}} onClick={() => unPost(item.id, item.post)}>
                    Delete Post
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          } else if (item.type === 'comment') {
            return (
              <ListItem key={item.id}>
                <ListItemText style={{marginTop:"0"}} primary={`You commented to ${item.poster}'s post.`} secondary={<When date={item.date} />} />
                <ListItemSecondaryAction>
                  <Button variant='contained' style={{background:"#3f51b5", color:"white", textTransform:"none", textShadow:"none"}} onClick={() => unComment(item.id, item.post, item.comment)}>
                    Delete Comment
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          } else if (item.type === 'reply') {
            return (
              <ListItem key={item.id}>
                <ListItemText style={{marginTop:"0"}}
                  primary={`You replies to ${item.commenter}'s comment on ${item.poster}'s post.`}
                  secondary={<When date={item.date} />}
                />
                <ListItemSecondaryAction>
                  <Button variant='contained' style={{background:"#3f51b5", color:"white", textTransform:"none", textShadow:"none"}} onClick={() => unReply(item.id, item.post, item.comment, item.reply)}>
                    Delete Reply
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          } else if (item.type === 'hide') {
            return (
              <ListItem key={item.id}>
                <ListItemText style={{marginTop:"0"}} primary={`You hided your post.`} secondary={<When date={item.date} />} />
                <ListItemSecondaryAction>
                  <Button variant='contained' style={{background:"#3f51b5", color:"white", textTransform:"none", textShadow:"none"}} onClick={() => unHide(item.id, item.post)}>
                    Show
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          } else {
            return <span />;
          }
        })}
      </List>
    </div>
  );
};
