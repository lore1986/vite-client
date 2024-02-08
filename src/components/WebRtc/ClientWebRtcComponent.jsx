import React, { useState, useEffect, useRef, useContext } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';


export const ClientWebRtcComponent = () => {

    

    const webrtcConfiguration = {
        iceServers: [
            {
                urls: 'stun:stun1.l.google.com:19302'
            }
            ,
            {
                urls: 'turn:millelingue.com:3478',
                username: 'ecodrone',
                credential: 'ecodrone2022',
            },
            {
                urls: 'stun:stun.yesss.at:3478' 
            }
        ]
    }

    var list_btn = [
        'btn_cam_0',
        'btn_cam_1',
        'btn_cam_2',
        'btn_cam_3',
        'btn_cam_4',
        'btn_cam_5',
        'btn_cam_6',
        'btn_cam_7'
    ]

    var el_streams =
    [
        'stream_0',
        'stream_1',
        'stream_2',
        'stream_3',
        'stream_4'
    ];

    var canvas;
    var _ch = 0;
    var r_points = [];
    var a_points = [];
    var senderPeer;
    var stream;
    var ncameras = 6;

    var entities = [];
    var thisuuid = "";
    var candidateSent = false;

    //INSTANTIATE WEBRTC INSTANCES
    function RtcpEntity(id) {

        this.id = id;
        this.active = false;
        this.webrtc_connection = new RTCPeerConnection(webrtcConfiguration);
        this.webrtc_connection.ontrack = (event) => { onAddRemoteStream(event, id) };
        this.webrtc_connection.onicecandidate = (event) => {
            if (!candidateSent && event.candidate !== null) {
                // Set the flag to true to indicate that a candidate is being sent
                candidateSent = true;


                setTimeout(() => {
                    console.log("Candidate is: ", event.candidate);
                    sendSocketMessage("P", "1", id, event.candidate);

                    // Reset the flag after sending the candidate
                    candidateSent = false;
                }, 100);
            }
        };
        this.stream = null;
    }

    entities = Array.from({ length: ncameras }, (_, index) => new RtcpEntity(index));

    //ATTACH REMOTE STREAM TO CORRECT ENTITY
    const onAddRemoteStream = (event, id) => {

        var idstream;

        switch (id) {
            case 5:
                idstream = document.getElementById("audio_boat");
                idstream.srcObject = event.streams[0];
                idstream.play()
                break;
            default:
                idstream = "stream_" + id;
                document.getElementById(idstream).srcObject = event.streams[0];
                break;
        }

        entities[parseInt(id)].stream = event.streams[0];
    }

    //CAMERA SIGNALS

    //Camera on
    function OnVideoPlay (e) {

        var idstream = e.currentTarget.getAttribute('data-idstream');
        e.currentTarget.style.display = 'none';

        var idnext_base = 'btn_cam_'
        var idnext = idnext_base.concat(((parseInt(idstream * 2) + 1)));

        document.getElementById(idnext).style.display = 'block';

        console.log("id: ", idstream);
        console.log("id prev: ", idnext)

        sendSocketMessage("C", "1", idstream, "stream");
    }

    //Camera off
    function OnVideoPause(el_v) {

        var idstream = el_v.currentTarget.getAttribute('data-idstream');
        el_v.currentTarget.style.display = 'none';

        var idnext_base = 'btn_cam_'
        var idnext = idnext_base.concat(((parseInt(idstream * 2))));

        document.getElementById(idnext).style.display = 'block';

        console.log("id: ", idstream);
        console.log("id prev: ", idnext)



        sendSocketMessage("C", "0", idstream, "nostream");
        CameraOffSignal(idstream)
    }

    function CameraOffSignal (idcam) {
        var idsimpa = "simpalao_" + idcam;
        var idstream = "stream_" + idcam;

        entities[idcam].webrtc_connection.close();
        entities[idcam].webrtc_connection = null;

        entities[idcam].webrtc_connection = new RTCPeerConnection(webrtcConfiguration);
        entities[idcam].webrtc_connection.ontrack = (event) => { onAddRemoteStream(event, idcam) }; 
        entities[idcam].webrtc_connection.onicecandidate = (event) => {
            if (!candidateSent && event.candidate !== null) {

                candidateSent = true;

                setTimeout(() => {
                    console.log("Candidate is: ", event.candidate);
                    sendSocketMessage("P", "1", idcam, event.candidate);
                    candidateSent = false;
                }, 100);
            }
        };

        document.getElementById(idsimpa).innerHTML = '<video id="' + idstream + '" className="embed-responsive-item" style="background-color:black; height:150px;" playsinline autoplay >Your browser does not support video</video>'
    }
   

    //PROTOCOL MESSAGES SDP/ICE
    function ProtocolMessage (msg) {

        switch (parseInt(msg["type"])) {
            case 0:
                //SDP message
                onIncomingSDP(msg)
                break;
            case 1:
                //ICE message
                onIncomingICE(msg)
                break;
        }
    }

    //SDP
    function onIncomingSDP (msg) {

        var data = msg.data;
        var identity_id = msg.identity;

        if (msg.identity == 6) {
            //console.log(JSON.stringify(msg))
            senderPeer.setRemoteDescription(new RTCSessionDescription(data)).catch(reportError);

        } else {
            var identity = entities[identity_id];
            identity.webrtc_connection.setRemoteDescription(new RTCSessionDescription(data)).catch(reportError);

            identity.webrtc_connection.createAnswer().then(
                (answ) => {
                    onLocalDescription(answ, identity_id)
                }).catch(reportError);
        }
    }

    function onLocalDescription  (desc, id) {

        entities[id].webrtc_connection.setLocalDescription(desc)
            .then(() => {
                
                sendSocketMessage("P", "0", id, entities[id].webrtc_connection.localDescription);
            })
            .catch((error) => {
                
                console.error("Error setting local description:", error);
            });
    }

    //ICE
    function onIncomingICE (msg) {

        var data = msg["data"];
        var identity;
        var candidate;

        if (msg.identity == 6) {
            candidate = new RTCIceCandidate(data);
            senderPeer.addIceCandidate(candidate).catch(reportError);
        } else {
            identity = entities[parseInt(msg.identity)];

            console.log(data)
            candidate = new RTCIceCandidate({
                sdpMLineIndex: data.sdpMLineIndex,
                candidate: data.candidate
            });

            //const modifiedUrl = event.candidate.url.replace("localhost", "192.168.1.135");
            console.log(candidate.url)
            

            //candidate = new RTCIceCandidate(candidate);
            identity.webrtc_connection.addIceCandidate(candidate).catch(reportError);
        }
    }

    //ID MESSAGE DISPLAY
    function UserMessage(msg) {
        let uname = msg.identity.toString()
        thisuuid = uname;
        console.log(uname)
        document.getElementById("myid").innerText = uname;
        //sendSocketMessage("NNN", "N", "N", "N", uuid);
    }

    const wsReff = useRef(null);

    const connectVideoWs = () => {

        wsReff.current = new WebSocket("ws://fasito.net:5055");

        wsReff.current.onopen = (e) => {

            var msgData = {
                scope: "U",
                type: "1",
                identity: "0",
                data: "identity"

            }

            wsReff.current.send(JSON.stringify(msgData));
        };

        wsReff.current.onerror = (e) =>
        {
            console.log("error");
            console.log(e);
        }

        wsReff.current.onmessage = (e) => {


            try {

                const jsonMessage = JSON.parse(e.data);
                
                switch (jsonMessage["scope"]) {
                    case "P": ProtocolMessage(jsonMessage); break;
                    case "U": UserMessage(jsonMessage); break
                   /* case "A": StartNegotiationAudio(); break;
                    case "T": ReadThetaState(jsonMessage); break;*/
                    default:
                        
                        //sendSocketMessage("NNN", "N", "N", "N", uuid);
                }

             

            } catch (e) {
                var myReader = new FileReader();

                console.log("error" + e.data)
                return;
            }

            /*var msgData = {
                scope: "U",
                type: "1",
                identity: "0",
                data: "identity"
            }
            
            wsReff.current.send(JSON.stringify(msgData));*/

        };

        // wsReff.current.onclose = () => {
        //     console.log('socket closed by client');
        //     wsReff.current.close();
        // };

    };


    //WebRTC: ICE failed, your TURN server appears to be broken, see about:webrtc for more details
    const sendSocketMessage = (scopein, typein, identityin, datain, direction = "server") => {

        var msgData = {
            scope: scopein,
            type: typein,
            direction: direction,
            uuid: thisuuid,
            identity: identityin.toString(),
            data: datain
        }

        setTimeout(() => {
            wsReff.current.send(JSON.stringify(msgData));
        }, 100);
    }


    useEffect(() => {

        if (!wsReff.current) {
            connectVideoWs();
        }

        return () => {
        }

    })
   

    return (
        <Col>
            <Row className="m-3">
                <p className="font-weight-bold"> Your id is: <span id="myid"></span></p>
            </Row>
            <Row className="m-2 p-4" id="simpalao">
                {[0, 1, 2, 3].map((index) => (
                    <Col xs={3} key={index}>
                        <Row>
                            <div className={`embed-responsive embed-responsive-4by3 m-2`} id={`simpalao_${index}`}>
                                <video
                                    id={`stream_${index}`}
                                    className="embed-responsive-item"
                                    style={{ backgroundColor: 'black', height: '150px' }} // Set a fixed height here
                                    playsInline
                                    autoPlay
                                >
                                    Your browser does not support video
                                </video>
                            </div>
                        </Row>
                        <Row>
                            <Col md={2} className="text-left">
                                <Button
                                    type="button"
                                    id={`btn_cam_${index * 2}`}
                                    onClick={(e) => OnVideoPlay(e)}
                                    data-idstream={index}
                                    className="btn btn-success btn-sm mr-1"
                                >
                                   Play
                                </Button>
                                <Button
                                    type="button"
                                    style={{ display: 'none' }}
                                    id={`btn_cam_${(index * 2) + 1}`}
                                    onClick={(e) => OnVideoPause(e)}
                                    data-idstream={index}
                                    className="btn btn-danger btn-sm mr-1"
                                >
                                    Stop
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                ))}
            </Row>
        </Col>
    );

}

