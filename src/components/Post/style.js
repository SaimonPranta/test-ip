import styled, { keyframes } from "styled-components";
import { TextField } from "@material-ui/core";

export const Post = styled("div")`
  margin: 10px;
  border: 1px solid #d2d2d2;
  background: white;
`;
export const CommentButtonWrapper = styled("div")`
  display: flex;
  align-items: center;
  margin: -1% 0 10px;
`;
export const CommentButton = styled("button")`
  border: 0;
  padding: 0;
  background: transparent;
  color: #385898;
  font-size: 12px;
  line-height: 12px;
  margin-right: 15px;
  display: block;
`;
export const TimeAgo = styled("p")`
  color: #606770;
  margin: 0;
  font-size: 12px;
  margin-left: 14px;
`;
export const Replies = styled("div")`
  display: flex;
  flex-wrap: wrap;
`;

// PromoteMiannDiv start from here
export const PromoteMiannDiv = styled("div")`
  background: white;
  padding: 0px 10px 20px;
  border: 1px solid #0048ba;
  border-radius: 0px;
  width: 10%;
  height: 550px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  // transform: translate(-50%, -50%);
  transform: translate(-50%, 521%);
  display: flex;
  justify-content: space-between;
  // align-items: center;
  // display: none;
  visibility: hidden;
  overflow: scroll !important;
  // z-index: 11111;
  z-index: 1;

  .MuiAutocomplete-root
    MuiAutocomplete-fullWidth
    MuiAutocomplete-hasClearIcon
    MuiAutocomplete-hasPopupIcon {
    outline: none;
  }
  .MuiAutocomplete-root:hover {
    border: none !important;
  }
`;

export const Title = styled("span")`
  font-size: 15px;
  font-weight: bold;
  color: black;
  width: 100%;
  display: flex;
  background: white;
  justify-content: center;
  padding: 10px;
  // border-bottom: 1px solid #e4e4e4;
  margin-bottom: 5px;
`;

// category section start from here
export const Small = styled("h1")`
  // display: none;
  visibility: hidden;
  font-size: 42px;
  transition: all 0.3s ease-in-out;
`;
export const ItemDiv = styled("div")`
  background: white;
  border: 1px solid #e4e4e4;
  padding: 40px 0px 5px 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3px;

  border-radius: 10px;
  height: 18vh;
  text-align: center;
  transition: all 0.3s ease-in-out;
  &:hover {
    padding: 10px 10px 10px 10px;
    background: white;
  }
  &:hover ${Small} {
    visibility: visible;
  }
`;

// category section end from here

export const WhiteBorderTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    // height: 50px;
  }

  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #e4e4e4;
    }
  }
`;

// Gender;
export const GenderDiv = styled("div")`
  #genders {
    width: 100%;
    height: 58px;
    padding: 10px;
    border: none
`;

// Gender;

// Age
export const AgeDiv = styled("div")`
  #ages {
    width: 100%;
    height: 58px;
    padding: 10px;
    border: none
`;
// Age

// People
export const PeopleDiv = styled("div")`
  #peoples {
    width: 100%;
    height: 58px;
    padding: 10px;
    border: none
`;
// Age

// People
export const DaysDiv = styled("div")`
  #days {
    width: 100%;
    height: 58px;
    padding: 10px;
    border: none
`;
// Age

// PreviewDiv
export const PreviewDiv = styled("div")`
overflow-y: scroll;
  #days {
    width: 100%;
    height: 58px;
    padding: 10px;
    border: none
`;
// PreviewDiv

// PaymentDiv
export const PaymentDiv = styled("div")`
  #days {
    width: 100%;
    height: 58px;
    padding: 10px;
    border: none
`;
// PaymentDiv

// PromoteMiannDiv start from here

export const CrossSpan = styled("span")`
  transition: all 0.3s ease-in-out;
  &:hover {
    color: grey;
    transform: scale(0.7);
  }
`;

// PreviewCalculate;
export const PreviewCalculate = styled("div")`
  border-left: 1px solid #e4e4e4;
  padding: 0px 20px;
  border-left: 1px solid #e4e4e4;

  div {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
`;
