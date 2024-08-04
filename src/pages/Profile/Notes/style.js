import styled from "styled-components";
import { ListItem, Typography } from "@material-ui/core";

export const PoperIcon = styled("p")`
  cursor: pointer;
  // padding: 10px 15px;
  // &:hover {
  //   padding: 10px 15px;
  //   background-color: #e4e4e4;
  //   border-radius: 50%;
  // }
`;
export const Nonote = styled("div")`
  text-align: center;
  margin: 30px auto;
  font-size: 16px;
  font-weight: 700;
  color: #777;
  border-bottom: 1px solid #777;
  width: 100px;
  padding-bottom: 10px;
`;
export const AddNoteButton = styled("div")`
  margin: 10px auto;
  display: flex;
  justify-content: center;
`;
export const Item = styled(ListItem)`
  display: flex;
  align-items: center;
  background-color: #fff;
`;
export const Title = styled(Typography)`
  font-size: 16px !important;
  font-weight: 700 !important;
  cursor: pointer;
  color: #000;
`;
export const Info = styled("div")`
  flex: 1 1 auto;
  margin: 0px 5px;
  padding: 0px 5px;
`;
export const Buttons = styled("div")`
  display: flex;
  svg {
    font-size: 18px;
  }
`;

export const Preview = styled("div")`
  display: flex;
  fload: left;
  overflow: hidden;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 auto;
  align: end;
  justify-content: space-between;
`;
