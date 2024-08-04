import React, {useState} from 'react';
import {Container} from './style'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {AiOutlineEdit} from 'react-icons/ai'
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineUserSwitch, AiOutlinePlus } from "react-icons/ai";
import { BiMessageX } from "react-icons/bi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import {
    Menu,
    MenuItem,
    IconButton,
  } from "@material-ui/core";
const ProfileSetting = () => {
    const [anchorEl, setAnchorEl]= useState(null)
    const [edit, setEdit]= useState(null)
    const [expanded, setExpanded]= useState(true)
    function onEdit() {
        setEdit(true);
        setAnchorEl(null);
      }
      const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
      };
    return (
        <Container>
            <Accordion expanded={expanded}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={()=>setExpanded(e=>!e)}
                >
                     Settings   
                </AccordionSummary>
                <AccordionDetails>
                    <div className='section'>
                        <div className="section-item" >
                            <FiEdit2 style={{fontSize: '15px', width:'35px'}}/>
                            Nickname
                        </div>
                        <div className="section-item">
                            <FiEdit2 style={{fontSize: '15px', width:'35px'}} />
                            Description
                        </div>
                        <div className="section-item">
                            <BiMessageX style={{fontSize: '21px', width:'35px'}} />
                            Ignore
                        </div>
                        <div className="section-item">
                            <HiOutlineArrowNarrowRight style={{fontSize: '22px', width:'35px'}} />
                            Leave
                        </div>
                        <div className="section-item">
                            <AiOutlineDelete style={{fontSize: '24px', width:'35px'}} />
                            Delete
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            
            
        </Container>
    );
};

export default ProfileSetting;

