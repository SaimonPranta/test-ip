import React from "react";
import './styles.scss'

// import Empty from '../../../Search/Results/Empty';
import Photo from './Photo';
import DisplayAds from '../ads/display/DisplayAds';

const Index = ({ photos = [], search, loggedIn }) => {
  if (photos.length > 0) {
    return (
      <>
        {/* <HomeSearch > */}
        <div className="home-search">

        {photos.map((item) => (

          item?.adStatus ?
            <DisplayAds key={item.id} item={item} loggedIn={loggedIn} />
            :
            <Photo loggedIn={loggedIn} key={item.id} {...item} />


        ))}
        </div>
      {/* </HomeSearch> */}
      </>
    );
  } else {
    return (
      <>
        <h2>Comment empty</h2>
        {/* <Empty tab="Photos" tag={search} /> */}
      </>
    );
  }
};
export default Index;