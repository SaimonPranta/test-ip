import { Avatar, Button, Dialog, DialogActions, DialogContent, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React from 'react';

import { getUserAvatar } from '../../../../shared/functions';

export default ({ open, close, action, user, type = 'video' }) => {
  function answer() {
    action();
    close();
  }
  return (
    <Dialog open={open} fullWidth maxWidth='sm'>
      <DialogContent dividers>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={getUserAvatar(user.avatar, user.gender, user.username)} alt={user.username} />
            </ListItemAvatar>
            <ListItemText primary={`Incoming ${type} from ${user.name?.join(' ')} (${user.username})`} />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button size='small' onClick={close}>
          Cancel
        </Button>
        <Button size='small' variant='contained' color='primary' onClick={answer}>
          Answer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
