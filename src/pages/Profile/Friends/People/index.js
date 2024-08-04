import React from "react";

import { People } from "../../../../components";
import { Spinner } from "../../../../shared";
import PeopleSkeleton from "../../../../skeleton/ProfileSearch/PeopleSkeleton";
import { getPeople } from "../../Hooks";
import { NoItem } from "../../style";

import "./style.scss"

export default () => {
  document.title = "Friend Suggests";
  const { people, working, setPeople } = getPeople();
  function editPeople(user) {
    const newFriends = people.map((i) => {
      if (i.id === user.id) {
        i = user;
      }
      return i;
    });
    setPeople(newFriends);
  }
  return (
    <div>

      {
        working ?

          // <Spinner height={30} />
          <div className="suggestion-section">
            {
              Array.apply(null, new Array(10))?.map((item, index) => (
                <PeopleSkeleton key={index} />
              ))
            }

          </div>
          :

          <div className="suggestion-section">

            {people?.map((p) => (
              <People
                user={p}
                setPeople={editPeople}
                key={p.id}
                onRemove={(id) => setPeople(people.filter((i) => i.id !== id))}
              />
            ))}
          </div>

      }



      {people.length < 1 && !working && (
        <NoItem>{/* <span>No suggetions.</span> */}</NoItem>
      )}
    </div>
  );
};
