import React, { useState } from 'react';
import "./style.scss"
import { FaInfoCircle } from 'react-icons/fa';
import { ImInfo } from 'react-icons/im';
const infoList = {
    firstName: "First name used in your government-issued ID, written in English characters. In case your name do contains digits, type digits in words",
    lastName: "Last name used in your government-issued ID, written in English characters. In case your name do contains digits, type digits in words",
    dateOfBirth: "Date of birth as listed on your government-issued ID. You must be over 18 years old to apply",
    nidNumber: "NID Number used in your government-issued ID, written in English characters and number.",
}

const Index = ({ name }) => {
    const [hoverItem, setHoverItem] = useState("")

    const removeItemName = () => {
        setHoverItem("")
    }

    return (
        <>
            {
                name === hoverItem ?
                    <FaInfoCircle className="info-item" onMouseOver={() => setHoverItem(name)} onMouseOut={removeItemName} /> :
                    <ImInfo className="info-item" onMouseOver={() => setHoverItem(name)} onMouseOut={removeItemName} />
            }

            <p className={`info-item ${name === hoverItem ? "active" : ""}`}>{infoList[name] || ""}</p>
        </>
    );
};

export default Index;