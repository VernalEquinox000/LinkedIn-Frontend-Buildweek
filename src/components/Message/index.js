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

        socket.on("connect", () => console.log("OOOON"))

        return () => socket.removeAllListeners();
    }, []);




    return (<>
        <div className="Message">
            <ul id="messages">MESSAGE HERE
                {messages.map((msg, index) => (<li key={index} className={msg.user === username ? "myMsg" : "message"}>
                    {msg.user} : {msg.message}
                </li>))}
            </ul>
    </div>
    </>)

}

    export default Message;
