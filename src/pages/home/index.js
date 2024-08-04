/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, lazy } from "react";
import { DialogContent, Zoom, Dialog } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { parse } from "query-string";
import axios from "axios";
import LiveChat from "./Support/LiveChat/index"; 

import {
  ChatIcon,
  MailIcon,
  CameraIcon,
  VoiceIcon,
  LogoIcon,
} from "../../assets/home";
import { BACKEND_URL } from "../../shared/constants/Variables";
import { MsgReceived, MsgSent } from "../../assets/sounds";
import { closeRingReceivedAlerm, getSiteInfo } from "../../store/site/action";
import { HoverOver } from "../../components/Tools";
import { Downloads } from "./Dialogs";
import socket from "../../sockets";
import Result from "./Result";
import Login from "./Login";
import "./style.scss";

import {
  MainUI,
  BottomUI,
  BottomLayer,
  CenterUI,
  CustomInput,
  CameraImg,
  VoiceImgDiv,
  CustomSearchButton,
  ContactOption,
  Notice,
} from "./styles";
import { MdKeyboardArrowRight } from "react-icons/md";
import { getUser } from "../../gardes/UserAuthGard/Hooks/getUser";

function Home(props) {
  const [modals, setModals] = useState("");
  const {
    location: { search },
    history,
    dispatch,
    site: {
      location: {
        country: { name, label },
        city,
      },
      dialCode,
      supportPhone,
      liveChat: { roomId, messages },
      alerm,
    },
    auth: { loggedIn },
  } = props;

  // document.title = "Search Engine with Social Communication and AIO Platform";
  const [query, setQuery] = useState(parse(search).q);
  const [tab, setTab] = useState(parse(search).t);
  const [support, setSupport] = useState(false);
  const [chat, setChat] = useState(false);
  const [mail, setMail] = useState(false);
  const [call, setCall] = useState(false);
  const [input, setInput] = useState(parse(search).q);
  const [login, setLogin] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState({ title: "Live Chat" });
  const [openDownloads, setOpenDownloads] = useState(false);
  const [notice, setNotice] = useState("");
  const [pages, setPages] = useState([{ title: "Live Chat" }]);
  let receivedAudio = useRef();
  let sentAudio = useRef();

  useEffect(() => {
    const { t, q, l } = parse(search);
    setTab(t);

    setQuery(q);
    if (!q) {
      history.push("/");
    }
    if (l === "now") {
      setLogin(true);
    }
  }, [search]);

  useEffect(() => {
    if (!name || !label || !dialCode || !supportPhone || !city) {
      dispatch(getSiteInfo());
    }
    axios.get(`${BACKEND_URL}/pages`).then(({ data }) => {
      if (data.data) {
        setPages((state) => {
          return [...state, ...data.data];
        });
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/front/notice`)
      .then(({ data }) => setNotice(data))
      .catch((err) => err);

  }, []);

  useEffect(() => {
    if (!!alerm.sent) {
      sentAudio.play();
    }
  }, [alerm.sent]);

  useEffect(() => {
    if (!!alerm.received) {
      receivedAudio.play();
    }
  }, [alerm.received]);

  const supportOptions = [
    {
      text: "Chat us",
      image: ChatIcon,
      popUpText: "chatWithUs",
      clickHandler: function () {
        socket.emit("user_open_support_chat", new Date().toISOString());
        setSupport(false);
        setChat(true);
      },
    },
    {
      text: "Email us",
      image: MailIcon,
      popUpText: "emailUs",
      clickHandler: function () {
        setSupport(false);
        setMail(true);
      },
    },
  ];
  function closeSupport() {
    // setSupport(true);
    setChat(false);
    setMail(false);
    setCall(false);

    dispatch(closeRingReceivedAlerm());

    socket.emit("user_chat_close", () => { });
  }
  const [historyArray, setHistoryArray] = useState(["asadasd", "asdasd"]);
  function handleSearch() {
    setHistoryArray((historyArray) => [...historyArray, input]);
  }
  const toggleClassList = () => {
    const routeList = document.getElementById("list-inner-container");
    if (!routeList) {
      return;
    }
    routeList.classList.toggle("active-route-list");
  };
  const handlePageNavigation = ({ route }) => {
    if (route) {
      history.push(route);
    } else {
      setModals("SupportChat");
    }
  };

  const handlePageRouteSelect = (context) => {
    toggleClassList();
    setSelectedRoute(context);
  };
  const handleModalOpen = () => {
    socket.emit("user_open_support_chat", new Date().toISOString());
    setSupport(false);
    setChat(true);
    // clickHandler: function () {
    //   socket.emit("user_open_support_chat", new Date().toISOString());
    //   setSupport(false);
    //   setChat(true);
    // }
  };

  return (
    // <HomePageSkeleton />
    <MainUI> 
      <Login login={login} />

      {/* Center UI */}

      <CenterUI>
        {/* Search */}
        <div id="resultPage" className={!!query ? "sdby resultMode " : "sdby "}>
          <div className="mnsb">
            {/* <Link to="/"> */}
            <img
              className="simg"
              src={LogoIcon}
              alt=""
              onClick={() => (window.location.href = "/")}
            />
            {/* </Link> */}
            {/* <Notification/> */}

            <form
              className="sfrm "
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              onSubmit={(e) => {
                e.preventDefault();
                if (!!input) {
                  setQuery(input);
                  history.push(`/?t=${tab || "web"}&q=${input}`);
                } else {
                  history.push("/");
                }
              }}>
              <div className="inputDiv">
                <CustomInput
                  className=""
                  placeholder="What do you want finding?"
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                />
                <CameraImg>
                  <HoverOver title="Not Available">
                    <img src={CameraIcon} alt="Camera" />
                  </HoverOver>
                </CameraImg>
                <VoiceImgDiv>
                  <HoverOver title="Not Available">
                    <img src={VoiceIcon} alt="Voice" />
                  </HoverOver>
                </VoiceImgDiv>
              </div>

              <CustomSearchButton type="Submit">Search</CustomSearchButton>
            </form>
            {!!query && (
              <Result
                country={name}
                query={query}
                tab={tab}
                loggedIn={loggedIn}
                setTab={(t) => {
                  setTab(t);
                  history.push(`/?t=${t}&q=${query}`);
                }}
              />
            )}
          </div>
        </div>
      </CenterUI>

      {/* Bottom UI */}
      <BottomUI>
        {!!notice &&
          window.location.protocol + "//" + window.location.host + "/" ==
          window.location.href && (
            <Notice>
              <div>{notice}</div>
            </Notice>
          )}
        {/* <div className="customerCare">
          <div className="contact" onClick={() => setModals("SupportChat")}>
            <img src={SupportIcon} alt="Live Chat" />
            <div className="link text-dark">Live Chat</div>
          </div>
        </div> */}
        <div className="copyright">
          Copyright &#169;{new Date().getFullYear()}
        </div>
        <BottomLayer>
          <div className="bottomFlex">
            <div>
              {!!label && (
                <>
                  {!!city && `${city}, `}
                  {label}
                </>
              )}
            </div>
            <div className="footer-navigation">
              <div className="inner-container">
                <div className="list-container">
                  <button
                    className="icon-container"
                    onClick={() => handlePageNavigation(selectedRoute)}>
                    {selectedRoute.title}
                  </button>
                  <button className="icon-container" onClick={toggleClassList}>
                    <MdKeyboardArrowRight />
                  </button>
                  <div
                    className="list-inner-container"
                    id="list-inner-container">
                    {/* {footerRouteList.map((routeItem, index) => {
                      if (selectedRoute.route !== routeItem.route) {
                        return (
                          <>
                            <button
                              key={index}
                              onClick={() => handlePageRouteSelect(routeItem)}>
                              {routeItem.label}
                            </button>
                          </>
                        );
                      }
                      return <></>;
                    })} */}
                    {pages.map((routeItem, index) => {
                      if (selectedRoute.route !== routeItem.route) {
                        return (
                          <>
                            <button
                              key={index}
                              onClick={() => handlePageRouteSelect(routeItem)}>
                              {routeItem.title}
                            </button>
                          </>
                        );
                      }
                      return <></>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BottomLayer>
      </BottomUI>
      <Downloads open={openDownloads} close={() => setOpenDownloads(false)} />

      <Dialog
        TransitionComponent={Zoom}
        open={support}
        onClose={() => setSupport(false)}
        maxWidth="sm"
        fullWidth>
        <DialogContent className="dialogue-grid support-pop-up">
          <ContactOption>
            {supportOptions.map((item, i) => (
              <div className="option" key={i} onClick={item.clickHandler}>
                <div className="flexBox">
                  <img src={item.image} alt="chat" />
                  <div className="text-dark">{item.text}</div>
                </div>
              </div>
            ))}
          </ContactOption>
        </DialogContent>
      </Dialog>
      <audio src={MsgReceived} ref={(ref) => (receivedAudio = ref)} />
      <audio src={MsgSent} ref={(ref) => (sentAudio = ref)} />
      <LiveChat modals={modals} setModals={setModals} />
    </MainUI>
  );
}

export default connect((store) => ({ auth: store.auth, site: store.site }))(
  withRouter(Home)
);
