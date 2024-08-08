import React, { Fragment, useState } from 'react';
import { Tooltip, Typography, Fade } from '@material-ui/core';
import { BsReply } from 'react-icons/bs';
import { RiReplyAllLine } from 'react-icons/ri';
import { RiReplyLine } from 'react-icons/ri';
import { MdContentCopy } from 'react-icons/md';
import './msghover.scss'
import {useScrollToBottom} from "react-scroll-to-bottom";
export default ({ children, title, placement = 'top', content, setReplyContent }) => {
  const scrollToBottom = useScrollToBottom()
  const [entered, setEntered] = useState(false);
  const inputBox = document.getElementById('inputBox')
  const replyHandler = () =>{
    setReplyContent(content)
    scrollToBottom()
    inputBox.focus()

  }

  const forwardHandler = (content) =>{
  }
  return (
    <div onMouseEnter={()=>setEntered(true)} onMouseLeave= {()=>setEntered(false)} >
      {entered && placement == 'left' && (
        <>
            <div data-title="Forward">
              <RiReplyLine style={{fontSize:'30px', marginRight:'5px'}} onClick={()=>forwardHandler(content)} />
            </div>
            <div data-title="Copy">
            <MdContentCopy style={{fontSize:'20px', marginRight:'5px'}} onClick={()=>{content ? navigator.clipboard.writeText(content) : navigator.clipboard.writeText('')}} />
            </div>
            <div data-title="Reply">
              <RiReplyAllLine style={{fontSize:'30px', transform: 'scaleX(-1)', marginRight:'10px'}} onClick={()=>replyHandler(content)} />
            </div>
        </>
      )}
        {children}
      {entered && placement == 'right' && (
        <>
        <div data-title="Reply">
          <RiReplyAllLine style={{fontSize:'30px', transform: 'scaleX(-1)', marginLeft:'5px'}} onClick={()=>replyHandler(content)} />
        </div>
        <div data-title="Copy">
          <MdContentCopy style={{fontSize:'20px', marginLeft:'5px'}} onClick={()=>{content ? navigator.clipboard.writeText(content) : navigator.clipboard.writeText('')}} />
        </div>
          
        <div data-title="Forward">
          <RiReplyLine style={{fontSize:'30px', marginLeft:'10px'}} onClick={()=> {}} />
        </div>
          
          
        </>
      )}
    </div>
  );
};
