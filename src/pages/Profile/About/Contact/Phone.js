import React, { useState } from 'react';
import { Public, Lock, People, Phone } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import axios from 'axios';
import PhoneIcon from '../../../../assets/about/Phone.png'
import { BACKEND_URL } from '../../../../shared/constants/Variables';
import { userHeader } from '../../../../shared/functions/Token';
import { PrivacyOpt } from '../../../../components/Tools';
import { Works, WorkItem } from '../style';


export default ({ phone, isMe, setPhone }) => {
  const [optEl, setOptEl] = useState(null);
  function editPrivacy(p) {
    const req = {
      data: { privacy: p },
      method: 'PUT',
      url: `${BACKEND_URL}/profile/about/contact/phone/privacy`,
      headers: userHeader(),
    };
    axios(req)
      .then(() => {
        setPhone({
          ...phone,
          privacy: p,
        });
      })
      .catch((err) => {
        throw err;
      });
  }
  return (
    <Works>
      <WorkItem>
        <div className='a'>
          <img src={PhoneIcon} alt="" />
        </div>
        <div className='m' >
          <h3>{phone?.number}</h3>
          <div className='d'>Phone Number</div>
        </div>
        <span style={{ flex: '1 1 auto' }}></span>
        <span>
          <IconButton disabled={!isMe()} onClick={(e) => setOptEl(e.currentTarget)}>
            {phone?.privacy === 'private' ? <Lock /> : phone?.privacy === 'friends' ? <People /> : <Public />}
          </IconButton>
          <PrivacyOpt anchorEl={optEl} setAnchorEl={setOptEl} onSelect={editPrivacy} />
        </span>
      </WorkItem>
    </Works>
  );
};
