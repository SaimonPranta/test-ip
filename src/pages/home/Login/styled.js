import styled from "styled-components";
import { Link } from "react-router-dom";

export const Profile = styled(Link)`
  display: flex;
  border: 1px solid #e4e4e4;
  border-radius: 50%;
  img {
    height: 60px;
    width: 60px;
    padding: 3px;
    border-radius: 50%;
  }
`;
