import React, { useState, useRef, useEffect } from 'react';


import { Works, WorkItem, WorkForm, AddButton, BioSection, BioContainer } from '../style';


import { Button, TextField, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Public, Lock, People, Edit, Language } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import { MdWrapText } from "react-icons/md";
import ColorPicker from './ColorPicker'
import { MdSave } from "react-icons/md";
import axios from "axios";
import { BACKEND_URL } from "../../../../shared/constants/Variables";
import { userHeader } from "../../../../shared/functions/Token";

const useStyles = makeStyles({
  root: {
    marginRight: "10px",
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

export default function ({ isMe, bio, profile }) {

  const [edit, setEdit] = useState('')
  const [working, setWorking] = useState(false);
  const [newBio, setNewBio] = useState(profile.description)
  const materialClass = useStyles()
  const userDescriptionRef = useRef();
  const [editable, setEditable] = useState(false);
  const [color, setColor] = useState();
  const [colorR, setColorR] = useState(profile.color?.colorR);
  const [colorG, setColorG] = useState(profile.color?.colorG);
  const [colorB, setColorB] = useState(profile.color?.colorB);
  useEffect(() => {
    setColorR(profile.color?.colorR)
    setColorG(profile.color?.colorG)
    setColorB(profile.color?.colorB)
  }, [profile])

  useEffect(() => {
    if (color) {
      setColorR(color.color.r)
      setColorG(color.color.g)
      setColorB(color.color.b)
    }
  }, [color])

  const handleUserDescription = () => {
    setEdit('');
    if (newBio) {
      axios
        .put(
          `${BACKEND_URL}/profile/description`,
          { data: newBio, color: { colorr: color?.color?.r, colorg: color?.color?.g, colorb: color?.color?.b } },
          { headers: userHeader() }
        )
        .catch((err) => {
        });
    }
  };
  return (
    <div>
      <Works>
        {
          edit ? (
            // <BioSection>

            <WorkForm>
              <div className="e">
                {/* <BioContainer > */}


                {/* working here 
                        <div class="form_wrap"> 
                          <div class="input_wrap">
                            <input type="text" required />
                            <label>Your Name</label>
                          </div>
                        </div> */}

                <TextField
                  variant="outlined"
                  className={materialClass.root}
                  label="Bio"
                  value={newBio}
                  inputProps={{
                    maxLength: 99
                  }}
                  onChange={(e) => setNewBio(e.target.value)}
                />

                <ColorPicker setColor={setColor} />

                {/* </BioContainer> */}
              </div>

              <div className="b">
                {/* <div > */}
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
                    onClick={() => {
                      handleUserDescription();
                    }}
                  >
                    Save
                  </Button>

                </span>


              </div>
            </WorkForm>

          ) : (
            <WorkItem>
              <div className="a">
                <MdWrapText />
              </div>
              <div className="m">
                <h3 style={{ color: `rgb(${colorR}, ${colorG}, ${colorB})` }}>
                  {newBio}
                </h3>
                <div className="d">Bio</div>
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
          )
        }

      </Works>
    </div>
  );
}

