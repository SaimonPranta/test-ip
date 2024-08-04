import React from 'react';

import { People } from '../../../../components';
import Empty from '../Empty';
import './people.css'

export default ({ people = [], search, setPeople }) => {
  function editPeople(user) {
    const newFriends = people.map((i) => {
      if (i.id === user.id) {
        i = user;
      }
      return i;
    });
    setPeople(newFriends);
  }
  if (people.length > 0) {
    return (
      <div className='people'>
        {people.map((user) => (
          <People key={user.id} user={user} setPeople={editPeople} onRemove={(id) => setPeople(people.filter((i) => i.id !== id))} />
        ))}
      </div>
    );
  } else {
    return <Empty tab='People' tag={search} />;
  }
};
