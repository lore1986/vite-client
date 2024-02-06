import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types'
import { BaseConfig, CMD_RW } from '../config/BaseConfig'; 
import { useEffect } from 'react';

const WebSocketContext = React.createContext();
const WebSocketConsumer = WebSocketContext.Consumer;


function WebSocketProvider({ children, tockid }) {

    const [wsState, setWsState] = useState(BaseConfig.webSocketState.NOTCONNECTED);
    const [skMessage, setMessage] = useState();

    const wsRef = useRef();

    useEffect(() => {

        if (!wsRef.current)  {
            if (wsState == BaseConfig.webSocketState.NOTCONNECTED) {
                connectWs();
            }
        }

        return () => {
            if (wsState == BaseConfig.webSocketState.CLOSED) {
                wsRef.current.close();
            }
        }

    }, [wsState])
    
    const connectWs = () => {

        setWsState(BaseConfig.webSocketState.CONNECTING);

        wsRef.current = new WebSocket(BaseConfig.wsUrl);

        wsRef.current.onopen = () => {
            setWsState(BaseConfig.webSocketState.OPEN);

            const encoder = new TextEncoder();
            const uint8Array = encoder.encode(tockid);
            const messagePing = new Uint8Array([0x53])
            const combinedArray = new Uint8Array([...messagePing, ...uint8Array]);

            wsRef.current.send(combinedArray)
        };

        wsRef.current.onmessage = (e) => {

            setWsState(BaseConfig.webSocketState.MESSAGING);

          
            const reader = new FileReader();
            reader.onload = function () {

                if (reader.result && reader.result.length !== 0) {

                    if (reader.result != "PP") {
                        var dataMessage = JSON.parse(reader.result);
                        setMessage(dataMessage);
                    }
                    
                }
                
            };

            reader.readAsText(e.data, 'utf-8');

            const messagePing = new Uint8Array([0x50])
            wsRef.current.send(messagePing)
        };

        wsRef.current.onclose = () => {
            console.log('socket closed by server');
            setWsState(BaseConfig.webSocketState.NOTCONNECTED);
            wsRef.current.close();
            
        };

    };

    const closeWs = () => {
        console.log('socket closed by client');
        setWsState(BaseConfig.webSocketState.CLOSED);
        wsRef.current.close();
    };


    const sendMessage = (message) => {
        wsRef.current.send(message)
    }


    

    return (
        <WebSocketContext.Provider value={{ closeWs, wsState, sendMessage, skMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
}

WebSocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
    tockid: PropTypes.string.isRequired,
};

export { WebSocketContext, WebSocketConsumer, WebSocketProvider };