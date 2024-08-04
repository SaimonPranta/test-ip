import React from "react";
import { Wc } from "@material-ui/icons";

import { Works, WorkItem } from "../style";
import Relation from "./Relation";
import Family from "./Family";
import Dob from "./Dob";
import GenderIcon from "../../../../assets/about/Gender.png";
import Nickname from "./Nickname";
import Religion from "./Religion";
import Language from "./Language";
import Political from "./Political";
import Interested from "./Interested";
import Color from "./Color";
import AditionalInformation from "./aditionalInformation";

import InterestedIcon from '../../../../assets/about/Interested.png';
import Height from '../../../../assets/about/Height.png';
import Weight from '../../../../assets/about/Weight.png';
import BloodGroup from '../../../../assets/about/Blood_Group.png';
import SkinColor from '../../../../assets/about/Skin_Color.png';
import EyeColor from '../../../../assets/about/Eye_Color.png';
import Disability from '../../../../assets/about/Disability.png';
import FavouriteFood from '../../../../assets/about/Favourite_Food.png';
import FuturePlan from '../../../../assets/about/Future_Plan.png';
import Goal from '../../../../assets/about/Goal.png';
import Personality from '../../../../assets/about/Personality.png';
import Idol from '../../../../assets/about/Idol.png';
import Hobby from '../../../../assets/about/Hobby.png';
import socialStatus from '../../../../assets/about/Personality.png';
import SocialMedia from '../../../../assets/about/Social_Media.png';
import Like from '../../../../assets/about/Choice.png';
import disLike from '../../../../assets/about/Disfavor.png';
import SpecialSkill from '../../../../assets/about/Special_Skill.png';
import MonthlySalary from '../../../../assets/about/Monthly_Salary.png';
import NetWorth from '../../../../assets/about/Net_Worth.png';
import BadHabit from '../../../../assets/about/Bad_Habit.png';
import GoodHabit from '../../../../assets/about/Good_Habit.png';
import FavoritePlace from '../../../../assets/about/Favorite_Place.png';


export default ({ about, isMe, setAbout, username, additionalInformation, setAdditionalInformation }) => {
  function setFamily(family) {
    setAbout({
      ...about,
      family,
    });
  }
  function setDobPrivacy(p) {
    setAbout({
      ...about,
      dob: {
        ...about.dob,
        privacy: p,
      },
    });
  }
  function setRelation(relation) {
    setAbout({
      ...about,
      relation,
    });
  }
  function setNickname(nickname) {
    setAbout({
      ...about,
      nickname,
    });
  }
  function setReligion(religion) {
    setAbout({
      ...about,
      religion,
    });
  }
  function setLanguage(language) {
    setAbout({
      ...about,
      language,
    });
  }
  function setPolitics(politics) {
    setAbout({
      ...about,
      politics,
    });
  }
  function setInterest(interest) {
    setAbout({
      ...about,
      interest,
    });
  }
  function setColor(color) {
    setAbout({
      ...about,
      color,
    });
  }

  function setAdditionalInformations(realtimeInfo, infoTag) {

    setAdditionalInformation({
      ...additionalInformation,
      [infoTag]: realtimeInfo
    })

  }


  return (
    <>
      <h2>Basic Info</h2>

      <Works>
        <WorkItem>
          <div className="a">
            <img src={GenderIcon} alt="" />
          </div>
          <div className="m">
            <h3>{about.gender}</h3>
            <div className="d">Gender</div>
          </div>
          <span style={{ flex: "1 1 auto" }}></span>
          <span></span>
        </WorkItem>
      </Works>

      <Dob dob={about.dob} setPrivacy={setDobPrivacy} isMe={isMe} />

      <Nickname
        nickname={about.nickname}
        setNickname={setNickname}
        isMe={isMe}
      ></Nickname>

      <Religion
        religion={about.religion}
        setReligion={setReligion}
        isMe={isMe}
      ></Religion>

      <Language
        language={about.language}
        setLanguage={setLanguage}
        isMe={isMe}
      ></Language>
      <Political
        politics={about.politics}
        setPolitics={setPolitics}
        isMe={isMe}
      ></Political>
      <Interested
        interest={about.interest}
        setInterest={setInterest}
        isMe={isMe}
      ></Interested>




      {/* adding area for aditional information adding */}
      <AditionalInformation data={additionalInformation?.height} infoTag="height" tag="Height" icon={Height}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>
      <AditionalInformation data={additionalInformation?.weight} infoTag="weight" tag="Weight" icon={Weight}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>
      <AditionalInformation data={additionalInformation?.bloodGroup} infoTag="bloodGroup" tag="Blood Group" icon={BloodGroup}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.skinColor} infoTag="skinColor" tag="Skin Color" icon={SkinColor}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.eyeColor} infoTag="eyeColor" tag="Eye Color" icon={EyeColor}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.disability} infoTag="disability" tag="Disability" icon={Disability}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.food} infoTag="food" tag="Favourite Food" icon={FavouriteFood}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.plan} infoTag="plan" tag="Future Plan" icon={FuturePlan}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.goals} infoTag="goals" tag="Goal" icon={Goal}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>


      <AditionalInformation data={additionalInformation?.personality} infoTag="personality" tag="Personality" icon={Personality}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.idols} infoTag="idols" tag="Idol" icon={Idol}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.hobby} infoTag="hobby" tag="Hobby" icon={Hobby}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.socialStatus} infoTag="socialStatus" tag="Social Status" icon={InterestedIcon}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.socialMediaInteraction} infoTag="socialMediaInteraction" tag="Social Media Interaction" icon={SocialMedia}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.likes} infoTag="likes" tag="Choice" icon={Like}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.dislikes} infoTag="dislikes" tag="Disfavor" icon={disLike}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.specialSkills} infoTag="specialSkills" tag="Special Skill" icon={SpecialSkill}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.monthlySalary} infoTag="monthlySalary" tag="Monthly Salary" icon={MonthlySalary}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.netWorth} infoTag="netWorth" tag="Net Worth" icon={NetWorth}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.goodHabits} infoTag="goodHabits" tag="Good Habit" icon={GoodHabit}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>

      <AditionalInformation data={additionalInformation?.badHabits} infoTag="badHabits" tag="Bad Habit" icon={BadHabit}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>


      <AditionalInformation data={additionalInformation?.favoritePlace} infoTag="favoritePlace" tag="Favorite Place" icon={FavoritePlace}
        setAdditionalInformations={setAdditionalInformations}
        isMe={isMe}>
      </AditionalInformation>



      <Color color={about.color} setColor={setColor} isMe={isMe}></Color>

      <h2>Family members</h2>

      {(isMe() || about?.family?.length > 0) && (
        <Family
          family={about?.family || []}
          setFamily={setFamily}
          isMe={isMe}
        />
      )}

      {(isMe() || Object.keys(about?.relation || {}).length > 1) && (
        <>
          <h2>Relationship</h2>
          <Relation
            relation={about?.relation}
            setRelation={setRelation}
            isMe={isMe}
          />
        </>
      )}
    </>
  );
};
