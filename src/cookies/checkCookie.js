import React from "react";
import getCookie from "./getCookie";
import setCookie from "./setCookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie =  "sessionID=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
const checkCookie =()=> {
    const baseURL = "http://localhost:8000/todo/checkUser";
    let user = getCookie("sessionID");
    if (user != "") {
        axios.get(baseURL+"/"+user).then((response)=>{
          if(!response.data[0]){
            deleteAllCookies();
          }
        }).catch((error)=>{
            console.log("Error ocurred while loading data:"+error);
        });
        return true
    } else {
      if (user != "" && user != null) {
        return false
      }
    }
}

export default checkCookie

