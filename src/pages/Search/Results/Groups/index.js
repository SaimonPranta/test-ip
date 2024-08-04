import React from 'react';

import { Group } from '../../../../components';
import Empty from '../Empty';
import { Gropus } from '../../style';



export default ({ groups, setGroups, search, isMe }) => {

  function editGroup(id, data) {
    setGroups(
      groups.map((i) => {
        if (i.id === id) {
          return {
            ...i,
            ...data,
          };
        }
        return i;
      })
    );
  }
  if (groups.length > 0) {
    return (
      <Gropus>
        
        {groups.map((group, index) => (
          <Group
            group={group}
            isMe={isMe}
            setGroup={(data) => editGroup(group.id, data)}
            key={group.id}
            index={index}
            // username={username}
            // thumbnailImageFromDb={group?.thumbnailImg}
            // thumbnailImageUrl={group?.thumbnailImgUrl}
          />
        ))}
      </Gropus>
    );
  } else {
    return <Empty tab='Groups' tag={search} />;
  }
};
