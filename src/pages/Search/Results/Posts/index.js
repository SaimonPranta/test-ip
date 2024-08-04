import React from 'react';

import { Post } from '../../../../components';

import Empty from '../Empty';

export default ({ posts = [], search }) => {
  if (posts.length > 0) {



    //new old code
    // return posts.map((item) => <Post key={item.id} {...item} />);
    return <div>


      {
        posts.map((item) => <Post key={item.id} {...item} />)
      }
    </div>

  } else {
    return <Empty tab='Posts' tag={search} />;
  }
};
