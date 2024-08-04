import React, { useState } from 'react';
import { Public, Lock, People, Today } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import axios from 'axios';
import BirthdayIcon from '../../../../assets/about/Birthday.png'
import { BACKEND_URL } from '../../../../shared/constants/Variables';
import { userHeader } from '../../../../shared/functions/Token';
import { PrivacyOpt } from '../../../../components/Tools';
import { Works, WorkItem } from '../style';

export default ({ dob, isMe, setPrivacy }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  function editPrivacy(p) {
    axios({
      method: 'PUT',
      data: { privacy: p },
      url: `${BACKEND_URL}/profile/about/personal/dob/privacy`,
      headers: userHeader(),
    })
      .then(() => {
        setPrivacy(p);
      })
      .catch((err) => {
        throw err;
      });
  }
  return (
    <Works>
      <WorkItem>
        <div className='a'>
          <img src={BirthdayIcon} alt="" />
        </div>
        <div className='m'>
          <h3>{new Date(dob?.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</h3>
          <div className='d'>Date of birth</div>
        </div>
        <span style={{ flex: '1 1 auto' }}></span>
        <span>
          <IconButton disabled={!isMe()} onClick={(e) => setAnchorEl(e.currentTarget)}>
            {dob?.privacy === 'private' ? <Lock /> : dob?.privacy === 'friends' ? <People /> : <Public />}
          </IconButton>
          <PrivacyOpt anchorEl={anchorEl} setAnchorEl={setAnchorEl} onSelect={editPrivacy} />
        </span>
      </WorkItem>
    </Works>
  );
};
