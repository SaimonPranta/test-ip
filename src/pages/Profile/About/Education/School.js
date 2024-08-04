import React, { useState } from 'react';
import { Button, TextField, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Public, Lock, People, Edit, School } from '@material-ui/icons';
import axios from 'axios';

import { BACKEND_URL } from '../../../../shared/constants/Variables';
import { userHeader } from '../../../../shared/functions/Token';
import { Works, WorkItem, WorkForm, AddButton } from '../style';
import { Spinner } from '../../../../shared';
import SchoolIcon from '../../../../assets/about/School.png'
import { makeStyles } from "@material-ui/core/styles";
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';


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
  }
});


export default ({ schools, isMe, setSchools }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [newIns, setNewIns] = useState(false);
  const [editId, setEditId] = useState('');
  const [nameI, setNameI] = useState('');
  const [depI, setDepI] = useState('');
  const [degreeI, setDegreeI] = useState('');
  const [detailI, setDetailI] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [working, setWorking] = useState(false);

  const materialClass = useStyles();
  const origin = {
    vertical: 'top',
    horizontal: 'right',
  };
  function onSave() {
    if (!nameI && !depI && !degreeI) {
      return;
    }
    setWorking(true);
    const body = {
      name: nameI,
      department: depI,
      degree: degreeI,
      detail: detailI,
      privacy,
      type: 'school',
    };
    const req = {
      data: body,
      headers: userHeader(),
    };
    if (!!editId) {
      req.method = 'PUT';
      req.url = `${BACKEND_URL}/profile/about/educations/${editId}`;
    } else {
      req.method = 'POST';
      req.url = `${BACKEND_URL}/profile/about/educations`;
    }
    axios(req)
      .then(({ data }) => {
        if (!!editId) {
          const newInstitute = schools.map((item) => {
            if (item._id === editId) {
              item = {
                ...body,
                _id: item._id,
              };
            }
            return item;
          });
          setSchools(newInstitute);
        } else {
          setSchools([...schools, { ...body, _id: data }]);
        }
        setNewIns(false);
        setEditId('');
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
      });
  }
  function onDelete() {
    if (!editId) {
      return;
    }
    setWorking(true);
    axios
      .delete(`${BACKEND_URL}/profile/about/educations/${editId}`, { headers: userHeader() })
      .then(() => {
        setSchools(schools.filter((item) => item._id !== editId));
        setNewIns(false);
        setNameI('');
        setDepI('');
        setDegreeI('');
        setDetailI('');
        setPrivacy('public');
        setEditId('');
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
      });
  }
  function editClick(id) {
    const s = schools.find((item) => item._id === id);
    setNameI(s.name);
    setDepI(s.department);
    setDegreeI(s.degree);
    setDetailI(s.detail);
    setPrivacy(s.privacy);
    setEditId(id);
  }
  return (
    <Works>
      {isMe() && schools.length < 1 && !newIns && (
        <AddButton
          variant="outlined"
          color="default"
          startIcon={<img style={{ width: "20px" }} src={SchoolIcon} />}
          onClick={() => setNewIns(true)}
        >
          Add School
        </AddButton>
      )}
      {newIns ? (
        <WorkForm>
          <div className="e">
            <TextField
              variant="outlined"
              label="Institute"
              value={nameI}
              onChange={(e) => setNameI(e.target.value)}
              className={materialClass.root}
            />
          </div>
          <div className="p">
            <TextField
              variant="outlined"
              label="Department"
              value={depI}
              onChange={(e) => setDepI(e.target.value)}
              className={materialClass.root}
            />
          </div>
          <div className="p">
            <TextField
              variant="outlined"
              label="Point"
              value={degreeI}
              onChange={(e) => setDegreeI(e.target.value)}
              className={materialClass.root}
            />
          </div>
          {/* <div className='ds'>
            <TextField label='Details' multiline rows={4} variant='filled' value={detailI} onChange={(e) => setDetailI(e.target.value)} />
          </div> */}
          <div className="b">
            {/* {!!editId && (
              <Button variant='contained' color='primary' style={{textTransform:"none", boxShadow:"none"}} disabled={working} onClick={onDelete}>
                {working ? <Spinner height='20px' /> : 'Delete'}
              </Button>
            )} */}
            {/* <span style={{ flex: '1 1 auto' }}></span> */}
            <span
              style={{ display: "flex", marginLeft: "77%", marginTop: "-60px" }}
            >
              <IconButton
                disabled={working}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                {privacy === "private" ? (
                  <Lock />
                ) : privacy === "friends" ? (
                  <People />
                ) : (
                  <Public />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={origin}
                keepMounted
                transformOrigin={origin}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem
                  onClick={() => {
                    setPrivacy("public");
                    setAnchorEl(null);
                  }}
                >
                  Public
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setPrivacy("friends");
                    setAnchorEl(null);
                  }}
                >
                  Followers
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setPrivacy("private");
                    setAnchorEl(null);
                  }}
                >
                  Private
                </MenuItem>
              </Menu>
              <Button
                color="primary"
                style={{ textTransform: "none", boxShadow: "none" }}
                variant="outlined"
                onClick={() => {
                  setNewIns(false);
                  setEditId(null);
                }}
                disabled={working}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ textTransform: "none", boxShadow: "none" }}
                disabled={working}
                onClick={onSave}
              >
                {working ? <Spinner height="20px" /> : "Save"}
              </Button>
            </span>
          </div>
        </WorkForm>
      ) : (
        <>
          {schools.map((item, i) => (
            <WorkItem key={item._id}>
              <div className="a">
                {" "}
                <img src={SchoolIcon} alt="" />
              </div>
              <div className="m">
                <h3>{item.name}</h3>
                {/* <h4>{item.department}</h4>
                {!!item.degree && <div className='d'>{item.degree}</div>}
                {!!item?.detail && <p>{item.detail}</p>} */}
                <p style={{ margin: "-1px" }}>- (School)</p>
              </div>
              <span style={{ flex: "1 1 auto" }}></span>
              <span>
                {isMe() && (
                  <IconButton
                    onClick={() => {
                      editClick(item._id);
                      setNewIns(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                )}
                <IconButton disabled={!isMe()}>
                  {item.privacy === "private" ? (
                    <Lock />
                  ) : item.privacy === "friends" ? (
                    <People />
                  ) : (
                    <Public />
                  )}
                </IconButton>
              </span>
            </WorkItem>
          ))}
        </>
      )}
    </Works>
  );
};
