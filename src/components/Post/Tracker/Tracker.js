import React from 'react';

import "./Tracker.scss"

const Tracker = ({ views, clicks, engagement }) => {

    return (
        <div className='post-tracker-section'>

            <div className='total-views'>
                <h5 className='number'>{views}</h5>
                <span className='text'>Views</span>
            </div>

            <div className='total-click'>
                <h5 className='number'>{clicks}</h5>
                <span className='text'>Clicks</span>
            </div>

            <div className='total-engagement'>
                <h5 className='number'>{engagement}</h5>
                <span className='text'>Engagement</span>
            </div>

        </div>
    )
}

export default Tracker
