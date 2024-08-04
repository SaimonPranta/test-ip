import React from 'react';

import School from './School';
import College from './College';
import University from './University';

export default ({ educations, isMe, setInstitute }) => {
  function setSchools(schools) {
    setInstitute({
      ...educations,
      schools,
    });
  }
  function setColleges(colleges) {
    setInstitute({
      ...educations,
      colleges,
    });
  }
  function setUniversities(universities) {
    setInstitute({
      ...educations,
      universities,
    });
  }
  return (
    <>
      <h2>Education</h2>
      {!isMe() && educations?.schools?.length < 1 && educations?.colleges?.length < 1 && educations?.universities?.length < 1 && (
        <p>Education Does not Add Yet.</p>
      )}
      <School schools={educations?.schools || []} setSchools={setSchools} isMe={isMe} />
      <College colleges={educations?.colleges || []} setColleges={setColleges} isMe={isMe} />
      <University universities={educations?.universities || []} setUniversities={setUniversities} isMe={isMe} />
    </>
  );
};
