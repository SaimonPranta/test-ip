import React from "react";
import "./list-dropdown.style.scss";
import axios from "axios";
import { BACKEND_URL } from "../../../../shared/constants/Variables";
import { userHeader } from "../../../../shared/functions/Token";

export const ReelListDropdown = ({
  data,
  setDropdownItemActive,
  setShowListDropdown,
}) => {
  const handleAddDropdownData = (item, index) => {
    if (item.name === "Edit") {
      setDropdownItemActive((prevState) => {
        return {
          ...prevState,
          edit: true,
        };
      });
      setShowListDropdown((prevState) => {
        return {
          ...prevState,
          actionOption: false,
        };
      });
    }
    if (item.name === "Delete") {
      console.log("Delete");
    }
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
