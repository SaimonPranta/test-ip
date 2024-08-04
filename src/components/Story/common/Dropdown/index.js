import React, {useState} from 'react';
import "./dropdown.style.scss"
import {IoMdArrowDropdown} from "react-icons/io";

const Index = ({data, activeText, setSelectedData, selectedData, Icon, type, activeStory, setTotalStories, totalStories}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const handleSelectDropdownItem = (item) => {
    
        setShowDropdown(!showDropdown);
        setShowDropdown(!showDropdown);
       
        let updatedValue = [...totalStories];

        updatedValue = updatedValue.map((story, index) => {
          if (index === activeStory) {
            let updateText = [...story.texts];
            updateText = updateText.map((text, index) => {
              if (activeText === index) {
                text[type] = item;
                setSelectedData(item)
              }
              return text;
            });
            story.texts = updateText;
          }
          return story;
        });
        setTotalStories(updatedValue);
    }

    return (
        <div className="parent">
            <div className="add-story-dropdown" onClick={() => handleDropdown()}>
                <div className="left-part">
                    <Icon />
                    <p className="title-text">{selectedData}</p>
                </div>
                <IoMdArrowDropdown />
            </div>
            {showDropdown && (
                <div className="dropdown-content">
                    <ul>
                        {data.map((name, index) => <li key={index} onClick={() => handleSelectDropdownItem(name)}>{name}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Index;