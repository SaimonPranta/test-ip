import styled, { keyframes } from 'styled-components';

export const MainUI = styled('div')`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #fff;
`;
export const BottomUI = styled('div')`
  width: 100%;
  position: absolute;
  bottom: 0px;
  .customerCare {
    position: absolute;
    bottom: 55px;
    right: 20px;
    .contact {
      cursor: pointer;
      position: relative;
      > img {
        height: 82px;
      }
      .link {
        font-size: 13px;
        text-align: center;
        color: #427dde;
      } 
    }
  }
  .copyright{
        // color: rgba(0,0,0,.7);
        padding-left: 10px;
        // color: #878787;
        font-size:13px;
        text-shadow: 0 1px rgba(255, 255, 255, 0.1);
      }
`;
export const BottomLayer = styled('div')`
  width: 100%;
  height: 50px;
  background-color: #eaeaea;
  border-top: 1px solid lightgray;
  .bottomFlex {
    height: 100%;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
export const BottomOptions = styled('div')`
  div {
    display: inline-block;
    margin-left: 20px;
    font-weight: 600;
    // text-transform: capitalize;
    color: #333;
    font-weight: 700;
  }
`;
export const CenterUI = styled('div')`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  > img {
    width: 200px;
  }
  .inputDiv {
    height: 40px;
    width: 400px;
    max-width: 100%;
    position: relative;
    z-index: 10;
    border: 1px solid #bfbfbf;
    border-radius: 30px;
    margin: 25px auto 0;
  }
`;
export const CustomInput = styled('input')`
  height: calc(100% - 0px);
  width: calc(100% - 80px);
  margin: 0px 40px;
  border: none;
  outline: none;
  font-size: 15px;
  background-color: transparent;
  :hover {
    border: none;
    outline: none;
  }
  :focus {
    border: none;
    outline: none;
  }
`;
export const CameraImg = styled('div')`
  position: absolute;
  top: 8px;
  left: 15px;
  > img {
    width: 18px;
    cursor: pointer;
  }
`;
export const VoiceImgDiv = styled('div')`
  position: absolute;
  top: 8px;
  right: 15px;
  > img {
    height: 18px;
    width: 17px;
    cursor: pointer;
  }
`;
export const CustomSearchButton = styled('button')`
  outline: none;
  border: none;
  width: 100px;
  height: 30px;
  background-color: #eaeaea;
  margin: 20px auto 0;
  display: block;
  border-radius: 5px;
  cursor: pointer;
`;
export const SignInDiv = styled('div')`
  position: fixed;
  z-index: 10;
  left: 15px;
  top: 15px;
  width: max-content;
