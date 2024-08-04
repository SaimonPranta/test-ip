import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const AddButton = styled(Button)`
  font-size: 14px !important;
  text-transform: capitalize !important;
  padding: 2px 10px !important;
`;
export const Works = styled('div')`
  margin: 5px;
  & > h3 {
    font-size: 18px;
    color: black;
    text-align: center;
    border-bottom: 2px solid;
    margin: 0px;
    padding: 0px 0;
    width: 200px;
  }
`;
export const WorkItem = styled('div')`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #cacaca;
  .a {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid #b3b3b3;
    padding: 5px;
    margin: 5px 10px;
    & > * {
      width: 100%;
      height: 100%;
    }
  }
  .m {
    display:flex;
    margin: 0;
    width: max-content;
    padding: 10px;
    h3 {
      font-size: 17px;
      color: black;
      padding-right:10px;
    }
    .d::before{
      content:"("
    }
    .d::after{
      content:")"
    }
    .da::before{
      content:"("
    }
    .da::after{
      content:")"
    }
    .da{
      font-size: 13px;
      color: grey;
      margin-top: 4px;
    }
    h4 {
      font-size: 17px;
      color: grey;
      margin:  0;
      padding-right:10px;
    }
    .d {
      font-size: 13px;
      color: grey;
      margin-top: 2px;
    }
    p {
      font-size: 15px;
      color: gray;
      margin: 5px 0;
    }
  }
  button {
    svg {
      font-size: 17px;
    }
  }
`;

export const WorkForm = styled('form')`
  padding: 2px;
  border-bottom: 1px solid #bebebe;
  & > div {
    display: flex;
    margin: 10px 0;
    align-items: center;
  }
  .e,
  .p,
  .ds {
   
    & > div {
      min-width: 50%;
    }
  }
  .d {
    & > div {
      margin: 0 10px;
    }
  }
  .b {
    span {
      button {
        margin: 5px;
        height: 33px;
      }
    }
  }
`;


export const BioSection = styled('form')`
  padding: 2px;
  border-bottom: 1px solid #bebebe;
  display: flex;
  margin: 10px 0;
  align-items: center;
  justify-content: space-between;
`

export const BioContainer = styled('div')`
   display: flex;
`

// woorks here 
// .form_wrap {
//   height: 300px;
//   width: 500px;
//   background: white;
//   margin: 50px auto;
//   padding: 125px 0px 0px 100px;
//   outline: 5px solid rgba(0,0,0,0.1);
//   position:relative;
// }

// input[type="text"] {
//   border: 2px solid #afbdcf;
//   border-radius: 5px;
//   height: 47px;
//   width:300px;
//   color: #000000;
//   font-size: 14px;
//   padding-left: 20px;
//   box-shadow: none;  
// }

// input:focus + label, input:valid + label{
//   font-size: 12px;
//   color: #afbdcf;
//   top: -5px;
//   left:10px;
//   background: #ffffff;
//   padding: 0px 5px 0px 5px;
// }

// .input_wrap {width:auto; height:auto; position:relative;
// }

// .input_wrap label {
//   font-family:arial;
//   font-size:16px;
//   color: #afbdcf;
//   padding: 14px;
//   position: absolute;
//   top: 0;
//   left: 0;
//   transition:0.2s ease all; 
//   -moz-transition:0.2s ease all; 
//   -webkit-transition:0.2s ease all;
//   pointer-events: none;

// }

// input[type="text"]:focus {outline:none;}