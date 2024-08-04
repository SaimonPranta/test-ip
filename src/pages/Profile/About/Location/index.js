import React, { useState } from 'react';
import { Public, Lock, People, Edit } from '@material-ui/icons';
import { Button, TextField, IconButton } from '@material-ui/core';
import axios from 'axios';

import { BACKEND_URL } from '../../../../shared/constants/Variables';
import { userHeader } from '../../../../shared/functions/Token';
import { PrivacyOpt } from '../../../../components/Tools';
import { Works, WorkItem, WorkForm } from '../style';
import { Spinner } from '../../../../shared';
import LocationIcon from '../../../../assets/about/Address.png'

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "lightgray"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "lightgray"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: '1px solid lightgray'
    },
    // "& .MuiOutlinedInput-input": {
    //   color: "green"
    // },
    // "&:hover .MuiOutlinedInput-input": {
    //   color: "red"
    // },
    // "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
    //   color: "purple"
    // },
    "& .MuiInputLabel-outlined": {
      color: "black"
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "black"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "black"
    }
  }
});


export default ({ location, isMe, setLocation }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [optEl, setOptEl] = useState(null);
  const [newLoc, setNewLoc] = useState(false);
  const [addressI, setAddressI] = useState('');
  const [cityI, setCityI] = useState('');
  const [zipI, setZipI] = useState('');
  const [stateI, setStateI] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [working, setWorking] = useState(false);

  const materialClass = useStyles()

  function onSave() {
    if (!addressI && !cityI && !zipI && !stateI) {
      return;
    }
    setWorking(true);
    const body = {
      address: addressI,
      city: cityI,
      zip: zipI,
      state: stateI,
      privacy,
    };
    const req = {
      data: body,
      method: 'PUT',
      url: `${BACKEND_URL}/profile/about/location`,
      headers: userHeader(),
    };
    axios(req)
      .then(() => {
        setLocation({
          ...location,
          ...body,
        });
        setNewLoc(false);
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
      });
  }
  function editClick() {
    setAddressI(location.address);
    setCityI(location.city);
    setZipI(location.zip);
    setStateI(location.state);
    setPrivacy(location.privacy);
  }
  function onEditPrivacy(p) {
    const req = {
      data: { privacy: p },
      method: 'PUT',
      url: `${BACKEND_URL}/profile/about/location/privacy`,
      headers: userHeader(),
    };
    axios(req)
      .then(() => {
        setLocation({
          ...location,
          privacy: p,
        });
      })
      .catch((err) => {
        throw err;
      });
  }
  return (
    <>
      <h2>Location</h2>
      <Works>
        {newLoc ? (
          <WorkForm>
            <div className='e'>
              <TextField variant='outlined' className={materialClass.root} label='Address' value={addressI} onChange={(e) => setAddressI(e.target.value)} />
            </div>
            <div className='p'>
              <TextField variant='outlined' className={materialClass.root} label='City' value={cityI} onChange={(e) => setCityI(e.target.value)} />
            </div>
            <div className='p'>
              <TextField variant='outlined' className={materialClass.root} label='Zip' value={zipI} onChange={(e) => setZipI(e.target.value)} />
            </div>
            <div className='p'>
              <TextField variant='outlined' className={materialClass.root} label='State' value={stateI} onChange={(e) => setStateI(e.target.value)} />
            </div>
            <div className='p'>
              <TextField variant='outlined' className={materialClass.root} label='Country' defaultValue={location.country} disabled={true} />
            </div>
            <div className='b'>
              {/* <span style={{ flex: '1 1 auto' }}></span> */}
              <span style={{display:"flex", marginLeft:"77%", marginTop:"-60px"}}>
                <IconButton disabled={working} onClick={(e) => setAnchorEl(e.currentTarget)}>
                  {privacy === 'private' ? <Lock /> : privacy === 'friends' ? <People /> : <Public />}
                </IconButton>
                <PrivacyOpt anchorEl={anchorEl} setAnchorEl={setAnchorEl} onSelect={setPrivacy} />
                <Button style={{color:"black", border:"1px solid #3f51b5", textTransform:"none", textShadow:"none"}} variant='outlined' onClick={() => setNewLoc(false)} disabled={working}>
                  Cancel
                </Button>
                <Button variant='contained' style={{textTransform:"none", textShadow:"none"}} color='primary' disabled={working} onClick={onSave}>
                  {working ? <Spinner height='20px' /> : 'Save'}
                </Button>
              </span>
            </div>
          </WorkForm>
        ) : (
          <WorkItem>
            <div className='a'>{false ? <img src={''} alt='' /> : <img src={LocationIcon} alt="" /> }</div>
            <div className='m'>
              <h3>
                {location.address}, {location.city} - {location.zip},
              </h3>
              <h3>
                {location.state},
              </h3>
              <h3>{location.country}</h3>
            </div>
            <span style={{ flex: '1 1 auto' }}></span>
            <span>
              
              <PrivacyOpt anchorEl={optEl} setAnchorEl={setOptEl} onSelect={onEditPrivacy} />
         {   isMe() &&  (  
              <IconButton
                // disabled={!isMe()}
                onClick={() => {
                  setNewLoc(true);
                  editClick();
                }}
              >
                <Edit />
              </IconButton>
              )}  
              <IconButton onClick={(e) => setOptEl(e.currentTarget)} disabled={!isMe()}>
                {location.privacy === 'private' ? <Lock /> : location.privacy === 'friends' ? <People /> : <Public />}
              </IconButton>
            </span>
          </WorkItem>
        )}
      </Works>
    </>
  );
};
