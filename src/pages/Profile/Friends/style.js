import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

export const FriendsContainer = styled('div')`
  width: 98%;
  margin: 0 auto;
`;
export const FriendCard = styled('div')`
  display: flex;
  align-items: center;
  border: 1px solid #c6c6c6;
  padding: 5px;
  background-color: white;
`;
export const FriendAvatar = styled(Avatar)`
  height: 90px !important;
  width: 90px !important;
  & > img {
    border-radius: 50%;
    padding: 3px;
    border: 1px solid #b9b9b9;
    margin-right: 5px;
  }
`;
export const FriendInfo = styled('div')`
  margin-left: 5px;
  a {
    font-size: 16px;
    font-weight: 700;
    display: block;
    margin-bottom: 5px;
  }
`;
export const Navbar = styled('ul')`
  list-style-type: none;
  margin: 20px 0;
  li {
    display: inline-block;
    width: 230px;
    margin: 0 5px;
    a {
      font-size: 15px;
      padding: 5px;
      display: block;
      color: black;
      border-left: 5px solid #c6c6c6;
      border-top: 1px solid #c6c6c6;
      border-right: 1px solid #c6c6c6;
      border-bottom: 1px solid #c6c6c6;
      &.active {
        font-weight: bold;
        border-left: 5px solid #3f51b5;
        border-top: 1px solid #3f51b5;
        border-right: 1px solid #3f51b5;
        border-bottom: 1px solid #3f51b5;
      }
    }
  }

  @media (max-width: 1480px) {
    li {
      display: inline-block;
      width: 180px;
      margin: 0 5px;
    }

  }

`;
