import React, { useState, useEffect } from "react";//modified
import io from "socket.io-client";

const connOpt = {
	transports: ["websocket"]
}

let socket = io("https://striveschool-api.herokuapp.com") 

function Message() {
    const [username, setUsername] = useState(null)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.on("bmsg", (msg) => setMessages((messages) => messages.concat(msg)))

        socket.on("connect", () => consol.log("OOOON"))

        return () => socket.removeAllListeners();
    }, []);



}


export default Message;
