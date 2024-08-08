import React from "react";
import "./list-dropdown.style.scss";
import axios from "axios";
import { BACKEND_URL } from "../../../../shared/constants/Variables";
import { userHeader } from "../../../../shared/functions/Token";

const ListDropdown = ({
  data,
  dropdownData,
  setDropdownData,
  showListDropdown,
  setShowListDropdown,
  type,
  totalDataItem,
  setTotalDataItem,
  activeItem,
  deletedId,
  setOpenModal,
  openModal,
  render,
  setRender
}) => {
  const handleAddDropdownData = (item, index) => {
    if (type === "privacy") {
      setDropdownData(item);
      setShowListDropdown((prevState) => {
        return { ...prevState, privacy: false };
      });

      let updatedValue = [...totalDataItem];

      updatedValue = updatedValue.map((story, storyIndex) => {
        if (activeItem === storyIndex) {
          story.privacy = item.name;
        }
        return story;
      });

      setTotalDataItem(updatedValue);
    }
    
    if (type === "duration") {
      setDropdownData(item);
      setShowListDropdown((prevState) => {
        return { ...prevState, duration: false };
      });

      let updatedValue = [...totalDataItem];

      updatedValue = updatedValue.map((story, storyIndex) => {
        if (activeItem === storyIndex) {
          story.duration = getFutureDate(item.value);
        }
        return story;
      });

      setTotalDataItem(updatedValue);
    }

    if (type === "actionOption") {
      setShowListDropdown((prevState) => {
        return { ...prevState, actionOption: false };
      });

      axios
        .delete(`${BACKEND_URL}/profile/story/delete-story/${deletedId}`, {
          headers: userHeader(),
        })
        .then((data) => {
          setOpenModal(!openModal);
          setRender(!render)
        })
        .catch((err) => {
        });
    }
  };

  const getFutureDate = (days) => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + days);

    return futureDate;
  };

  return (
    <div className="list-dropdown">
      <ul className="list-items">
        {data.map((item, index) => {
          return (
            <li key={index} onClick={() => handleAddDropdownData(item, index)}>
              <div className="icon">
                <item.Icon />
              </div>
              <p>{item.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListDropdown;
