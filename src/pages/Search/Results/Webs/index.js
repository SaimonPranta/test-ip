import React from 'react';
import { List, ListItem, Button, Avatar } from '@material-ui/core';

import { getUserAvatar } from '../../../../shared/functions';
import Empty from '../Empty';


export default ({ webs, search }) => {
  if (webs.length > 0) {
    return (
      <List>


        {webs.map((item, i) => (
          <ListItem key={i} style={{ backgroundColor: '#fff', borderBottom: '1px solid #ccc', justifyContent: 'space-between' }}>
            <Button onClick={() => window.open(`${window.location.origin}/${item.user.username}`, 'blank')}>
              <Avatar style={{ border: '1px solid #0009' }} alt='' src={getUserAvatar(item.user.avatar, item.user.gender, item.user.username)} />
            </Button>
            <ul style={{ listStyleType: 'none' }}>
              {item.links.map((l, i) => (
                <li key={i} style={{ margin: '3px 0' }}>
                  <a href={l} target='blank'>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </ListItem>
        ))}
      </List>
    );
  } else {
    return <Empty tab='Web' tag={search} />;
  }
};
