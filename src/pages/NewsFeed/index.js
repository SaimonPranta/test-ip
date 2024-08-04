import React from 'react'
import "./style.scss"
import Story from '../../components/Story'

const Feed = () => {
  return (
    <div className='feed-wrapper'>
        <div className="story-section">
            <Story />
        </div>
    </div>
  )
}

export default Feed
