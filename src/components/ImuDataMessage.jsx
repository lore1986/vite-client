import React, { useContext, useEffect, useState, useRef } from 'react';
import { Card, Col} from 'react-bootstrap';
import { WebSocketContext } from '../context/Websockets';



const newImuData = {
    Yaw: 0,
    Pitch: 0,
    Roll: 0,
    Ax: 0,
    Ay: 0,
    Az: 0,
};

const ImuData = (parsedDataIn) => {

    var parsedData = parsedDataIn.data;

    if (parsedData) {
       
        return (
            <div>
                <ul className="list-unstyled" >
                    <li> <span style={{ fontWeight: 'bold' }} >Yaw: </span>  {parsedData.Yaw}</li>
                    <li><span style={{ fontWeight: 'bold' }} >Pitch: </span>{parsedData.Pitch}</li>
                    <li><span style={{ fontWeight: 'bold' }} >Roll: </span>{parsedData.Roll}</li>
                    <li><span style={{ fontWeight: 'bold' }} >Ax: </span>{parsedData.Ax}</li>
                    <li><span style={{ fontWeight: 'bold' }} >Ay: </span>{parsedData.Ay}</li>
                    <li><span style={{ fontWeight: 'bold' }} >Az: </span>{parsedData.Az}</li>
                </ul>
            </div>
        );
    } else {
        return (
            <h2>no data available</h2>
        )
    }

   
};


export function ImuDataMessage() {

    const { skMessage } = useContext(WebSocketContext);
    var parsedData = useRef("");

    

    useEffect(() => {

        if (skMessage !== undefined)
        {
            
            if (skMessage.MessageType == "ImuData") {
                parsedData.current = JSON.parse(skMessage.MessageData);
            }            
        }

    }, [skMessage]);


    return (
        <Col xs={2}>
            <Card>
                <Card.Img variant="top" className="img-fluid img-thumbnail" src="/src/assets/imu.png" />
                <Card.Body>
                    <Card.Title>IMU DUMMY DATA</Card.Title>
                    <ImuData data={parsedData.current} />
                </Card.Body>
            </Card>
        </Col>
        
    );
}


