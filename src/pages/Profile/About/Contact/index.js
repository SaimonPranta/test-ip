import React from 'react';
import { IconButton } from '@material-ui/core';
import { Public, AlternateEmail } from '@material-ui/icons';
import EmailIcon from '../../../../assets/about/Email.png'
import { Works, WorkItem } from '../style';
import Website from './Website';
import Phone from './Phone';

export default ({ about, isMe, setAbout, username }) => {
  function setPhone(phone) {
    setAbout({
      ...about,
      phone,
    });
  }
  function setWebsite(website) {
    setAbout({
      ...about,
      website,
    });
  }
  return (
    <>
      <h2>Contact Info</h2>

      <Works>
        <WorkItem>
          <div className='a'>
            <img src={EmailIcon} alt="" />
          </div>
          <div className='m'>
            <h3>{`${username}@micple.com`}</h3>
            <div className='d'>Email</div>
          </div>
          <span style={{ flex: '1 1 auto' }}></span>
          <span>
            <IconButton disabled={true}>
              <Public />
            </IconButton>
          </span>
        </WorkItem>
      </Works>

      <Phone phone={about?.phone} setPhone={setPhone} isMe={isMe} />
      <Website website={about?.website} setWebsite={setWebsite} isMe={isMe} />
    </>
  );
};
