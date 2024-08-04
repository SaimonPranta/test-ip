import React from 'react'

import "./style.scss"

const GridSkeleton = () => {
    return (
        <div className='timeline-grid-skeleton-section'>
            <div className='timeline-image-skeleton skeleton'></div>

            <div className='title-skeleton'>
                <div className='skeleton skeleton-small-text'></div>
            </div>


        </div>
    )
}

export default GridSkeleton
