import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUser } from "./Hooks/getUser";

const Index = ({ children }) => {
  const [isLoading] = getUser();
  const {
    auth: {
      user
    }
  } = useSelector((state) => state);


  if (isLoading) {
    return <></>
  }

  

  if (user.banned ) {
    return children
  }

else  if (user.verificationInfo?.status === 'Processing' && !user.rejected && !user.banned && !user?.approved) {
    return children
  }

  else if (user.verificationInfo?.status === 'Approved' && !user.rejected && !user.banned && user?.approved) {
    return children
  }

  else if (user.verificationInfo?.status === 'Rejected' && user.rejected && !user.banned && !user?.approved) {
    return children
  }

  else if (user.verificationInfo?.status === 'Under Review' && !user.rejected && !user.banned && !user?.approved) {
    return <Redirect to="/signup" />
  }

  
  else if (!user.rejected && !user.banned && user?.approved) {
    if (!user?.verificationInfo ||
      user?.verificationInfo?.idCard?.back?.media?.length > 0 ||
      !user?.verificationInfo?.idCard?.front?.media?.length > 0) {
      return <Redirect to="/signup" />
    }
    else {
      return children
    }
  }

  else if (user?.approved && !user.rejected && !user.banned) {
    if (user.verificationInfo?.status === 'Processing' || !user.verificationInfo || !user.verificationInfo.status) {
      return <Redirect to="/signup" />
    }
  }

  else {
    return user?.username ? (
      <>{children}</>
    ) : (
      <Redirect to="/signup" />
    );
  }

};

export default Index;
