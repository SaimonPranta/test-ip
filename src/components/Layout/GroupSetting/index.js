import React, { useState } from "react";
import { Container } from "./style";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { AiOutlineEdit } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineUserSwitch, AiOutlinePlus } from "react-icons/ai";
import { BiMessageX } from "react-icons/bi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
const GroupSetting = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(null);
  function onEdit() {
    setEdit(true);
    setAnchorEl(null);
  }
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  return (
    <Container>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          General Settings
        </AccordionSummary>
        <AccordionDetails>
          <div className="section">
            <div className="section-item">
              <FiEdit2 style={{ fontSize: "17px", width: "35px" }} />
              Nickname
            </div>
            <div className="section-item">
              <FiEdit2 style={{ fontSize: "17px", width: "35px" }} />
              Description
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">
          Members (0)
        </AccordionSummary>
        <AccordionDetails>
          <div className="section">
            <div className="section-item">
              <AiOutlineUserSwitch
                style={{ fontSize: "22px", width: "35px" }}
              />
              Requests (0)
            </div>
          </div>
          <div className="section">
            <div className="section-item">
              <AiOutlinePlus style={{ fontSize: "21px", width: "35px" }} />
              Add member
            </div>
          </div>

          <div className="section" style={{ paddingTop: "10px" }}>
            <div className="section-item">
              <img
                src="https://storage.ws.pho.to/s2/1143b508b6ac78a72d0f741b7f5792ab3237ffee_m.jpeg"
                alt=""
              />
              Dihan Abir
              <FaCheckCircle
                style={{ color: "green", fontSize: "12px", marginLeft: "10px" }}
              />
              <IoIosMore
                onClick={handleClick}
                style={{
                  position: "absolute",
                  right: "20px",
                  fontSize: "22px",
                  width: "30px",
                  cursor: "pointer",
                }}
              />
            </div>
            <div className="section-item">
              <img
                src="https://storage.ws.pho.to/s2/1143b508b6ac78a72d0f741b7f5792ab3237ffee_m.jpeg"
                alt=""
              />
              Masud Rana
              <FaCheckCircle
                style={{ color: "green", fontSize: "12px", marginLeft: "10px" }}
              />
              <IoIosMore
                onClick={handleClick}
                style={{
                  position: "absolute",
                  right: "20px",
                  fontSize: "22px",
                  width: "30px",
                  cursor: "pointer",
                }}
              />
            </div>

            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={!!anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={origin}
              transformOrigin={origin}>
              <MenuItem>
                <p
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                  onClick={handleClick}>
                  {" "}
                  {/* <RiPushpin2Line
                                        style={{ fontSize: "20px", marginRight: "4px" }}
                                        />{" "} */}
                  Make Admin
                </p>
              </MenuItem>
              <MenuItem>
                <p
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                  onClick={handleClick}>
                  {" "}
                  {/* <RiPushpin2Line
                                        style={{ fontSize: "20px", marginRight: "4px" }}
                                        />{" "} */}
                  Remove member
                </p>
              </MenuItem>
              <MenuItem>
                <p
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                  onClick={handleClick}>
                  {" "}
                  {/* <RiPushpin2Line
                                        style={{ fontSize: "20px", marginRight: "4px" }}
                                        />{" "} */}
                  View Profile
                </p>
              </MenuItem>
              <MenuItem>
                <p
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                  onClick={handleClick}>
                  {" "}
                  {/* <RiPushpin2Line
                                        style={{ fontSize: "20px", marginRight: "4px" }}
                                        />{" "} */}
                  Message
                </p>
              </MenuItem>
              <MenuItem>
                <p
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                  onClick={handleClick}>
                  {" "}
                  {/* <RiPushpin2Line
                                        style={{ fontSize: "20px", marginRight: "4px" }}
                                        />{" "} */}
                  Block
                </p>
              </MenuItem>
            </Menu>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">
          Privacy
        </AccordionSummary>
        <AccordionDetails>
          <div className="section">
            <div className="section-item">
              <BiMessageX style={{ fontSize: "21px", width: "35px" }} />
              Ignore
            </div>
            <div className="section-item">
              <HiOutlineArrowNarrowRight
                style={{ fontSize: "22px", width: "35px" }}
              />
              Leave
            </div>
            <div className="section-item">
              <AiOutlineDelete style={{ fontSize: "24px", width: "35px" }} />
              Delete
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default GroupSetting;
