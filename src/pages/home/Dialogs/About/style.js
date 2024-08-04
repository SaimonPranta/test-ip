import { DialogTitle, AppBar, Tabs, Tab, DialogContent, Button } from '@material-ui/core';
import styled from 'styled-components';

export const Title = styled(DialogTitle)`
  padding: 0px !important;
  height: 35px;
`;
export const Bar = styled(AppBar)`
  height: 35px;
`;
export const Navbar = styled(Tabs)`
  min-height: 35px !important;
  overflow: hidden;
`;
export const Nav = styled(Tab)`
  font-size: 15px !important;
  text-transform: initial !important;
  font-weight: bold !important;
  min-height: 35px !important;
  padding: 0px !important;
`;
export const Content = styled(DialogContent)`
  padding: 20px 20px !important;
  min-height: 250px;
`;
export const Understood = styled(Button)`
  font-size: 16px !important;
  text-transform: initial !important;
`;
export const H3 = styled('h3')`
  font-size: 22px;
  font-weight: 400;
  margin: 15px 0;
  color: #444;
`;
export const P = styled('p')`
  font-size: 18px;
  color: #444;
  margin: 15px 0;
  line-height: 1.5;
  font-weight: 400;
`;
export const Ul = styled('ul')`
  margin-bottom: 20px;
  padding-left: 40px;
  list-style-type: disclosure-closed;
  li {
    margin: 15px 0;
    font-size: 18px;
    color: #444;
  }
`;
