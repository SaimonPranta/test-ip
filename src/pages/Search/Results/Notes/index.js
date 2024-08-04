import React from 'react';


import { Gallery } from '../../style';
import Empty from '../Empty';
import Note from './Note';

export default ({ notes = [], search }) => {
  


  if (notes.length > 0) {
    return (
      <Gallery>
         
        {notes.map((item) => (
          <Note key={item.id} {...item} />
        ))}
      </Gallery>
    );
  } else {
    return <Empty tab='Notes' tag={search} />;
  }
};
