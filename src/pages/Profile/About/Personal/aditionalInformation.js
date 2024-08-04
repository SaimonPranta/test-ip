import React, { useState } from 'react';
import { Button, TextField, IconButton, Menu, MenuItem } from '@material-ui/core';
import { Public, Lock, People, Edit, Language } from '@material-ui/icons';
import axios from 'axios';
// import InterestedIcon from '../../../../assets/about/Interested.png'
import { BACKEND_URL } from '../../../../shared/constants/Variables';
import { userHeader } from '../../../../shared/functions/Token';
import { Works, WorkItem, WorkForm, AddButton } from '../style';
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
    }
});

export default ({ data, setAdditionalInformations, isMe, infoTag, tag, icon }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [edit, setEdit] = useState('');
    const [interestI, setInterestI] = useState('');
    const [privacy, setPrivacy] = useState('public');
    const [working, setWorking] = useState(false);

    const materialClass = useStyles()

    const origin = {
        vertical: 'top',
        horizontal: 'right',
    };
    function onSave() {

        if (!interestI) {
            return;
        }
        setWorking(true);
        const body = {
            infoTag: infoTag,
            updatedInfo: interestI,
            privacy: privacy,
        };

        const realtimeInfo = {
            privacy: privacy,
            data: [interestI]
        }

        const req = {
            data: body,
            method: 'POST',
            url: `${BACKEND_URL}/profile/about/aditional-information`,
            headers: userHeader(),
        };
        axios(req)
            .then(() => {
                setAdditionalInformations(realtimeInfo, infoTag);
                setEdit('');
                setWorking(false);
                setInterestI('');
                setPrivacy('public');
            })
            .catch((err) => {
                setWorking(false);
                throw err;
            });
    }

    function editClick() {
        setInterestI(data?.data);
        setPrivacy(data?.privacy);
    }
    return (
        <Works>
            {/* !interest?.name && !edit && isMe() && */}
            {(!data?.privacy && isMe()) && (
                <AddButton
                    variant="outlined"
                    startIcon={<img src={icon} style={{ width: "20px" }} />}
                    onClick={() => setEdit("new")}
                >
                    Add {tag}
                </AddButton>
            )}
            {!!edit ? (
                <WorkForm>
                    <div className="e">
                        <TextField
                            variant="outlined"
                            className={materialClass.root}
                            label={tag}
                            value={interestI}
                            onChange={(e) => setInterestI(e.target.value)}
                        />
                    </div>
                    <div className="b">
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
                <>
                    {Object.keys(data?.data[0] || {}).length > 0 && (
                        <WorkItem>
                            <div className="a">
                                <img src={icon} alt="" />
                            </div>
                            <div className="m">
                                {/* <h3 onClick={() => window.open(`${data?.data[0]}`, "blank")}> */}
                                <h3 >
                                    {data?.data[0]}
                                </h3>
                                <div className="d">{tag}</div>
                            </div>
                            <span style={{ flex: "1 1 auto" }}></span>
                            <span>
                                {isMe() && (
                                    <IconButton
                                        onClick={() => {
                                            setEdit("edit");
                                            editClick();
                                        }}
                                    >
                                        <Edit />
                                    </IconButton>
                                )}
                                <IconButton disabled={!isMe()}>
                                    {data?.privacy === "private" ? (
                                        <Lock />
                                    ) : data?.privacy === "friends" ? (
                                        <People />
                                    ) : (
                                        <Public />
                                    )}
                                </IconButton>

                            </span>
                        </WorkItem>
                    )}
                </>
            )}
        </Works>
    );
};
