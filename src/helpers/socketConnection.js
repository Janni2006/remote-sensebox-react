import socketIOClient from "socket.io-client";
import store from '../store';
import {SESSION_ID}from '../actions/types'

var socket = socketIOClient(process.env.React_APP_SAME_SERVER === "true"?window.location.origin:process.env.REACT_APP_REMOTE_BACKEND);

const sessionID = localStorage.getItem("sessionID");

if (sessionID) {
    socket.auth = { sessionID };
    socket.connect();
}else{console.log("no session id"); console.log(store.getState())}

socket.on("session", (sessionID) => {
    // attach the session ID to the next reconnection attempts
    socket.auth = { sessionID };
    // store it in the localStorage
    localStorage.setItem("sessionID", sessionID.sessionID);

    store.dispatch({type:SESSION_ID, payload:sessionID.sessionID})
});

export default socket;