import styled from 'styled-components';

export const TopBar = styled('div')`
  height: 73px;
  position: fixed;
  width: 50vw;
  // max-width: 980px !important;
  background-color: white;
  border-bottom: 1px solid #aaa;
  top: 0;
  z-index: 99;
  & > form {
    display: flex;
    justify-content: center;
    margin: 5px 0;
    height: 31px;
    input,
    button {
      border: 0;
      outline: 0;
      background-color: #f4f2f2;
      padding: 5px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    input {
      width: 400px;
      border-radius: 5px 0 0 5px;
    }
    button {
      border-radius: 0 5px 5px 0;
    }
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 31px;
    label {
      margin: 0;
      color: #464646;
      cursor: pointer;
      text-transform: capitalize;
      padding: 5px 10px;
      border-bottom: 3px solid transparent;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: capitalize;
      &.a {
        // border-bottom: 3px solid #f43636;
        border-bottom: 3px solid #0048bA;
      }
      img {
        height: 15px;
      }
      span {
        margin-left: 5px;
        font-weight: 700;
        font-size: 13px;
      }
    }
  }
`;
export const NoResult = styled('div')`
  height: 30vh;
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background: white;
  p {
    margin: 10px 0;
    font-size: 15px;
  }
  .sug {
    font-size: 16px;
    margin-bottom: 10px;
  }
  ul {
    margin: 0;
    list-style-type: circle;
    li {
      margin: 5px 0;
    }
  }
`;
export const Gallery = styled('div')`
  // margin: 0 250px;
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(290px,1fr));
  grid-gap: 10px;

`;

export const Gropus = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
  grid-gap: 10px;
`;


export const HomeSearch = styled('div')`
  // margin: 0 250px;
  margin: 5px 250px;
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(240px,1fr));
  grid-gap: 10px;

`;