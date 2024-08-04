import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Link, NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { MdNotifications } from "react-icons/md";
import { categories, categories2 } from "./helper/variables";
import { useHistory } from "react-router-dom";
import { addClass, removeClass } from "./helper/utilities";
import socket from "../../sockets";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../sockets/emit";
import { getUserAvatar } from "../../shared/functions";
import { campaignAllCampaign } from "../../store/campaign/action";
// import { getUserAvatar } from "../../components/SideNavigation/Components/RegistrationidCard/CardDiv";

const Index = () => {
  const [search, setSearch] = useState("");
  const [offset] = useState(0);

  const {
    notification,
    auth: {
      user: { username, avatar, gender, approved, banned, rejected },
      counts,
    },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const allUnsentNotifications = [];

  const {
    push,
    location: { pathname },
  } = useHistory();

  useEffect(() => {
    let mount = false;
    if (!mount) {
      getNotifications(offset);
    }

    return () => {
      mount = true;
    };
  }, [offset]);

  socket.on("push_notifications", (notifications) => {
    allUnsentNotifications.push(notifications);
  });

  notification.map((notification) => {
    if (!notification.seen) {
      allUnsentNotifications.push(notification);
    }
  });

  const onSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    push(`/search?tab=people&query=${search}`);
    setSearch("");
  };

  return (
    <div className="side-navigation-container">
      <div className="side-container">
        <div className="">
          <div className="top-img ">
            {pathname.split("/")[1] === username ? (
              <Link to="newsfeed">
                <p>Newsfeed</p>
              </Link>
            ) : (
              <Link to={`/${username}`}>
                <img src={getUserAvatar(avatar, gender, username)} alt="logo" />
              </Link>
            )}
          </div>

          <div className="top-categories">
            <div className="top text-style">
              <div className="reports-balance ">
                <a />
                <NavLink to="/balance">Balance</NavLink>
              </div>
              <div className="reports-balance small-gap">
                <NavLink to="/mail">
                  Mail
                  <span className="count-section">0</span>
                </NavLink>
                <NavLink to="/notifications">
                  <MdNotifications />
                  <span className="count-section">0</span>
                </NavLink>

                <NavLink to="/messenger" className="messenger">
                  Messenger
                  <span className="count-section">0</span>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="search-section">
            <form id="profile-inner-search" onSubmit={onSearch}>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={addClass}
                onBlur={removeClass}
              />
              <button>
                <BiSearch />
              </button>
            </form>
          </div>
        </div>

        <div className="navigator-section big-gap">
          <ul>
            {categories2.map(({ route, name, icon }, index) => {
              if (name === "Campaigns") {
                return (
                  <li
                    onClick={() => {
                      dispatch(campaignAllCampaign([]));
                    }}
                    key={index.toString}
                  >
                    <NavLink to={`/${route}`}>
                      <p className="text-style">{name}</p>
                    </NavLink>
                  </li>
                );
              } else {
                return (
                  <li key={name.toString}>
                    <NavLink to={`/${route}`}>
                      <p className="text-style">{name}</p>
                    </NavLink>
                  </li>
                );
              }
            })}
          </ul>

          <ul>
            {categories.map(({ route, name, icon }) => {
              if (name === "Campaigns") {
                return (
                  <li
                    onClick={() => {
                      dispatch(campaignAllCampaign([]));
                    }}
                    key={name.toString}
                  >
                    <NavLink to={`/${route}`}>
                      <p className="text-style">{name}</p>
                    </NavLink>
                  </li>
                );
              } else {
                return (
                  <li key={name.toString}>
                    <NavLink to={`/${route}`}>
                      <p className="text-style">{name}</p>
                    </NavLink>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
