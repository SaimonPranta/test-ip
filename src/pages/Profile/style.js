import styled from "styled-components";
import { Link } from "react-router-dom";

export const UserError = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const TabWrapper = styled("div")`
  box-shadow: 0 0 2px 0 #656565;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 120px;
  padding-right: 15px;
  border-bottom: 1px solid lightgray;
  background: #fff;
  height: 38px;
`;

export const LogOut = styled("button")`
  padding: 0 10px;
  border: 0;
  background: transparent;
  display: flex;
  `;
  // color: red;

export const NoItem = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  width: 100%;
  span {
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #777;
    border-bottom: 1px solid #777;
    padding-bottom: 10px;
  }
`;

export const RequestLink = styled(Link)`
  border: 1px solid #e4e4e4;
  padding: 3px 10px;
  color: black;
  border-radius: 3px;
  display: block;
  margin: 20px auto;
  width: 150px;
  text-align: center;
  &:hover {
    border: 1px solid #3f51b5;
  }
`;

export const Media = styled("div")`
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  justify-content: center;
`;

export const ContentItem = styled("div")`
  // width: 230px;
  cursor: pointer;
  // box-shadow: 0 0 5px #0004;
  margin: 5px;
`;

export const BottomOption = styled("div")`
  padding: 5px;
  font-size: 15px;
`;

export const Poster = styled("div")`
  position: relative;
  display: flex;
  height: 150px;
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;
  color: #ed143d;
`;

export const Duration = styled("span")`
  position: absolute;
  left: 10px;
  top: 10px;
  background-color: #666;
  padding: 0 5px;
  color: #fff;
  width: auto !important;
`;

export const CreatePoll = styled("div")`
  margin-top: 30px;
  background-color: #0048ba;
  display: inline;
  color: white;
  padding: 10px 20px;
  border-radius: 3px;
`;

export const PollingData = styled("div")`
  margin-top: 30px;
  background-color: red;
  display: inline;
  color: black;
  padding: 10px 20px;
  border-radious: 3px;

  display: inline-block;
  border-bottom: 3px solid red;

  background-color: red;
  display: inline-block;
  flex: reverse;
  justify-content: space-between;
`;

export const CreatrDes = styled("textarea")`
  border: 1px solid #e4e4e4;
  width: 100%;
  height: 80px;
`;
export const PollInput = styled("input")`
  border: 1px solid #e4e4e4;
  width: 100%;
  height: 40px;
  margin: 10px 0px;
`;
export const AddBtn = styled("button")`
  border: 1px solid #e4e4e4;
  display: inline;
  margin: 10px 0px;
  padding: 5px 20px;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  background-color: #0048ba;
`;
export const PolledSection = styled("div")`
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;
