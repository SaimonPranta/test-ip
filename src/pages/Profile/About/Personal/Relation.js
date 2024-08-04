import React, { useState } from 'react';
import { Button, TextField, IconButton, MenuItem, Select } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Public, Lock, People, Edit, Favorite } from '@material-ui/icons';
import RelationshipIcon from '../../../../assets/about/Relationship.png'
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';

import { BACKEND_URL } from '../../../../shared/constants/Variables';
import { userHeader } from '../../../../shared/functions/Token';
import { Works, WorkItem, WorkForm, AddButton } from '../style';
import { PrivacyOpt } from '../../../../components/Tools';
import { Spinner } from '../../../../shared';

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  select: {
    border: '1px solid lightgray',
    borderRadius: '5px',
    padding:'10px',
    '& .MuiSelect-root': {
      background: 'white'
    }
  },
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


export default ({ relation, setRelation, isMe }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [optEl, setOptEl] = useState(null);
  const [edit, setEdit] = useState('');
  const [statusI, setStatusI] = useState('');
  const [nameI, setNameI] = useState('');
  const [dateI, setDateI] = useState(null);
  const [privacy, setPrivacy] = useState('public');
  const [working, setWorking] = useState(false);

  const materialClass = useStyles()

  function onSave() {
    const body = {
      status: statusI,
      name: nameI,
      date: dateI || null,
      privacy,
    };
    setWorking(true);
    const req = {
      data: body,
      method: 'PUT',
      url: `${BACKEND_URL}/profile/about/personal/relation`,
      headers: userHeader(),
    };
    axios(req)
      .then(() => {
        setRelation(body);
        setEdit('');
        setWorking(false);
        setNameI('');
        setStatusI('');
        setDateI(null);
        setPrivacy('public');
      })
      .catch((err) => {
        setWorking(false);
      });
  }
  function onDelete() {
    setWorking(true);
    axios
      .delete(`${BACKEND_URL}/profile/about/personal/relation`, { headers: userHeader() })
      .then(() => {
        setEdit('');
        setRelation({});
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
      });
  }
  function editClick() {
    setNameI(relation?.name);
    setStatusI(relation?.status);
    setDateI(relation?.date);
    setPrivacy(relation?.privacy);
  }
  function editPrivacy(p) {
    const req = {
      method: 'PUT',
      data: { privacy: p },
      headers: userHeader(),
      url: `${BACKEND_URL}/profile/about/personal/relation/privacy`,
    };
    axios(req)
      .then(() => {
        setRelation({
          ...relation,
          privacy: p,
        });
      })
      .catch((err) => {
        throw err;
      });
  }
  return (
    <Works>
      {/* <h3>Relationship</h3> */}
      {Object.keys(relation || {}).length < 1 && !edit && isMe() && (
        <AddButton variant='outlined'  startIcon={<Favorite />} onClick={() => setEdit('new')}>
          Add Relationship
        </AddButton>
      )}
      {!!edit ? (
        <WorkForm>
          <div className='e'>
            <Select className={materialClass.select} disableUnderline label='Relationship' value={statusI} onChange={(e) => setStatusI(e.target.value)}>
              <MenuItem value='Single'>Single</MenuItem>
              <MenuItem value='In a relationship'>In a relationship</MenuItem>
              <MenuItem value='Engaged'>Engaged</MenuItem>
              <MenuItem value='Married'>Married</MenuItem>
              <MenuItem value={`It's Complicated`}>It's Complicated</MenuItem>
              <MenuItem value='Separated'>Separated</MenuItem>
              <MenuItem value='Divorced'>Divorced</MenuItem>
              <MenuItem value='Widowed'>Widowed</MenuItem>
              <MenuItem value='Girlfriend'>Girlfriend</MenuItem>
              <MenuItem value='Boyfriend'>Boyfriend</MenuItem>
            </Select>
          </div>
          {['In a relationship', 'Engaged', 'Married', 'Girlfriend', 'Boyfriend' ].includes(statusI) && (
            <>
              <div className='p'>
                <TextField variant='outlined' className={materialClass.root}label='Name' value={nameI} onChange={(e) => setNameI(e.target.value)} />
              </div>
              <div className='d'>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    label='From'
                    format='dd/MM/yyyy'
                    maxDate={new Date()}
                    value={dateI}
                    onChange={(d) => setDateI(d)}
                    KeyboardButtonProps={{
                      'aria-label': 'From',
                    }}
                    InputProps={{
                      disableUnderline: true,
                     }}
                     style ={{border:"1px solid lightgray",  borderRadius:'5px', margin:'0'}}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </>
          )}
          <div className='b'>
            {/* {edit === 'edit' && (
              <Button disabled={working} onClick={onDelete} variant='contained' color='primary' style={{textTransform:"none", textShadow:"none"}}>
                Delete
              </Button>
            )} */}
            {/* <span style={{ flex: '1 1 auto' }}></span> */}
            <span style={{display:"flex", marginLeft:"77%", marginTop:"-60px"}}>
              <IconButton disabled={working} onClick={(e) => setAnchorEl(e.currentTarget)}>
                {privacy === 'private' ? <Lock /> : privacy === 'friends' ? <People /> : <Public />}
              </IconButton>
              <PrivacyOpt anchorEl={anchorEl} setAnchorEl={setAnchorEl} onSelect={setPrivacy} />
              <Button color='primary' style={{textTransform:"none", textShadow:"none"}} variant='outlined' onClick={() => setEdit('')} disabled={working}>
                Cancel 
              </Button>
              <Button variant='contained' color='primary' style={{textTransform:"none", textShadow:"none"}} disabled={working} onClick={onSave}>
                {working ? <Spinner height='20px' /> : 'Save'}
              </Button>
            </span>
          </div>
        </WorkForm>
      ) : (
        <>
          {Object.keys(relation || {}).length > 1 && (
            <WorkItem>
              <div className='a'>
                <img src={RelationshipIcon} alt="" />
              </div>
              <div className='m'>
                <h3>{relation?.status}</h3>
                {!!relation?.name && <h4 style={{marginTop:"4px"}}> - {relation?.name}</h4>}
                {!!relation?.date && !!relation?.name && (
                  <div className='d'>
                    <small >
                      {new Date(relation?.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </small>
                  </div>
                )}
                <div className='da' style={{marginTop:"2px"}}>Relationship</div>
              </div>
              <span style={{ flex: '1 1 auto' }}></span>
              <span>
              {isMe() && (
                  <IconButton
                    onClick={() => {
                      setEdit('edit');
                      editClick();
                    }}
                  >
                    <Edit />
                  </IconButton>
                )}
                <PrivacyOpt anchorEl={optEl} setAnchorEl={setOptEl} onSelect={editPrivacy} />
               
                <IconButton disabled={!isMe()} onClick={(e) => setOptEl(e.currentTarget)}>
                  {relation?.privacy === 'private' ? <Lock /> : relation?.privacy === 'friends' ? <People /> : <Public />}
                </IconButton>
              </span>
            </WorkItem>
          )}
        </>
      )}
    </Works>
  );
};
