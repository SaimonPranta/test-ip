import React from 'react';

import { NoResult } from '../../style';

export default ({ tab, tag }) => {
  return (
    <NoResult className='fadeIn'>
      <p>
        {!!tag ? (
          <>
            Your search - <strong>{tag}</strong> - did not match any <strong>{tab}</strong>.
          </>
        ) : (
          'Please enter & search your query.'
        )}
      </p>
      <div className='sug'>Suggetions:</div>
      <ul>
        <li>Make sure that all words are spelled correctly.</li>
        <li>Try different keywords.</li>
        <li>Try more general keywords.</li>
        <li>Try fewer keywords.</li>
      </ul>
    </NoResult>
  );
};
