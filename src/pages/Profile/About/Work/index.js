import React, { useState, Fragment, useEffect } from "react";
import {
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Avatar,
  Typography,
} from "@material-ui/core";
import { Work, Public, Lock, People, Edit } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import { BACKEND_URL } from "../../../../shared/constants/Variables";
import { userHeader } from "../../../../shared/functions/Token";
import { Works, WorkItem, WorkForm, AddButton } from "../style";
import { getGroupAvatar } from "../../../../shared/functions";
import { Spinner } from "../../../../shared";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "lightgray",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "lightgray",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid lightgray",
    },
    "& .MuiInputLabel-outlined": {
      color: "black",
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "black",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "black",
    },
  },
});

export default ({ works, isMe, setWorks }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [newWork, setNewWork] = useState(false);
  const [editId, setEditId] = useState("");
  const [employerI, setEmployerI] = useState("");
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const [group, setGroup] = useState(null);
  const [positionI, setPositionI] = useState("");
  const [detailsI, setDetailsI] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [working, setWorking] = useState(false);
  const materialClass = useStyles();
  const origin = {
    vertical: "top",
    horizontal: "right",
  };
  useEffect(() => {
    if (!employerI) {
      return;
    }
    let cancel;
    setOptions([]);
    setFetching(true);
    axios({
      headers: userHeader(),
      method: "GET",
      url: `${BACKEND_URL}/profile/about/works`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
      params: { key: employerI.trim() },
    })
      .then(({ data }) => {
        setOptions(data);
        setFetching(false);
      })
      .catch((err) => {
        if (axios.isCancel()) {
          throw err;
        }
        setFetching(false);
        throw err;
      });
    return () => cancel();
  }, [employerI]);
  function onSave() {
    if (!employerI && !positionI) {
      return;
    }
    setWorking(true);
    const body = {
      employer: employerI,
      group,
      position: positionI,
      detail: detailsI,
      privacy,
    };
    const req = {
      data: body,
      headers: userHeader(),
    };
    if (!!editId) {
      req.method = "PUT";
      req.url = `${BACKEND_URL}/profile/about/works/${editId}`;
    } else {
      req.method = "POST";
      req.url = `${BACKEND_URL}/profile/about/works`;
    }
    axios(req)
      .then(({ data }) => {
        if (!!editId) {
          const newWorks = works.map((item) => {
            if (item.id === editId) {
              item = {
                employer: employerI,
                position: positionI,
                detail: detailsI,
                privacy,
                id: item.id,
                group: data.group,
              };
            }
            return item;
          });
          setWorks(newWorks);
        } else {
          works.push({ ...body, group: data.group, id: data.id });
          setWorks(works);
        }
        setNewWork(false);
        setEditId("");
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
      .delete(`${BACKEND_URL}/profile/about/works/${editId}`, {
        headers: userHeader(),
      })
      .then(() => {
        const newWorks = works.filter((item) => item.id !== editId);
        setWorks(newWorks);
        setNewWork(false);
        setEmployerI("");
        setPositionI("");
        setDetailsI("");
        setPrivacy("public");
        setEditId("");
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
        throw err;
      });
  }
  function editClick(id) {
    const w = works.find((item) => item.id === id);
    setEmployerI(w.employer);
    setPositionI(w.position);
    setDetailsI(w.detail);
    setPrivacy(w.privacy);
    setEditId(id);
    if (w.group) {
      setGroup(w.group.id);
      setEmployerI(w.group.name);
      setOptions([w.group]);
    }
  }
  function cancel() {
    setNewWork(false);
    setEditId(null);
    setGroup(null);
    setEmployerI("");
    setPositionI("");
    setDetailsI("");
    setPrivacy("public");
    setOptions([]);
  }
  return (
    <>
      <h2>Works</h2>
      <Works>
        {works?.length < 1 && !newWork && isMe() && (
          <AddButton
            variant="outlined"
            startIcon={<Work />}
            onClick={() => setNewWork(true)}
          >
            Add Work
          </AddButton>
        )}
        {!isMe() && works.length < 1 && <p>No work history.</p>}
        {newWork ? (
          <WorkForm>
            <div className="e">
              <Autocomplete
                onChange={(e, option) => {
                  setGroup(option.id);
                  setEmployerI(option.name);
                }}
                getOptionLabel={() => employerI}
                options={
                  !!employerI
                    ? [...options, { name: employerI, id: null }]
                    : options
                }
                loading={fetching}
                renderOption={(opt) => (
                  <Fragment>
                    {!opt.avatar ? (
                      <Avatar>
                        <Work />
                      </Avatar>
                    ) : (
                      <Avatar src={getGroupAvatar(opt.avatar)} alt="" />
                    )}
                    <Typography
                      component="h3"
                      variant="h5"
                      style={{ marginLeft: 5 }}
                    >
                      {opt.name}
                    </Typography>
                  </Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Employer"
                    variant="outlined"
                    color="primary"
                    value={employerI}
                    onChange={(e) => {
                      setEmployerI(e.target.value);
                      setOptions([...options, { name: e.target.value }]);
                    }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {fetching ? (
                            <CircularProgress color="primary" size={15} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      ),
                    }}
                    className={materialClass.root}
                  />
                )}
              />
            </div>
            <div className="p">
              <TextField
                variant="outlined"
                label="Position"
                value={positionI}
                onChange={(e) => setPositionI(e.target.value)}
                className={materialClass.root}
              />
            </div>
            {/* <div className='ds'>
              <TextField label='Details' multiline rows={4} variant='outlined' color="#fafafa" value={detailsI} onChange={(e) => setDetailsI(e.target.value)} className={materialClass.root}/>
            </div> */}
            <div className="b">
              {/* {!!editId && (
                <Button variant='contained' color='primary' style={{textTransform:"none", boxShadow:"none"}} disabled={working} onClick={onDelete}>
                  {working ? <Spinner height='20px' /> : 'Delete'}
                </Button>
              )} */}
              {/* <span style={{ flex: '1 1 auto' }}></span> */}

              <span
                style={{
                  display: "flex",
                  marginLeft: "77%",
                  marginTop: "-60px",
                }}
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
                  onClick={cancel}
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
            {works?.map((item) => (
              <WorkItem key={item.id}>
                <div className="a">
                  {item.group?.avatar ? (
                    <img src={item.group.avatar} alt="" />
                  ) : (
                    <Work />
                  )}
                </div>
                <div className="m">
                  {item.group?.name ? (
                    <Link to={`/groups/${item.group.id}`}>
                      <h3>{item.group.name}</h3>
                    </Link>
                  ) : (
                    <h3>{item.employer}</h3>
                  )}
                  {/* <h4>{item.position}</h4>
                  {!!item?.detail && <p>{item.detail}</p>} */}

                  <p style={{ margin: "-1px" }}>- ({item.position})</p>
                </div>
                <span style={{ flex: "1 1 auto" }}></span>
                <span>
                  {isMe() && (
                    <IconButton
                      onClick={() => {
                        editClick(item.id);
                        setNewWork(true);
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
    </>
  );
};
