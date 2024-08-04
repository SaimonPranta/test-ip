import React from "react";

import { People } from "../../../../components";
import { Spinner } from "../../../../shared";
import { getFriends } from "../../Hooks";
import { NoItem } from "../../style";
import PeopleSkeleton from "../../../../skeleton/ProfileSearch/PeopleSkeleton"
import "./style.scss";

export default ({ username }) => {
  const { friends, working, setFriends } = getFriends(username);
  // console.log("FIREND friend -------" ,friends);

  function editFriends(user) {
    const newFriends = friends.map((i) => {
      if (i.id === user.id) {
        i = user;
      }
      return i;
    });
    setFriends(newFriends);
  }
  return (
    <>
      <div >


        {
          working ?

            // <Spinner height={30} />
            <div className="friends-skeleton-section">

              {
                Array.apply(null, new Array(10))?.map((item, index) => (
                  <PeopleSkeleton key={index} />
                ))
              }
            </div>
            :
            <div className="people">
              {friends?.map((friend) => (

                <People
                  user={friend}
                  key={friend.id}
                  setPeople={editFriends}
                  onRemove={(id) => setFriends(friends.filter((i) => i.id !== id))}
                />

              ))}
            </div>
        }


      </div>
      {friends?.length < 1 && !working && (
        <NoItem>{/* <span>No followers.</span> */}</NoItem>
      )}
    </>
  );
};
