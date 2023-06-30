import React from "react";
const  setCookie = (cname,cvalue)=>{
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log("Cookie Set")
    return true
}
export default setCookie