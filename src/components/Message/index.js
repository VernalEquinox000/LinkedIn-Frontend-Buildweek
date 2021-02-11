import React, { useState, useEffect } from "react";//modified
import io from "socket.io-client";
import {Container, Row, Col, Form,Button} from "react-bootstrap"

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

    const handleUsername = (e) => {
        setUsername(e.currentTarget.value)
    }

    const handleMessage= (e) => {
        setMessage(e.currentTarget.value)
    }

    const submitMessage = (e) => {
        e.preventDefault()
    }



    return (
        <>
                <Container className="Message">
                    <Row>
                        <Col xs ={6}>
        <Form inline onSubmit={submitMessage}>
  <Form.Group controlId="formChat">
    <Form.Label>name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" onChange={handleUsername} />
                <Form.Label>message</Form.Label>
                <Form.Control type="text" placeholder="Enter message" onChange={handleMessage}  />
                
                </Form.Group>
                </Form>

                <Button variant="primary" type="Submit">Send</Button>{' '}
        
        
            <ul id="messages">MESSAGE HERE
                {messages.map((msg, index) => (<li key={index} className={msg.user === username ? "myMsg" : "message"}>
                    {msg.user} : {msg.message}
                </li>))}
                </ul>
                </Col>
                    </Row>
                </Container>
            
    </>)

}

    export default Message;
