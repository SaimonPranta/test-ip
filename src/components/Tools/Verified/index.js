import React, { useState } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Verified from '../../../assets/profile/Verified.png';
import { HoverOver } from '..';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Index = ({ name, verified, width = 12 }) => {

  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
      {name?.join(' ')}
      {verified && (
        <HoverOver placement='right' title='Profile Verified'>
          <CheckCircleIcon
            style={{
              marginLeft: 0,
              marginTop: 0,
              width,
              height: 'auto',
              color: '#0b99cf'
            }}
            alt=''
            src={Verified}
          ></CheckCircleIcon>
        </HoverOver>
      )}
    </span>
  );
};

export default Index;
