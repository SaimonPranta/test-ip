import React from 'react'

import "./style.scss"

const PeopleSkeleton = () => {

    return (

        <div className='people-tab-skeleton-section'>

            <div className='people-tab-container'>

                <div className='profilename-and-avater'>
                    <div className='profile-avater skeleton'></div>
                    <div className='profile-name-container'>
                        <div className='profile-name skeleton'></div>
                        <div className='work skeleton'></div>
                        <div className='education skeleton'></div>
                    </div>
                </div>

                <div className='skeleton-button-section'>
                    <div className='skeleton-btn skeleton'></div>
                    <div className='skeleton-btn skeleton'></div>
                </div>
            </div>

        </div>

    )
}

export default PeopleSkeleton
