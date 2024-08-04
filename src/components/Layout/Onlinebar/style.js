import styled, { css } from 'styled-components';

export const InconWrapper = styled('div')`
  position: absolute;
  color: #999;
  display: flex;
  align-items: center;
  ${({ left }) =>
    left
      ? css`
          right: 100%;
          padding-right: 6px;
        `
      : css`
          left: 100%;
          padding-left: 6px;
        `};
`;
export const MoreChat = styled('div')`
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #556080;
  padding: 5px 10px;
  border-radius: 10px 0 0 0;
  color: #fff;
  font-size: 12px;
`;
