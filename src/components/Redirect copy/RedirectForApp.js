import React from "react";
import { useLocation } from "react-router-dom";

const RedirectForApp = () => {
  let location = useLocation();

  if (location.pathname.includes("/view/")) {
    return <></>;
  }

  // Redirect for APP STORE START
  function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }

    return "unknown";
  }

  function DetectAndServe() {
    let os = getMobileOperatingSystem();
    if (os === "Android") {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.micple";
    } else if (os === "iOS") {
      // window.location.href = "https://play.google.com/store/apps/details?id=com.micple";
      return "";
    } else if (os === "Windows Phone") {
      // window.location.href = "http://www.WindowsPhoneexample.com";
      return "";
    } else {
      // window.location.href = "https://play.google.com/store/apps/details?id=com.micple";
      return "";
    }
  }

  DetectAndServe();
  // Redirect for APP STORE END

  return <></>;
};

export default RedirectForApp;
