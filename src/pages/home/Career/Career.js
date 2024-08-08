import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router"

import axios from 'axios';
import { BACKEND_URL } from '../../../shared/constants/Variables';


const Career = () => {
    const [career, setCareer] = useState({});

    const location = useLocation();


    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/admin-notes-public${location.pathname}`)
            .then(({ data }) => {
                setCareer(data.content);
            })
            .catch((err) => {
            })
    }, []);

    return (
        <div className='about-section'>
            <div className='about-container'>

                {
                     Object.keys(career).length !== 0?
                        <div className="about">
                            <div
                                className="ql-editor"
                                dangerouslySetInnerHTML={{ __html: career }}
                            />
                        </div>
                        : ""
                }

            </div>
        </div>
    )
}

export default Career
