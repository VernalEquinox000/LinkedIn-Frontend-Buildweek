import React, { useState, useEffect } from "react";//modified
import io from "socket.io-client";
import {Form,Button} from "react-bootstrap"

const connOpt = {
	transports: ["websocket"]
}

let socket = io("https://striveschool-api.herokuapp.com", connOpt) 

function Message() {
    const [username, setUsername] = useState(null)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.on("bmsg", (msg) => setMessages((messages) => messages.concat(msg)))

        socket.on("connect", () => console.log("OOOON"))

        return () => socket.removeAllListeners();
    }, []);




    return (
        <>
            <div className="Message">
        <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
                <Form.Label>message</Form.Label>
                <Form.Control type="text" placeholder="Enter message" />
                
                </Form.Group>
                </Form>

                <Button variant="primary">Primary</Button>{' '}
        
        
            <ul id="messages">MESSAGE HERE
                {messages.map((msg, index) => (<li key={index} className={msg.user === username ? "myMsg" : "message"}>
                    {msg.user} : {msg.message}
                </li>))}
            </ul>
    </div>
    </>)

}

    export default Message;
