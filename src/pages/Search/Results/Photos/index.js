import React from 'react';


import { Gallery } from '../../style';
import Empty from '../Empty';
import Photo from './Photo';

export default ({ photos = [], search }) => {

  if (photos.length > 0) {
    return (
      <Gallery>
        
        {photos.map((item) => (
          <Photo key={item.id} {...item} />
        ))}
      </Gallery>
    );
  } else {
    return <Empty tab='Photos' tag={search} />;
  }
};
