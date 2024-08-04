import React, { useState } from 'react';
import { Button, TextField, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Public, Lock, People, Edit, Language } from '@material-ui/icons';
import axios from 'axios';
import ColorIcon from '../../../../assets/about/Color.png'
import { BACKEND_URL } from '../../../../shared/constants/Variables';
import { userHeader } from '../../../../shared/functions/Token';
import { Works, WorkItem, WorkForm, AddButton } from '../style';
import { Spinner } from '../../../../shared';
import { RiProfileLine } from "react-icons/ri";


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
  }
});

export default function({name, isMe, profile}) {
    const [fname, setFname] = useState(name[0]) 
    const [lname, setLname] = useState(name[1]) 
    const [anchorEl, setAnchorEl] = useState(null);
    const [edit, setEdit] = useState('');
    const [colorI, setColorI] = useState('');
    const [privacy, setPrivacy] = useState('public');
    const [working, setWorking] = useState(false);
    
  const materialClass = useStyles()
  function onSave() {
    setEdit('')
    if(fname && lname){
        axios
        .put(
          `${BACKEND_URL}/profile/name`,
          { userid: profile.id, data: [fname, lname]},
          { headers: userHeader() }
        )
        .catch((err) => {
        });
      }
    
  }
    return (
        <div>
            {/* <RiProfileLine />
            {name[0]} {name[1]} */}
            <Works>
                {/* !color?.name && !edit && isMe() && */}
                
                {edit ? (
                    <WorkForm>
                    <div className="e">
                        <TextField
                        variant="outlined"
                        className={materialClass.root}
                        label="First name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        />
                    </div>
                    <div className="e">
                    <TextField
                        variant="outlined"
                        className={materialClass.root}
                        label="Last name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        />
                    </div>
                    <div className="b">
                        {/* {edit === 'edit' && (
                        <Button variant='contained' style={{textTransform:"none", textShadow:"none"}} color='primary' disabled={working} onClick={onDelete}>
                            {working ? <Spinner height='20px' /> : 'Delete'}
                        </Button>
                        )} */}
                        {/* <span style={{ flex: '1 1 auto' }}></span> */}
                        <span
                        style={{ display: "flex", marginLeft: "77%", marginTop: "-60px" }}
                        >
                        
                        
                        <Button
                            style={{
                            border: "1px solid #3f51b5",
                            color: "black",
                            textTransform: "none",
                            textShadow: "none",
                            }}
                            variant="outlined"
                            onClick={() => setEdit("")}
                            disabled={working}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ textTransform: "none", textShadow: "none" }}
                            disabled={working}
                            onClick={onSave}
                        >
                            Save
                        </Button>
                        </span>
                    </div>
                    </WorkForm>
                ) : (
                  
                        <WorkItem>
                        <div className="a">
                            <RiProfileLine/>
                        </div>
                        <div className="m">
                            <h3 >
                            {fname} {lname}
                            </h3>
                            <div className="d">Name</div>
                        </div>
                        <span style={{ flex: "1 1 auto" }}></span>
                        <span>
                        {isMe() && (
                            <IconButton
                                onClick={() => {
                                setEdit("edit");
                                }}
                            >
                                <Edit />
                            </IconButton>
                            )}
                        </span>
                        </WorkItem>
                    )}
                   
                </Works>
        </div>
    );
}

