import { Avatar, Button as Buttons } from '@material-ui/core';
import styled from 'styled-components';

export const Button = styled(Buttons)`
  text-transform: capitalize !important;
  margin: 0 3px !important;
  font-size: 14px !important;
  padding: 0 !important;

`;


export const CustomButton = styled('button')`
  background: transparent;
  border: 1px solid #bebebe;
  padding: 2px 10px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: capitalize;
  margin-right: 6px;

  &:hover {
    background: #3f51b5;
    transition: background .5s;
    color: #fff;
  }

`;

export const FriendCard = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #c6c6c6;
  border-radius: 2px;
  padding: 0 5px;
  background-color: white;
  margin: 5px;
  border-radius: 3px;
  width: 100%;
  gap: 10px;
  max-width: 475px;
  // height: 73px;

`;
export const FriendAvatar = styled(Avatar)`
  height: 90px !important;
  width: 90px !important;
  & > img {
    border-radius: 50%;
    padding: 3px;
    border: 1px solid #b9b9b9;
    margin-right: 5px;
    width: 70%;
    height: 70%;
  }
`;
export const FriendInfo = styled('div')`
  margin-left: 5px;
  flex: 1 1 auto;
  a {
    font-size: 16px;
    font-weight: 700;
    display: block;
    margin-bottom: 5px;
    color: black;
  }
`;


export const WorkAndEducation = styled('p')`
    line-height:1

`