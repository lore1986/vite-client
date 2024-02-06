import React, { useContext, useEffect, useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

import { CMD_RW } from '../../config/BaseConfig';
import { WebSocketContext } from '../../context/Websockets';
import { FolderMissionStruct } from '../Missions/MissionDirectoryTree'
import { MissionHead } from '../Missions/MissionHeader';
import { WayPoints } from '../Missions/WayPoints';




export function Missions() {

    const { skMessage, sendMessage } = useContext(WebSocketContext);
    const [tree, setTree] = useState("");
    const [header, setHead] = useState("")
    const [waypoints, setWaypoints] = useState("")

    var parsedData = useRef("");
    var selectedFilePath = useRef("")

/*    var tree = useRef("")
    var header = useRef("")
    var waypoints = useRef("")
*/
    const RequestMissionWayPoints = (filePath) => {
        
        var waypointRequest;

        const corrected_path = filePath.trim();
        selectedFilePath.current = corrected_path;
        const missionPathNameChar = Uint8Array.from(corrected_path.split("").map(x => x.charCodeAt()));
        const commandArray = new Uint8Array([CMD_RW.ID_WEBAPP, CMD_RW.ID_MODULO_BASE, CMD_RW.ID_MODULO_BASE, CMD_RW.REQUEST_CMD1, CMD_RW.GET_MISSION_CMD2, CMD_RW.GET_MISSION_PARAM_CMD3])

        waypointRequest = new Uint8Array(commandArray.length + missionPathNameChar.length + 1);
        waypointRequest.set(commandArray);
        waypointRequest.set(missionPathNameChar, commandArray.length);
        waypointRequest.set(0x00, commandArray.length + missionPathNameChar.length)

        sendMessage(waypointRequest)
    };

    const handleClick = () => {
        console.log("message sending");
        sendMessage(new Uint8Array([CMD_RW.ID_WEBAPP, CMD_RW.ID_MODULO_BASE, CMD_RW.ID_MODULO_BASE, CMD_RW.REQUEST_CMD1, CMD_RW.UPDATE_MISS_LIST_CMD2, CMD_RW.UPDATE_FILE_LIST_CMD3, 0x00, 0x00]));
    };

   

    useEffect(() => {

        if (skMessage !== undefined) {
            parsedData.current = JSON.parse(skMessage.MessageData);
            if (skMessage.MessageType == "DTree") {
                //setData(parsedData.current);
                setTree(parsedData.current);
            } else if (skMessage.MessageType == "MMW") {
                //setMissionHead(parsedData.current);
                setHead(parsedData.current);
            } else if (skMessage.MessageType == "AllWayPoints") {
                setWaypoints(parsedData.current);
            }
        }

    }, [skMessage]);



    return (
        <Col xs={4}>
            <Row>
                <Col xs={1} className='m-3 text-center'>
                    <Image
                        className="img-fluid"
                        src="/src/assets/flash.png"
                        alt="FLASH Image"
                        style={{ maxWidth: '40px', maxHeight: '40px', cursor: 'pointer' }}
                        onClick={handleClick}
                        onMouseEnter={(e) => {
                            e.target.style.opacity = '0.7';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.opacity = '1';
                        }}
                    />
                </Col>
                <Col xs={2}>
                    <p> File: {selectedFilePath.current}</p> 
                </Col>
               
            </Row>
            <Row>
                <Col xs={4}>
                    <FolderMissionStruct treedata={tree} onclickpath={RequestMissionWayPoints} />
                </Col>
                <Col xs={8}>
                    <MissionHead headmission={header} />
                </Col>
            </Row>

            <Row>
                
                    <WayPoints waypointData={waypoints} />
               
            </Row>
        </Col>
    );
}
