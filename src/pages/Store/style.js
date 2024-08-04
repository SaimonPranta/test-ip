import styled from "styled-components";

export const StoreDiv = styled("div")`
  background-color: #fff;
  padding: 30px;
`;

export const Header = styled("div")`
  //   height: 100vh;
  display: flex;
  justidy-content: space-around;
  button {
    background-color: #666;
    border: none;
    border-radious: 20px;
    color: white;
    padding: 10px 20px;
    margin: 20px;
    font-size: 20px;
  }
`;

export const ButtonSign = styled("p")`
  display: inline-block;
  padding: 9px 35px;
  border: none;
  border-radius: 2px;
  background: #547c99;
  color: white;
  font-size: 19px;
  text-transform: capitalize;
  letter-spacing: 2px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: #3d637e;
    transform: scale(0.7);
  }
`;
