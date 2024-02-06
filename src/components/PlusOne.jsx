import React, { useContext, useEffect, useState, useRef } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { CMD_RW } from '../config/BaseConfig';
import { WebSocketContext } from '../context/Websockets';


export function MessagePingPong() {

    const { skMessage } = useContext(WebSocketContext);
    const [message, setMessage] = useState("NNN");


    useEffect(() => {

        setMessage(skMessage);

    }, [skMessage]);


    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" className="img-fluid img-thumbnail" src="/src/assets/imu.png" />
            <Card.Body>
                <p><span className="text-bolt">Data Message is: </span> {message}</p>
            </Card.Body>
        </Card>
    );
}


