import React from 'react';

import { Gallery } from '../../style';
import Empty from '../Empty';
import Video from './Video';

export default ({ videos = [], search }) => {

  if (videos.length > 0) {
    return (
      <Gallery>


        {videos.map((item) => (
          <Video key={item.id} {...item} />
        ))}
      </Gallery>
    );
  } else {
    return <Empty tab='Videos' tag={search} />;
  }
};
