import React, { useState } from "react";
import { Dialog, DialogActions, Button } from "@material-ui/core";

import { Title, Bar, Navbar, Nav, Content } from "./style";
import Privacy from "./Privacy";
import Terms from "./Terms";
import About from "./About";

export default ({ open, close }) => {
  const [tab, setTab] = useState(0);
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="md" scroll="paper">
      <Title>
        <Bar position="static" color="transparent">
          <Navbar
            variant="fullWidth"
            value={tab}
            onChange={(_, val) => setTab(val)}
          >
            <Nav label="About us" />
            <Nav label="Privacy Policy" />
            <Nav label="Terms & Conditions" />
          </Navbar>
        </Bar>
      </Title>
      <Content dividers>
        <About tab={tab} />
        <Privacy tab={tab} />
        <Terms tab={tab} />
      </Content>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={close}
          style={{ fontSize: 14, textTransform: "initial", padding: "0 5px" }}
        >
          Understood
        </Button>
      </DialogActions>
    </Dialog>
  );
};
