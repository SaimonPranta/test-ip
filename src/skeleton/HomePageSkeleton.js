import React from "react";
import "./HomeSkeleton.scss";

const HomePageSkeleton = () => {
  const token = localStorage.getItem("u_t");

  return (
    <div>
      {token ? (
        <div className="profile-avater skeleton"></div>
      ) : (
        <div className="login-button">
          <button type="button" className="skeleton-button skeleton"></button>
        </div>
      )}

      <div className="search-container">
        <div className="home-page-logo skeleton"></div>
        <div className="skeleton skeleton-text mr-2 ml-2 "> </div>

        <button type="button" className="search-button skeleton"></button>
      </div>

      <div className="bottom-container">
        <div className="support-section skeleton"></div>

        <div className="bottom-section">
          <div className="ip-area">
            <button type="button" className="search-button skeleton"></button>
          </div>
          <div className="terms-and-policy">
            <button type="button" className="search-button skeleton"></button>
            <button type="button" className="search-button skeleton"></button>
            <button type="button" className="search-button skeleton"></button>
          </div>
        </div>
      </div>
      {/* <div>
        <img className="header-img skeleton" src={skeletonImg} />
      </div> */}
    </div>
  );
};

export default HomePageSkeleton;
