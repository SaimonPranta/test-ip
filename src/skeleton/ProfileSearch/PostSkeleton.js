import React from 'react'

import "./style.scss"

const PostSkeleton = () => {

    return (
        <div className='post-skeleton-section'>

            <div className='profile-container-section'>

                <div className='post-profile-avater'>
                    <div className='profile-avater skeleton'></div>
                    <div className='profile-name-container'>
                        <div className='profile-name skeleton'></div>
                        <div className='skeleton skeleton-time-text'></div>
                    </div>
                </div>

                <div className='proper-section skeleton'></div>
            </div>

            <div className='home-search-image-skeleton skeleton'></div>

            <div className='post-reaction-skeleton-section  skeleton'>
                <div className='reaction-skeleton skeleton'></div>
            </div>

        </div>
    )
}

export default PostSkeleton
