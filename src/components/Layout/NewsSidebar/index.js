import React, { useEffect, useState } from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { Badge } from "@material-ui/core";
import { connect } from "react-redux";

import { 
  StoreIcon,
  CampaignsIcon,
  ShortenerIcon,
  LockerIcon,
  SharePlaceIcon,
  LookingForIcon,
  ProjectIcon,
  AssistantIcon,
  InvestorIcon,
  Video, 
  Feature,
} from "../../../assets/categories";

import {
  NotificationIcon,
  FeedIcon,
  MailIcon,
  MessengerIcon,
  ReportsIcon,
  BalanceIcon
} from "../../../assets/feed";

import { Search } from "@material-ui/icons";

import { getNotifications } from "../../../sockets/emit";

import { getUserAvatar } from "../../../shared/functions";
import { HoverOver } from "../../Tools";
import "./style.scss";
import socket from "../../../sockets";


const Categories = [
  {
    icon: Video,
    name: "Watch",
    title: "Comming Soon",
    route: "watch",
  },
  {
    icon: StoreIcon,
    name: "Store",
    title: "Comming Soon",
    route: "stores",
  },
  {
    icon: CampaignsIcon,
    name: "Campaigns",
    title: "Comming Soon",
    route: "campaigns",
  },
  {
    icon: ShortenerIcon,
    name: "Shortener",
    title: "Comming Soon",
    route: "shortener",
  },
  {
    icon: LockerIcon,
    name: "Locker",
    title: "Comming Soon",
    route: "locker",
  },
  {
    icon: SharePlaceIcon,
    name: "Shareplace",
    title: "Not Available",
    route: "shareplace",
  },
  {
    icon: LookingForIcon,
    name: "Looking for",
    title: "Not Available",
    route: "lookingfor",
  },
  {
    icon: ProjectIcon,
    name: "Laboratory",
    title: "Not Available",
    route: "laboratory",
  },
  {
    icon: AssistantIcon,
    name: "Assistant",
    title: "Not Available",
    route: "asistant",
  },
  {
    icon: InvestorIcon,
    name: "Investor",
    title: "Not Available",
    route: "investor",
  },
];

const footerCategories = [
  {
    icon: Feature,
    name: "Improve Features",
    title: "Not Available",
    route: "feature",
  },
];


function NewsSidebar({
  location: { pathname },
  auth: {
    user: { username, avatar, gender, approved, banned, rejected },
    counts,
  },
  history,
  notifications,
}) {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("");

  useEffect(() => {}, [active]);

  const allUnsenNotifications = [];

  //getting notifications
  const [offset] = useState(0);
  useEffect(() => {
    let mount = false;
    if (!mount) {
      getNotifications(offset);
    }

    return () => {
      mount = true;
    };
  }, [offset]);

  //if any change detected on backend notification call and add new on on Unseen notifications
  socket.on("push_notifications", (notifications) => {
    allUnsenNotifications.push(notifications); 
  });

  //calculating notification an and set AllUnseenNotification
  notifications.map((notification) => {
    if (!notification.seen) {
      allUnsenNotifications.push(notification);
    }
  });

  // need href work here
  function onSearch(e) {
    e.preventDefault(); 
    if (!search) return;
    history.push(`/search?tab=people&query=${search}`); 
    setSearch(""); 
  }

  if (approved && !banned && !rejected) {
    return (
      <div>
        <div className="newsSidebar">
          {/* <div  className="newsSidebar sidebarLogoNamewith" > */}

          {/* <a
            href={
              pathname.split("/")[1] === username ? "/newsfeed" : `/${username}`
            }> */}
          <Link
            to={
              pathname.split("/")[1] === username ? "/newsfeed" : `/${username}`
            }>
            <span className="image-icon">
              <img
                className={
                  pathname.split("/")[1] === username ? "logo " : "userIcon"
                }
                src={
                  pathname.split("/")[1] === username
                    ? FeedIcon
                    : getUserAvatar(avatar, gender, username)``
                }
                alt="logo"
              />
            </span>
          </Link>

          {/* </a> */}

          <div className="socialIcons balanceSection">
            <HoverOver title="VR" placement="right">
              <Link to="/vr">
                <img src={ReportsIcon} alt="img" />
              </Link>
            </HoverOver>
            <HoverOver title="Reports" placement="right">
              <Link to="/reports">
                <img src={BalanceIcon} alt="img" />
              </Link>
            </HoverOver>
            
          </div>

          <div className="socialIcons">
            <HoverOver title="Mail" placement="right">
              <Link to="/mail">
                {/* <a href="/mail"> */}
                <img src={MailIcon} alt="img" />
              </Link>
              {/* </a> */}
            </HoverOver>
            <HoverOver title="Notifications" placement="right">
              {/* <a href="/notifications" className="notificationPositionSelect"> */}
              <Link to="/notifications">
                <img src={NotificationIcon} alt="img" />
                <span className="countNumberDesign">
                  {allUnsenNotifications.length || 0}
                </span>
              </Link>
              {/* </a> */}
            </HoverOver>
            <HoverOver title="Messanger" placement="right">
              <Link to="/messenger">
                {/* <a href="/messanger"> */}
                <img src={MessengerIcon} alt="img" />
                {/* </a> */}
              </Link>
            </HoverOver>
          </div>

          {/* need href work here */}

          <form className="search" onSubmit={onSearch}>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <Search style={{ fontSize: 20 }} />
            </button>
          </form>

          <div className="sidebar-item">
            <div className="CategoriesContainer">
              {Categories.map(({ icon, name, title, route }, i) => (
                // <HoverOver title={title} key={i}>
                <div onClick={() => setActive(route)} key={i}>
                  <NavLink
                    to={`/${route}`}
                    className="CategoriesLink"
                    style={{
                      border:
                        active === route
                          ? "1px solid #0048ba"
                          : "1px solid #e4e4e4",
                      margin: "5px 0px",
                    }}>
                    {/* <a
                    href={`/${route}`}
                    // href={`/${username}/${route}`}
                    // onClick={(e) => e.preventDefault()}
                    className="CategoriesLink"
                    style={{
                      border:
                        active === route
                          ? "1px solid #0048ba"
                          : "1px solid #e4e4e4",
                      margin: "5px 0px",
                    }}> */}

                    <img src={icon} alt="img" />
                    <span> {name}</span>
                    {/* </a> */}
                  </NavLink>
                </div>
              ))}
            </div>

            <div className="footer-CategoriesContainer">
              {footerCategories.map(({ icon, name, title, route }, i) => (
                // <HoverOver title={title} key={i}>
                <div onClick={() => setActive(route)} key={i}>
                  <Link
                    a={`/${route}`}
                    // href={`/${username}/${route}`}
                    // onClick={(e) => e.preventDefault()}
                    className="CategoriesLink"
                    style={{
                      border:
                        active === route
                          ? "1px solid #0048ba"
                          : "1px solid #e4e4e4",
                      margin: "5px 0px",
                    }}>
                    <img src={icon} alt="img" />
                    <span> {name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

      
      </div>
    );
  } else {
    return <div />;
  }
}

export default connect((store) => ({
  auth: store.auth,
  notifications: store.notification,
}))(withRouter(NewsSidebar));
