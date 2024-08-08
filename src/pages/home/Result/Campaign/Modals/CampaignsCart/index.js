import React from 'react';
import "./style.scss"
import { Link } from "react-router-dom"

const Index = ({item}) => {
  return (
    <div
      className="campaign-cart"
      key={item._id}
    >
      <div className='image-container'>
        <img src='https://backend.www.micple.com/web/media/campaign/1831671697603898592.jpeg' alt='' />
      </div>
      <div className='desc-container'>
        <Link to="">{item.name}</Link>
        <div className='btn-container'>
          <Link to={`/C/${item.campaign_id}`} className='inner-btn-container'>
            <button className='front'>{`$${item.rate} ⅌ Action`}</button>
            <button className='back'>View Offer</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;