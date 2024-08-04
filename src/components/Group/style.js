const { default: styled } = require('styled-components');

export const Main = styled('div')`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: white;
  border: 1px solid #e4e4e4;
  margin: 5px;
`;
export const Avatar = styled('img')`
  border-radius: 50%;
  height: 70px;
  width: 70px;
  margin-right: 10px;
  background-color: #fff;
  padding: 3px;
`;
export const Body = styled('div')`
  flex: 1 1 auto;
  padding: 5px;
`;
export const Buttons = styled('div')`
  button {
    margin: auto 5px;
  }
`;
