import React, { useState, Fragment, useRef, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { FaRegCopy } from "react-icons/fa";
import {
  createStyles,
  makeStyles,
  Dialog,
  Button,
  Slide,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItem,
  Checkbox,
  FormControlLabel,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
} from "@material-ui/core";
import {
  ArrowUpward,
  ArrowDownward,
  Flag,
  Public,
  Wc,
  Today,
  Schedule,
  People,
} from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";

import { Payonner, MasterCard } from "../../../../assets/payment";
import { Countries } from "../../../../shared";
import Terms from "./Terms";
import "./style.scss";
import RegisterCondition from "../../../../Utils/RegisterCondition";

const useStyles = makeStyles(() =>
  createStyles({
    option: {
      fontSize: 15,
      "& > span": {
        marginRight: 10,
        fontSize: 18,
      },
    },
    next: {
      marginTop: 20,
    },
  })
);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function TabPanel({ children, value, index, ...other }) {
  return (
    <div hidden={value !== index} id={index} {...other}>
      {value === index && children}
    </div>
  );
}
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

export default ({ open, close }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [country, setCountry] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [terms, setTerms] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [userCredential, setUserCredential] = useState("");
  const [tnxId, setTnxId] = useState("");

  const [methodSelected, setMethodSelected] = useState("Master Card");
  let credentialInput = useRef();
  const [methods, setMethods] = useState([
    {
      name: "Master Card",
      image: MasterCard,
      credential: "1Pg18ymeaRegaFRZ7mmNKvfUjE12QV79FZ",
      active: false,
    },
    {
      name: "Payoneer",
      image: Payonner,
      credential: "pay@micple.com",
      active: true,
    },
  ]);
  function paymentActive(i = 0, name) {
    setMethodSelected(name);
    const newMethods = methods.map((m, p) => {
      if (i === p) {
        m.active = true;
      } else {
        m.active = false;
      }
      return m;
    });
    setMethods(newMethods);
  }
  function onClose() {
    setTab(0);
    setCountry("");
    // setPrivacy("");
    setGender("");
    setAge("");
    setDuration("");
    setBudget("");
    setTerms(false);
    setAgreed(false);
    close();
  }
  function onCopy() {
    credentialInput.select();
    document.execCommand("copy");
  }
  function onSubmit() {
    // todo
  }
  useEffect(() => {}, [methodSelected]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      style={{ display: "none" }}
    >
      <DialogTitle>
        <strong>Choose your preferences</strong>
      </DialogTitle>
      <DialogContent dividers>
        <TabPanel value={tab} index={0}>
          {/* Country */}
          <Autocomplete
            options={Countries}
            classes={{
              option: classes.option,
            }}
            autoHighlight
            fullWidth
            getOptionLabel={(option) => option.label}
            renderOption={(option) => (
              <Fragment>
                <ReactCountryFlag countryCode={option.code} svg />
                <span style={{ padding: "0px 2px 0px" }}></span>
                {option.label}
              </Fragment>
            )}
            onChange={(_, v) => {
              setCountry(v?.label);
              setTab(tab + 1);
            }}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                label="Target a country"
                variant="outlined"
                inputProps={params.inputProps}
              />
              // <input type="text"/>
            )}
          />
          <div className={classes.next}>
            <ButtonGroup size="small" variant="contained" color="primary">
              <button
                endIcon={<ArrowDownward />}
                onClick={() => setTab(tab + 1)}
                disabled={!country}
              >
                Next
              </button>
            </ButtonGroup>
          </div>
        </TabPanel>

        {/* <TabPanel value={tab} index={1}>
          Privacy
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="privacy">Choose Privacy</InputLabel>
            <Select
              fullWidth
              labelId="privacy"
              value={privacy}
              onChange={(_, { props }) => {
                setPrivacy(props.value);
                setTab(tab + 1);
              }}
              label="Choose Privacy"
            >
              <MenuItem value="Public">Public</MenuItem>
              <MenuItem value="Friends">Friends</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.next}>
            <ButtonGroup size="small" variant="contained" color="primary">
              <Button
                startIcon={<ArrowUpward />}
                onClick={() => setTab(tab - 1)}
              >
                Back
              </Button>
              <Button
                endIcon={<ArrowDownward />}
                onClick={() => setTab(tab + 1)}
                disabled={!privacy}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </TabPanel> */}

        <TabPanel value={tab} index={1}>
          {/* People */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="gender">Target Gender</InputLabel>
            <Select
              fullWidth
              labelId="gender"
              value={gender}
              onChange={(_, { props }) => {
                setGender(props.value);
                setTab(tab + 1);
              }}
              label="Target Gender"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.next}>
            <ButtonGroup size="small" variant="contained" color="primary">
              <Button
                startIcon={<ArrowUpward />}
                onClick={() => setTab(tab - 1)}
              >
                Back
              </Button>
              <Button
                endIcon={<ArrowDownward />}
                onClick={() => setTab(tab + 1)}
                disabled={!gender}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </TabPanel>

        <TabPanel value={tab} index={2}>
          {/* Age */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="age">Target Age</InputLabel>
            <Select
              fullWidth
              labelId="age"
              value={age}
              onChange={(_, { props }) => {
                setAge(props.value);
                setTab(tab + 1);
              }}
              label="Target Age"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="18 - 30">18 - 30</MenuItem>
              <MenuItem value="31 - 40">31 - 40</MenuItem>
              <MenuItem value="41 - 50">41 - 50</MenuItem>
              <MenuItem value="51 - 60">51 - 60</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.next}>
            <ButtonGroup size="small" variant="contained" color="primary">
              <Button
                startIcon={<ArrowUpward />}
                onClick={() => setTab(tab - 1)}
              >
                Back
              </Button>
              <Button
                endIcon={<ArrowDownward />}
                onClick={() => setTab(tab + 1)}
                disabled={!age}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </TabPanel>

        <TabPanel value={tab} index={3}>
          {/* Duration */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="duration">Choose Duration</InputLabel>
            <Select
              fullWidth
              labelId="duration"
              value={duration}
              onChange={(_, { props }) => {
                setDuration(props.value);
                setTab(tab + 1);
              }}
              label="Choose Duration"
            >
              <MenuItem value={6}>6 Days</MenuItem>
              <MenuItem value={12}>12 Days</MenuItem>
              <MenuItem value={18}>18 Days</MenuItem>
              <MenuItem value={24}>24 Days</MenuItem>
              <MenuItem value={30}>30 Days</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.next}>
            <ButtonGroup size="small" variant="contained" color="primary">
              <Button
                startIcon={<ArrowUpward />}
                onClick={() => setTab(tab - 1)}
              >
                Back
              </Button>
              <Button
                endIcon={<ArrowDownward />}
                onClick={() => setTab(tab + 1)}
                disabled={!duration}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </TabPanel>

        <TabPanel value={tab} index={4}>
          {/* Budget */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="budget">Number of People</InputLabel>
            <Select
              fullWidth
              labelId="budget"
              value={budget}
              onChange={(_, { props }) => {
                setBudget(props.value);
                setTab(tab + 1);
              }}
              label="Number of People"
            >
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={250}>250</MenuItem>
              <MenuItem value={500}>500</MenuItem>
              <MenuItem value={750}>750</MenuItem>
              <MenuItem value={1000}>1000</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.next}>
            <ButtonGroup size="small" variant="contained" color="primary">
              <Button
                startIcon={<ArrowUpward />}
                onClick={() => setTab(tab - 1)}
              >
                Back
              </Button>
              <Button
                endIcon={<ArrowDownward />}
                onClick={() => setTab(tab + 1)}
                disabled={!budget}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </TabPanel>

        <TabPanel value={tab} index={5}>
          {/* Preview */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <List style={{ flex: 1 }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Flag />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={country} secondary="Country" />
              </ListItem>
              {/* <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Public />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={privacy} secondary="Prrivacy" />
              </ListItem> */}
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Wc />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={gender} secondary="Gender" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Today />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={age} secondary="Age" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <People />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={budget} secondary="Number of People" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Schedule />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${duration} Days`}
                  secondary="Duration"
                />
              </ListItem>
            </List>
            <Divider orientation="vertical" style={{ height: 200 }} />
            <div style={{ flex: 1, padding: 5 }}>
              <Typography align="center" component="h3" variant="h4">
                $ {budget / 10 + 30 - duration * 0.8}
              </Typography>
              <Typography align="center" component="p" variant="body1">
                Some / any kind of description based on this package.
              </Typography>
            </div>
          </div>
          <div className={classes.next}>
            <ButtonGroup size="small" variant="contained" color="primary">
              <Button
                startIcon={<ArrowUpward />}
                onClick={() => setTab(tab - 1)}
              >
                Back
              </Button>
              <Button
                endIcon={<ArrowDownward />}
                onClick={() => setTab(tab + 1)}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </TabPanel>

        <TabPanel value={tab} index={6}>
          {/* Submit */}
          <div className="SubmitDiv">
            <div style={{ display: "flex" }}>
              {methods.map(({ name, image, active }, i) => (
                <img
                  key={i}
                  onClick={() => paymentActive(i, name)}
                  src={image}
                  alt={name}
                  style={{
                    border: `3px solid ${
                      methodSelected === name ? "#3f51b5" : "transparent"
                    }`,
                    padding: "0px 20px",
                    height: 125,
                    flex: 1,
                    cursor: "pointer",
                    borderRadius: 10,
                    marginBottom: "10px",
                  }}
                />
              ))}
            </div>
            {methodSelected === "Master Card" ? (
              <div
                className="masterCardDiv "
                // style={{
                //   display: "flex",
                //   alignItems: "center",
                // }}
              >
                <input
                  placeholder="Holder Name"
                  style={{
                    width: "100%",
                    border: "1px solid #e4e4e4",
                    height: "40px",
                  }}
                  type="text"
                />
                <input
                  placeholder="Holder Card Number"
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    border: "1px solid #e4e4e4",
                    height: "40px",
                  }}
                  type="text"
                  // Value={methods.find((i) => i.active).credential}
                  // Value="1Pg18ymeaRegaFRZ7mmNKvfUjE12QV79FZ"
                />

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="AdditionalInput"
                >
                  <div style={{ display: "flex" }} className="ExpDate">
                    <input
                      placeholder="Year"
                      style={{
                        marginTop: "10px",
                        width: "100%",
                        border: "1px solid #e4e4e4",
                        height: "40px",
                      }}
                      type="text"
                    />
                    <input
                      placeholder="Month"
                      style={{
                        marginTop: "10px",
                        width: "100%",
                        border: "1px solid #e4e4e4",
                        height: "40px",
                      }}
                      type="text"
                    />
                  </div>
                  <div className="cvc">
                    <input
                      placeholder="CVC code"
                      style={{
                        marginTop: "10px",
                        width: "100%",
                        border: "1px solid #e4e4e4",
                        height: "40px",
                      }}
                      type="text"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="payonerDiv ">
                <div
                  className="payonerCopy"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    border: " 1px solid #e4e4e4",
                  }}
                >
                  <input
                    style={{
                      width: "100%",
                      border: "#e4e4e4",
                      fontSize: "19px",
                      padding: "5px",
                      color: " #9e9a9a",
                      border: " 1px solid white",
                    }}
                    disabled
                    type="text"
                    value={methods.find((i) => i.active).credential}
                  />

                  <Button
                    color="primary"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        methods.find((i) => i.active).credential
                      );
                    }}
                  >
                    <FaRegCopy style={{ fontSize: "20px" }} />
                  </Button>
                </div>
                <div>
                  <input
                    placeholder="Transaction  ID"
                    style={{
                      marginTop: "10px",
                      width: "100%",
                      border: "1px solid #e4e4e4",
                      height: "40px",
                    }}
                    type="text"
                  />
                </div>
                <div>
                  <input
                    placeholder="Notes"
                    style={{
                      marginTop: "10px",
                      width: "100%",
                      border: "1px solid #e4e4e4",
                      height: "40px",
                    }}
                    type="text"
                  />
                </div>
              </div>
            )}
            <RegisterCondition />
          </div>
        </TabPanel>
      </DialogContent>

      {/* <DialogActions>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={onClose}
        >
          Cancel
        </Button>
      </DialogActions> */}
      {/* <Terms
        open={terms}
        close={() => {
          setTerms(false);
          setAgreed(true);
        }}
      /> */}
    </Dialog>
  );
};
