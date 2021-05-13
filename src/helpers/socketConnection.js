import socketIOClient from "socket.io-client";

var socket = socketIOClient(process.env.REACT_APP_REMOTE_BACKEND);

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
});

export default socket;