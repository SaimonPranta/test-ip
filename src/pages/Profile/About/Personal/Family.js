import React, { useState } from 'react';
import { Button, TextField, IconButton, MenuItem, Select } from '@material-ui/core';
import { Public, Lock, People, Edit, PeopleOutline } from '@material-ui/icons';
import axios from 'axios';
import FatherIcon from '../../../../assets/about/Father.png'
import MotherIcon from '../../../../assets/about/Mother.png'
import { BACKEND_URL } from '../../../../shared/constants/Variables';
import { userHeader } from '../../../../shared/functions/Token';
import { Works, WorkItem, WorkForm, AddButton } from '../style';
import { PrivacyOpt } from '../../../../components/Tools';
import { Spinner } from '../../../../shared';

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
    "& .MuiInputLabel-outlined": {
      color: "black"
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "black"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "black"
    }
  },
  // MuiInputBase-root MuiInput-root MuiInput-underline makeStyles-other-14
  // "& .MuiSelect-root .MuiSelect-select .MuiSelect-selectMenu .MuiInputBase-input .MuiInput-input"
  select: {
    border: '1px solid lightgray',
    borderRadius: '5px',
    padding:'10px',
    '& .MuiSelect-root': {
      background: 'white'
    }
  }
});

export default ({ family, setFamily, isMe }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [optEl, setOptEl] = useState(null);
  const [edit, setEdit] = useState('');
  const [nameI, setNameI] = useState('');
  const [relationI, setRelationI] = useState('');
  const [userI] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [working, setWorking] = useState(false);

  const materialClass = useStyles()

  function onSave() {
    if (!nameI && !relationI) {
      return;
    }
    setWorking(true);
    const body = {
      name: nameI,
      relation: relationI,
      user: userI || null,
      privacy,
    };
    const req = {
      data: body,
      headers: userHeader(),
    };
    if (edit.length > 12) {
      req.method = 'PUT';
      req.url = `${BACKEND_URL}/profile/about/personal/family/${edit}`;
    } else {
      req.method = 'POST';
      req.url = `${BACKEND_URL}/profile/about/personal/family`;
    }
    axios(req)
      .then(({ data }) => {
        if (edit.length === 24) {
          setFamily(
            family.map((item) => {
              if (item.id === edit) {
                item = {
                  ...body,
                  id: item.id,
                };
              }
              return item;
            })
          );
        } else {
          setFamily([...family, { ...body, id: data }]);
        }
        setEdit('');
        setNameI('');
        setRelationI('');
        setPrivacy('public');
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
      });
  }
  function onDelete() {
    if (!edit) {
      return;
    }
    setWorking(true);
    axios
      .delete(`${BACKEND_URL}/profile/about/personal/family/${edit}`, { headers: userHeader() })
      .then(() => {
        const newFamily = family.filter((item) => item.id !== edit);
        setFamily(newFamily);
        setNameI('');
        setRelationI('');
        setPrivacy('public');
        setEdit('');
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
      });
  }
  function editClick(id) {
    const r = family.find((item) => item.id === id);
    setNameI(r.name);
    setRelationI(r.relation);
    setPrivacy(r.privacy);
  }
  function editPrivacy(p, id) {
    if (!id || !p) {
      return;
    }
    const req = {
      method: 'PUT',
      data: { privacy: p },
      headers: userHeader(),
      url: `${BACKEND_URL}/profile/about/personal/family/${id}/privacy`,
    };
    axios(req)
      .then(() => {
        setFamily(
          family.map((item) => {
            if (item.id === id) {
              item = {
                ...item,
                privacy: p,
              };
            }
            return item;
          })
        );
      })
      .catch((err) => {
        throw err;
      });
  }
  return (
    <Works>
      {/* <h3>Family members</h3> */}
      {!!edit ? (
        <WorkForm>
          <div className='e'>
            <TextField variant='outlined' className={materialClass.root} label='Name' value={nameI} onChange={(e) => setNameI(e.target.value)} />
          </div>
          <div className='p'>
            <Select className={materialClass.select} disableUnderline label='Relation' value={relationI} onChange={(e) => setRelationI(e.target.value)}>
              <MenuItem  value='Sister'>Sister</MenuItem>
              <MenuItem  value='Mother'>Mother</MenuItem>
              <MenuItem  value='Father'>Father</MenuItem>
              <MenuItem  value='Son'>Son</MenuItem>
              <MenuItem  value='Daughter'>Daughter</MenuItem>
              <MenuItem  value='Husband'>Husband</MenuItem>
              <MenuItem  value='Wife'>Wife</MenuItem>
              <MenuItem  value='Brother in law'>Brother in law</MenuItem>
              <MenuItem  value='Sister in law'>Sister in law</MenuItem>
              <MenuItem  value='Brother'>Brother</MenuItem>
              <MenuItem  value='Nephew'>Nephew</MenuItem>
              <MenuItem  value='Uncle'>Uncle</MenuItem>
              <MenuItem  value='Aunty'>Aunty</MenuItem>
              <MenuItem  value='Cousin'>Cousin</MenuItem>
            </Select>
          </div>
          <div className='b'>
            {edit.length > 10 && (
              <Button variant='contained' color='primary' style={{textTransform:"none", textShadow:"none"}} onClick={onDelete} disabled={working}>
                {working ? <Spinner height='15px' /> : 'Delete'}
              </Button>
            )}
            <span style={{ flex: '1 1 auto' }}></span>
            <span>
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
          {family.map((item) => (
            <WorkItem key={item.id}>
              <div className='a'>
                {
                  item.relation == "Father" && <img src={FatherIcon} alt="" />
                }
                {
                  item.relation == "Mother" && <img src={MotherIcon} alt="" />
                }
                { 
                  item.relation != "Father" && item.relation != "Mother" && <PeopleOutline></PeopleOutline>
                }
              </div>
              <div className='m'>
                <h3>{item.name}</h3>
                <div className="da">{item.relation}</div>
              </div>
              <span style={{ flex: '1 1 auto' }}></span>
              <span>
                <PrivacyOpt anchorEl={optEl} setAnchorEl={setOptEl} onSelect={(p) => editPrivacy(p, item.id)} />
                {isMe() && ![].includes(item.relation) && (
                  <IconButton
                    onClick={() => {
                      setEdit(item.id);
                      editClick(item.id);
                    }}
                  >
                    <Edit />
                  </IconButton>
                )}
                <IconButton disabled={!isMe()} onClick={(e) => setOptEl(e.currentTarget)}>
                  {item.privacy === 'private' ? <Lock /> : item.privacy === 'friends' ? <People /> : <Public />}
                </IconButton>
              </span>
            </WorkItem>
          ))}
        </>
      )}

      {!edit && isMe() && (
        <AddButton
          style={{ marginTop: 10 }}
          variant='outlined'
          startIcon={<PeopleOutline />}
          onClick={() => setEdit('new')}
        >
          Add Family Member
        </AddButton>
      )}
    </Works>
  );
};
