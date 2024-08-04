import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUser } from "./Hooks/getUser";
import Verification from '../../components/Verification/index'
import ProfileStatus from './components/ProfileStatus/index'

const Index = ({ children }) => {
  const [isLoading] = getUser();
  const {
    auth: { user },
  } = useSelector((state) => state);

  const { approved, banned, rejected, username } = user

  if (isLoading) {
    return <></>
  }

  else if (!username) {
    return <Redirect to="/signup" />
  }

  else if (approved && !banned && !rejected) {
    return children
  }

  else {
    return <ProfileStatus user={user}></ProfileStatus>;
  }
};

export default Index;
