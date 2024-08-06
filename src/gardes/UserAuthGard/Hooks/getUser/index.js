/* eslint-disable react-hooks/rules-of-hooks */

import axios from "axios";
import { BACKEND_URL } from "../../../../shared/constants/Variables";
import { userHeader } from "../../../../shared/functions/Token";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AUTO_LOGIN } from "../../../../store/auth/action";


export const getUser =  () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const u_exp = parseInt(localStorage.getItem("u_exp"));
    const user =  JSON.parse(localStorage.getItem("u"));
    const token = localStorage.getItem("u_t");
   useEffect(() => {
    if (u_exp && u_exp > Date.now() && user && token) {
        axios
           .get(`${BACKEND_URL}/user/auth/auto`, {
               headers: userHeader(),
           })
           .then((res) => {
               setIsLoading(false);
               if (res.data) {
                   dispatch({ type: AUTO_LOGIN, payload: res.data });
               } else {
                   dispatch({ type: "SET_AUTH", payload: { loggedIn: false } });
               }
           })
           .catch((error) => {
               setIsLoading(false);
           });
   } else {
       dispatch({ type: "SET_AUTH", payload: { loggedIn: false } });
       setIsLoading(false);
   }
   }, []);

    return [isLoading];
}