`;
export const CustomButton = styled('button')`
  outline: none;
  border: none;
  width: 70px;
  height: 30px;
  background-color: #427dde;
  border-radius: 3px;
  color: white;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`;
export const ContactOption = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .option {
    .flexBox {
      display: flex;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      > img {
        width: 56px;
      }
      .text {
        margin-top: 5px;
        text-align: center;
        color: #005780;
      }
    }
  }
`;
export const UserIdSearch = styled('input')`
  height: 30px;
  width: ${({ width }) => (width ? width : '170px')};
  margin: ${({ noMargin }) => !noMargin && '0px 10px 0 0'};
  padding: ${({ noPadding }) => !noPadding && '0px 10px'};
  border: ${({ border }) => (border ? border : '1px solid #eaeaea')};
  outline: none;
  font-size: 14px;
  border-radius: 5px;
  :hover {
    border: 1px solid #eaeaea;
    outline: none;
  }
  :focus {
    border: 1px solid #eaeaea;
    outline: none;
  }
`;
export const SingInModalUI = styled('div')`
  margin-bottom: 20px;
  width: ${({ width }) => (width ? width : '400px')};
  .flex {
    display: flex;
    align-items: center;
    position: relative;
  }
`;
export const CustomModalUI = styled('div')`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 100;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  .relative {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
  }
`;
export const LeftCustomPopup = styled('div')`
  width: 400px;
  height: calc(100vh - 100px);
  background-color: white;
  padding: 10px;
  position: absolute;
  top: 50px;
  left: 50px;
`;
export const ChatBox = styled('div')`
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  background-color: white;
  border-radius: 12px;
  padding: 15px;
  position: relative;
  .top {
    display: flex
    align-items: center;
    justify-content: center;
    .support {
      padding: 15px 30px;
      background-color: #8BC34A;
      font-size: 53px;
      border-radius: 50%;
      font-weight: bold;
      font-family: system-ui;
    }
  }
`;
export const RightCustomPopup = styled('div')`
  width: 400px;
  height: calc(100vh - 100px);
  background-color: white;
  position: absolute;
  top: 50px;
  right: 50px;
`;
export const CustomTextArea = styled('textarea')`
  width: calc(100% - 0px);
  font-family: system-ui;
  outline: none;
  border: ${({ showBorder, border }) => (showBorder ? (border ? border : '1px solid #eaeaea') : 'none')};
  height: ${({ height }) => height && height};
  font-size: 24px;
  overflow: hidden;
  line-height: ${({ lineHeight, height }) => (lineHeight ? lineHeight : height && height)};
  text-align: ${({ noCenter }) => !noCenter && 'center'};
  ::-webkit-input-placeholder {
    color: ${({ placeHolderColor }) => (placeHolderColor ? placeHolderColor : '#427dde')};
    transform: translate3d(0, -4px, 0);
  }
`;
export const MessageBox = styled('div')`
  position: absolute;
  bottom: 10px;
  width: calc(100% - 30px);
`;
export const SupportProfile = styled('div')`
  width: 60px;
  height: 60px;
  background-color: lightgray;
  border-radius: 50%;
`;
export const HeaderEmail = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  .title {
    margin-top: 30px;
    padding: 15px;
    background-color: #8bc34a;
    color: #3f51b5;
    font-size: 88px;
  }
`;
export const Wrapper = styled('div')`
  padding: 25px 25px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 30px;
    padding: 5px 13px;
    color: white;
    background-color: black;
    font-weight: bold;
    > span {
      color: red;
      margin-left: 5px;
    }
  }
`;
export const CallPhone = styled('div')`
  width: calc(100% - 360px);
  text-align: center;
  padding: 0px 30px;
  color: #039be5;
  font-weight: bold;
  .phone {
    font-size: 54px;
    border: 1px solid black;
    padding: 13px 50px;
  }
  .info {
    margin-top: 20px;
    border: 1px solid black;
    padding: 13px 19px;
    font-size: 36px;
    width: 400px;
  }
`;
export const CallUsCircle = styled('div')`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: black;
`;
export const SubmitButton = styled('div')`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '50px')};
  padding: 5px 26px;
  color: white;
  background-color: black;
  border: none;
  font-weight: bold;
  font-family: system-ui;
  word-break: break-all;
`;
export const MessageBlock = styled('div')`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? 'flex-start' : 'flex-end')};
  margin-top: 10px;
`;
export const PassIcon = styled('div')`
  position: absolute;
  left: 147px;
  top: 2px;
  > svg {
    font-size: 17px;
  }
`;
export const SideModalUI = styled('div')`
  position: fixed;
  left: ${({ align }) => (align === 'left' ? '2%' : 'auto')};
  right: ${({ align }) => (align === 'right' ? '2%' : 'auto')};
  top: 40%;
  transform: translateY(-50%);
  z-index: 9999;
  width: 300px;
  background: transparent;
  border-radius: 5px;
  width: 300px;
`;
export const CloseModalUI = styled('div')`
  position: relative;
`;
const floatText = keyframes`
  to {
    transform: translateX(-100%);
  }
`;
export const Notice = styled('div')`
  position: fixed;
  bottom: 50px;
  left: 20%;
  right: 20%;
  overflow: hidden;
  div {
    display: inline-block;
    white-space: nowrap;
    padding: 0 100% 3px 100%;
    animation: ${floatText} 16s infinite linear;
    padding-left: 100%;
    width: 100%;
    &:hover {
      animation-play-state: paused;
    }
  }
`;
