import React, { useContext, useEffect, useRef, useCallback } from 'react';
import { Alert, Col } from 'react-bootstrap';
import { BaseConfig } from '../config/BaseConfig';
import { WebSocketContext } from '../context/Websockets';



const StateAlerts = {
    MESSAGING: <Alert key={0} variant="info">Messaging...</Alert>,
    OPEN: <Alert key={1} variant="success"></Alert>,
    CLOSING: <Alert key={2} variant="warning">Connection is closing...</Alert>,
    CLOSED: <Alert key={3}  variant="danger">Connection is closed!</Alert>,
    NOTCONNECTED: <Alert key={4} variant="secondary">Not connected yet!</Alert>,
};


export function WebSocketMonitoring() {

    const { wsState, closeWs } = useContext(WebSocketContext);


    window.addEventListener("beforeunload", () => {
        if (wsState == BaseConfig.webSocketState.OPEN) {
            closeWs();
        }
    });

    return (
       
        <Col xs={5}>
            {[StateAlerts[Object.keys(BaseConfig.webSocketState).find(index => BaseConfig.webSocketState[index] === wsState)]]}
        </Col>

    );
}