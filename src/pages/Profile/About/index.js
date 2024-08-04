import React from "react";

import { Spinner } from "../../../shared";
import { getAbout, getAdditionalInformation } from "../Hooks";
import Education from "./Education";
import Location from "./Location";
import Personal from "./Personal";
import Contact from "./Contact";
import Header from "../Header";
import Work from "./Work";
import "./style.scss";
import Info from "./Info";
import store from '../../../store'
export default ({ username, privacy, isMe, changePrivacy, profile }) => {
  document.title = "About";
  const { about, setAbout, working } = getAbout(username);
  const { additionalInformation, setAdditionalInformation } = getAdditionalInformation(username);

  function changeAboutState(name, value) {
    setAbout({
      ...about,
      [name]: value,
    });
  }


  return (
    <div className="display-about">
      <Header
        title="About"
        isMe={isMe}
        privacy={privacy}
        changePrivacy={changePrivacy}
      />
      {working ? (
        // <Spinner height={35} />
        <></>
      ) : (
        <div className="abt-cnt">
          {/* {isMe() && ( */}
          <Info profile={profile} isMe={isMe} name={store.getState().auth.user.name} bio={store.getState().auth.user.description} />
          {/* )} */}
          {/* {(isMe() || about?.work?.length > 0) && ( */}
          <Work
            works={about.works}
            isMe={isMe}
            setWorks={(works) => changeAboutState("works", works)}
          />
          {/* )} */}

          {/* {(isMe() ||
            about.education?.school?.length > 0 ||
            about.education?.college?.length > 0 ||
            about?.education?.university?.length > 0) && ( */}

          <Education
            educations={about?.educations}
            isMe={isMe}
            setInstitute={(institutes) =>
              changeAboutState("educations", institutes)
            }
          />
          {/* )} */}
          {/* {(isMe() || Object.keys(about?.Location || {}).length > 0) && ( */}
          <Location
            location={about?.location || {}}
            isMe={isMe}
            setLocation={(l) => changeAboutState("location", l)}
          />
          {/* )} */}
          <Contact
            about={about}
            setAbout={setAbout}
            isMe={isMe}
            username={username}
          />
            <Personal additionalInformation={additionalInformation} setAdditionalInformation={setAdditionalInformation} about={about} setAbout={setAbout} isMe={isMe} username={username} />
        </div>
      )}
    </div>
  );
};
