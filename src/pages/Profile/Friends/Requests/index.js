import React from "react";
import { withRouter } from "react-router-dom";
import { parse } from "query-string";

import { NoItem, RequestLink } from "../../style";
import { People } from "../../../../components";
import { Spinner } from "../../../../shared";
import { getFriendReq } from "../../Hooks";


import "./style.scss"
import PeopleSkeleton from "../../../../skeleton/ProfileSearch/PeopleSkeleton";

function Requests({ location, match: { url } }) {
  document.title = "Requests";
  const { tab } = parse(location.search);
  const { working, requests, setRequests } = getFriendReq(tab);

  // console.log("requested friend -------" ,requests);
  function editRequest(user) {
    const newFriends = requests.map((i) => {
      if (i.id === user.id) {
        i = user;
      }
      return i;
    });
    setRequests(newFriends);
  }
  return (
    <>
      <RequestLink
        to={tab !== "sent" ? `${url}?tab=sent` : `${url}?tab=received`}
      >
        {tab !== "sent" ? "Sent Requests" : "Received Requests"}
      </RequestLink>
      {tab === "sent" ?

        <div className="request-section">
          {

            working ?
              <>
                {
                  Array.apply(null, new Array(10))?.map((item, index) => (
                    <PeopleSkeleton key={index} />
                  ))
                }
              </>
              :
              <>
                {requests.map((user) => (
                  <People
                    user={user}
                    setPeople={editRequest}
                    key={user.id}
                    onRemove={(id) =>
                      setRequests(requests.filter((i) => i.id !== id))
                    }
                  />
                ))}
              </>

          }
        </div>

        :

        <div className="request-section">
          {
            working ?
              <>
                {/* <Spinner height={30} /> */}
                {
                  Array.apply(null, new Array(10))?.map((item, index) => (
                    <PeopleSkeleton key={index} />
                  ))
                }
              </>
              :
              <>
                {
                  requests.map((user) => (
                    <People
                      user={user}
                      setPeople={editRequest}
                      key={user.id}
                      onRemove={(id) =>
                        setRequests(requests.filter((i) => i.id !== id))
                      }
                    />
                  ))
                }
              </>
          }


        </div>


      }
      {/* {
        working &&

        <Spinner height={30} />

      } */}
      {requests.length < 1 && !working && (
        <NoItem>{/* <span>No requests.</span> */}</NoItem>
      )}
    </>
  );
}

export default withRouter(Requests);
