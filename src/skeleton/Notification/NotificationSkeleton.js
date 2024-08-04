import React from 'react'

import "./style.scss"

const NotificationSkeleton = () => {
    return (
        <div className='notification-skeleton-section'>
            <div className='skeleton skeleton-small-text'></div>

            <div className='skeleton skeleton-notifications'></div>
            <div className='skeleton skeleton-notifications'></div>
            <div className='skeleton skeleton-notifications'></div>
            <div className='skeleton skeleton-notifications'></div>
            <div className='skeleton skeleton-notifications'></div>
            <div className='skeleton skeleton-notifications'></div>
            <div className='skeleton skeleton-notifications'></div>
            <div className='skeleton skeleton-notifications'></div>
            <div className='skeleton skeleton-notifications'></div>
            <div className='skeleton skeleton-notifications'></div>

        </div>
    )
}

export default NotificationSkeleton;
