import styled from "styled-components";
export const Container = styled("div")`
  width: 100%;
  height: 180px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #aaa;
`;
export const Space = styled("div")`
  height: 100%;
  width: 100%;
  // background-color: #fffffff2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .t {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    label {
      cursor: pointer;
      background: #3f51b5;
      color: white;
      border-radius: 3px;
      display: flex;
      align-items: center;
      padding: 8px;
      i {
        margin-right: 4px;
      }
    }
    form {
      display: flex;
      height: 40px;
      overflow: hidden;
      input {
        color: black;
        padding: 0 8px;
        background: transparent;
        border: 2px solid #3f51b5;
        height: 40px;
        &::-webkit-input-placeholder {
          color: black;
        }
        &::-moz-placeholder {
          color: black;
        }
        &:-ms-input-placeholder {
          color: black;
        }
        &:-moz-placeholder {
          color: black;
        }
      }
      button {
        border: 0;
        color: #fff;
        background: #3f51b5;
        width: 45px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;

      }
    }
  }
  .b {
    // padding: 8px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
`;
export const SetCover = styled("div")`
  height: 180px;
  overflow-x: auto;
  cursor: ns-resize;
  img {
    width: 100%;
    max-height: none;
    margin-bottom: -5px;
    background-color: #ddd;
  }
`;
export const AvatarContainer = styled("div")`
  margin-bottom: -26px;
  display: flex;
  align-items: center;
  .name {
    color: #434242fa;
    font-size: 25px;
  }
`;
export const UserProfile = styled("div")`
  height: 100px;
  width: 100%;
  padding: 5px;
  margin-right: 10px;
  background-color: #fff;
  border:'1px solid red;

  label {
    cursor: pointer;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    input {
      display: none;
    }
    div {
      // position: absolute;
      background-color: #0005;
      
      width: 100%;
      display: flex;
      justify-content: center;
      bottom: -8px;
      padding: 5px 0;
      svg {
        color: #fff;
      }
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
export const Buttons = styled("div")`
  display: flex;
  align-items: end;
  button {
    font-size: 12px;
    margin: 0 5px;
    svg {
      font-size: 20px;
      color: #fff;
    }
  }
`;
