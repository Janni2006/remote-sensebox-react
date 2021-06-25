import socketIOClient from "socket.io-client";
import store from '../store';
import {SESSION_ID}from '../actions/types'

if(process.env.REACT_APP_SAME_SERVER === "true"){
    var socket = socketIOClient(window.location.origin);  
} else {
    var socket = socketIOClient(process.env.REACT_APP_REMOTE_BACKEND);  
}

const sessionID = localStorage.getItem("sessionID");

if (sessionID) {
    socket.auth = { sessionID };
    socket.connect();
}

socket.on("session", (sessionID) => {
    // attach the session ID to the next reconnection attempts
    socket.auth = { sessionID };
    // store it in the localStorage
    localStorage.setItem("sessionID", sessionID.sessionID);

    store.dispatch({type:SESSION_ID, payload:sessionID.sessionID})
});

export default socket;