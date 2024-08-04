import React from 'react';

import "./style.scss";

const HomeSearchGrid = () => {

    return (

        <div className='home-search-skeleton-section'>

            <div className='profile-container '>
                <div className='profile-avater skeleton'></div>
                <div className='skeleton skeleton-small-text'></div>
            </div>

            <div className='home-search-image-skeleton skeleton'></div>
            <div className='title-skeleton'>
                <div className='skeleton skeleton-small-text'></div>
            </div>

        </div>

    )
}

export default HomeSearchGrid;
