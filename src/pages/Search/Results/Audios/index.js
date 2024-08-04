import React from 'react';


import { Gallery } from '../../style';
import Empty from '../Empty';
import Audio from './Audio';

export default ({ audios = [], search }) => {
  if (audios.length > 0) {
    return (
      <Gallery>
      

        {audios.map((item) => (
          <Audio key={item.id} {...item} />
        ))}
      </Gallery>
    );
  } else {
    return <Empty tab='Audios' tag={search} />;
  }
};
