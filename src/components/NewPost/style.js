import styled, { css } from "styled-components";

export const Container = styled("div")`
  border-bottom: 1px solid #888;
  background-color: white;
  position: relative;
`;
export const Spin = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #fff8;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
`;
export const Create = styled("div")`
  padding: 2px;
  display: flex;
  align-items: center;
  ${({ active }) =>
    active &&
    css`
      position: relative;
      z-index: 4;
      background: #fff;
    `};
`;
export const Drop = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0008;
  z-index: 3;
`;
export const Left = styled("div")`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
export const Right = styled("div")`
  display: flex;
  justify-content: center;
  max-width: 100%;
  flex: 1;
  padding: 0px;
  flex-wrap: wrap;
  max-height: 200px;
  & > div {
    // flex: 1;
    position: relative;
    margin-bottom: -2px;
    button.c {
      position: absolute;
      z-index: 9;
      top: -2px;
      right: -11px;
      background-color: red;
      padding: 5px;
      height: 25px;
      width: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #fff;
      outline: none;
      border-radius: 50%;
      color: #fff;
    }
    img, video
    {
      border-style: double;
      border-color : lightgray;
      padding: 5px;
      width: 255px;
      height: 144px;
      // box-shadow: 0 0 5px 5px #000b;
    }
   
  }
`;
export const postTextArea = styled("");
