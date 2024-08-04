import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

import { getIntigators, setPeerId } from "../../sockets/emit";
import { MsgReceived, MsgSent } from "../../assets/sounds";
import Compose from "../../components/Compose";
import NewsSidebar from "./NewsSidebar";
import Onlinebar from "./Onlinebar";
import GroupSetting from "./GroupSetting";
import ProfileSetting from "./ProfileSetting";
import { peer } from "../../shared";
import "./style.scss";
import { Grid } from "@material-ui/core";

function Layout({ children, site: { alerm } }) {
  
  let receivedAudio = useRef();
  let sentAudio = useRef();

  
  useEffect(() => {
    getIntigators();
    peer.on("open", (id) => {
      setPeerId(id);
    });
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
  return (
    <div style={{ padding: "0px 10px", width: "100vw" }} className="">
      <Grid container>
        <Grid
          style={{ width: "80%!important" }}
          item={true}
          lg={2}
          md={2}
          sm={2}
          xs={2}>
          <NewsSidebar />
        </Grid>

        <Grid item lg={8} xs={8} sm={8} md={8}>
          <div className="mainContent">{children}</div>
          <Compose />
        </Grid>

        <Grid item xs={2} lg={2} sm={2} md={2}>
          {window.location.href.includes("messanger/") ? (
            window.location.href.includes("messanger/g") ? (
              <GroupSetting />
            ) : (
              <ProfileSetting />
            )
          ) : (
            <Onlinebar />
          )}
        </Grid>
      </Grid>
      <audio src={MsgReceived} ref={(ref) => (receivedAudio = ref)} />
      <audio src={MsgSent} ref={(ref) => (sentAudio = ref)} />
    </div>
  );
}

export default connect((store) => ({ site: store.site }))(Layout);
