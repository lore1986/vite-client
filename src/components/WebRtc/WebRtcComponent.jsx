import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import { io } from 'socket.io-client'

//import protobuf from '//cdn.jsdelivr.net/npm/protobufjs@7.X.X/dist/protobuf.min.js';
//import './YourComponentStyles.css'; // You need to create this CSS file

export const WebRtcComponent = () => {

    /*const express = require('express')
    const tls = require('tls');
    const fs = require('fs');
    const { v4: uuidv4 } = require('uuid');
    //const { Server } = require("socket.io");
    const https = require('http');
    var protobuf = require("protobufjs");



    const server = https.createServer(
        {
            // key: fs.readFileSync("/etc/letsencrypt/live/lorenzogaspari.com/privkey.pem"),
            // cert: fs.readFileSync("/etc/letsencrypt/live/lorenzogaspari.com/fullchain.pem"),
            key: fs.readFileSync('/home/ecodrone/Documents/cert/localcert.key'),
            cert: fs.readFileSync('/home/ecodrone/Documents/cert/localcert.pem'),
            ca: fs.readFileSync('/home/ecodrone/Documents/cert/localcert.pem')
        }, express);

    const io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            //allowedHeaders: ["Origin, X-Requested-With, Content-Type, Accept"],
            //credentials: true
        }
    });

    const server_lidar = https.createServer(
        {
            // key: fs.readFileSync("/etc/letsencrypt/live/lorenzogaspari.com/privkey.pem"),
            // cert: fs.readFileSync("/etc/letsencrypt/live/lorenzogaspari.com/fullchain.pem"),
            key: fs.readFileSync('/home/ecodrone/Documents/cert/localcert.key'),
            cert: fs.readFileSync('/home/ecodrone/Documents/cert/localcert.pem'),
            ca: fs.readFileSync('/home/ecodrone/Documents/cert/localcert.pem')
        }, express);

    const io_lidar = require('socket.io')(server_lidar, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        }
    });

    io_lidar.on('connection', (socket) => {

        var id = socket.handshake.query.uuid;

        var client = new ClientVisione();
        var foundclient = false;

        _clients.forEach(c => {
            if (c.id == id) {
                client = c;
                foundclient = true;
            }
        });

        socket.on('identify', (msg) => {
            console.log(msg);
        })

    })



    const app = express()
    const port = 3333


    app.use(express.json());
    app.use(express.static('public'))

    function ClientVisione() {
        this.id = uuidv4();
        this.socket;

        this.userfrag = "";

        this.socketio;
        this.socketioid;
    }

    function ServerVisione(id = 'server', socket) {
        this.id = id;
        this.socket = socket;
    }

    var _clients = [];
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const options = {
        key: fs.readFileSync('/home/ecodrone/Documents/cert/localcert.key'),
        cert: fs.readFileSync('/home/ecodrone/Documents/cert/localcert.pem'),
        ca: fs.readFileSync('/home/ecodrone/Documents/cert/localcert.pem')
    };


    const serverConn = tls.createServer(options, (socket) => {

        socket.on("secureConnect", (listener) => {

        })

        socket.on('data', (data) => {

            //console.log(data.toString())
            const jsonString = String.fromCharCode.apply(null, data);
            const parts = extractJSONObjects(jsonString);

            if (parts != null && parts.length > 1) {
                parts.forEach(element => {

                    const obj = JSON.parse(element);
                    var client_visione;

                    _clients.forEach(c => {
                        if (c.id == obj.uuid) {
                            client_visione = c;
                        }
                    });


                    if (client_visione) {
                        setTimeout(function () {

                            MessageManager(JSON.parse(element), socket);

                        }, 100);
                    }
                });

            } else {
                let parsedData = JSON.parse(data);
                MessageManager(parsedData, socket);
            }
        });

        socket.on('close', (data) => {
            // Process the received data
            //console.log("server is closed" + data.toString())
        });

    }).listen(8000);


    function extractJSONObjects(input) {
        const objects = [];
        let startIndex = 0;
        const stack = [];

        for (let i = 0; i < input.length; i++) {
            if (input[i] === '{') {
                if (stack.length === 0) {
                    startIndex = i;
                }
                stack.push(input[i]);
            } else if (input[i] === '}') {
                if (stack.length === 1) {
                    const object = input.substring(startIndex, i + 1);
                    objects.push(object);
                }
                stack.pop();
            }
        }

        return objects;
    }

    function FindClient(id) {
        var client_visione;

        _clients.forEach(c => {
            if (c.id == id) {
                client_visione = c;
            }
        });

        return client_visione
    }

    function MessageManager(msg, socket) {
        var scope_msg = msg['scope']

        console.log(JSON.stringify(msg));

        switch (scope_msg) {
            case 'P':
                MessageProtocol(msg)
                break;
            case 'U':
                MessageIsServerVisione(socket)
                break;
            case 'A':
                AudioMessage(msg)
                break;
            case 'T':
                ThetaMessage(msg)
                break;
            default:
                //console.log(msg.toString())
                break;
        }

    }


    function ThetaMessage(msg) {
        const mgs_data = {
            scope: "T",
            type: msg["type"],
            uuid: msg["uuid"],
            direction: msg["direction"],
            data: msg["data"],
            identity: msg["identity"].toString()
        };

        if (msg["direction"] == "server") {
            serverVisione.socket.write(JSON.stringify(mgs_data));

        } else {
            var client_to_send = FindClient(msg["direction"])
            var msg_ok = JSON.stringify(mgs_data)

            if (client_to_send) {
                io.to(client_to_send.socketioid).emit("message", msg_ok);
            }
        }

    }


    function AudioMessage(full_parsed_msg) {
        const mgs_data = {
            scope: "A",
            type: full_parsed_msg["type"],
            uuid: full_parsed_msg["uuid"],
            direction: full_parsed_msg["direction"],
            data: full_parsed_msg["data"],
            identity: full_parsed_msg["identity"].toString()
        };

        if (full_parsed_msg["direction"] == "server") {
            serverVisione.socket.write(JSON.stringify(mgs_data));

        } else {
            var client_to_send = FindClient(full_parsed_msg["direction"])
            var msg_ok = JSON.stringify(mgs_data)

            if (client_to_send) {
                io.to(client_to_send.socketioid).emit("message", msg_ok);
            }
        }
    }

    function MessageIsServerVisione(socket) {
        serverVisione = new ServerVisione('server', socket);
    }

    function MessageProtocol(full_parsed_msg) {
        const mgs_data = {
            scope: "P",
            type: full_parsed_msg["type"],
            uuid: full_parsed_msg["uuid"],
            direction: full_parsed_msg["direction"],
            data: full_parsed_msg["data"],
            identity: full_parsed_msg["identity"].toString()
        };

        if (full_parsed_msg["direction"] == "server") {
            serverVisione.socket.write(JSON.stringify(mgs_data));
        } else {
            var client_to_send = FindClient(full_parsed_msg["direction"])
            var msg_ok = JSON.stringify(mgs_data)

            if (client_to_send) {
                io.to(client_to_send.socketioid).emit("message", msg_ok);
            }
        }


    }

    app.get('/', (req, res, next) => {

        //res.setHeader('Content-Type', 'application/javascript');

        res.sendFile(__dirname + "/index.html");

    })


    io.on('connection', (socket) => {

        var id = socket.handshake.query.uuid;

        var client = new ClientVisione();
        var foundclient = false;

        _clients.forEach(c => {
            if (c.id == id) {
                client = c;
                foundclient = true;
            }
        });

        if (!foundclient) {
            client.id = id;
            client.socketioid = socket.id;
            _clients.push(client);
        }



        //initialization message ok
        socket.on('identify', () => {
            var id_loc = socket.handshake.query.uuid;

            var msg_data = {
                scope: "U",
                type: "1",
                uuid: id_loc,
                destination: 'server',
                identity: "0",
                data: 'identity',
            };

            serverVisione.socket.write(JSON.stringify(msg_data));

            msg_data['direction'] = id_loc
            msg_data['uuid'] = 'server'

            io.to(client.socketioid).emit("message", JSON.stringify(msg_data));
        })

        //call camera on
        socket.on('cameramsg', (idcam_mes) => {

            var id_loc = socket.handshake.query.uuid;

            var idcam = parseInt(idcam_mes.charAt(0));
            var typerequest = parseInt(idcam_mes.charAt(1));

            //console.log(idcam_mes.toString())

            var msg_data = {
                scope: "C",
                type: typerequest.toString(),
                uuid: id_loc,
                destination: 'server',
                identity: idcam.toString(),//parseInt(idcam_mes.toString()),
                data: 'identity',
            };

            //console.log(JSON.stringify(msg_data))
            serverVisione.socket.write(JSON.stringify(msg_data));

        });

        socket.on('audio_on', (msg) => {

            var id_loc = socket.handshake.query.uuid;
            const obj = JSON.parse(msg);

            var msg_data = {
                scope: "A",
                type: "1",
                uuid: id_loc,
                destination: 'server',
                identity: "6",
                data: "NNN",
            };

            serverVisione.socket.write(JSON.stringify(msg_data));

        });

        socket.on('audio_off', (msg) => {

            var id_loc = socket.handshake.query.uuid;
            const obj = JSON.parse(msg);

            var msg_data = {
                scope: "A",
                type: "0",
                uuid: id_loc,
                destination: 'server',
                identity: "6",
                data: "NNN",
            };

            serverVisione.socket.write(JSON.stringify(msg_data));

        });

        socket.on('theta', (msg) => {

            var id_loc = socket.handshake.query.uuid;
            const obj = JSON.parse(msg);

            var msg_data = {
                scope: "T",
                type: "1",
                uuid: id_loc,
                destination: 'server',
                identity: "4",
                data: "NNN",
            };

            serverVisione.socket.write(JSON.stringify(msg_data));

        });



        //session description protocol exchange
        socket.on('i_sdp', (msg) => {

            //console.log("From secondary socket " +  msg.toString())

            var id_loc = socket.handshake.query.uuid;
            const obj = JSON.parse(msg);

            var msg_data = {
                scope: "P",
                type: "0",
                uuid: id_loc,
                destination: 'server',
                identity: obj.identity.toString(),
                data: obj.data,
            };

            serverVisione.socket.write(JSON.stringify(msg_data));
        });

        //ice candidates exchange
        socket.on('i_ice', (msg) => {


            var id_loc = socket.handshake.query.uuid;
            const obj = JSON.parse(msg);

            var msg_data = {
                scope: "P",
                type: "1",
                uuid: id_loc,
                destination: 'server',
                identity: obj.identity.toString(),
                data: obj.data,
            };

            //console.log(JSON.stringify(msg_data))

            serverVisione.socket.write(JSON.stringify(msg_data));


        });

        socket.on('disconnect', function () {

            var id_loc = socket.handshake.query.uuid;

            var msg_data = {
                scope: "U",
                type: "0",
                uuid: id_loc,
                destination: 'server',
                identity: "0",
                data: 'identity',
            };

            serverVisione.socket.write(JSON.stringify(msg_data));

            _clients = _clients.filter(c => c.id !== id_loc);
            console.log(_clients);

        });

        //disconnect client
        socket.on('disconnect_me', () => {
            console.log('user disconnected');
            socket.disconnect();
        });

    });

    const lidar_connection = tls.createServer(options, (socket) => {

        socket.on("secureConnect", (listener) => {
        })


        socket.on('data', (data) => {
            protobuf.load("/home/ecodrone/Documents/proto_data/lidar_data.proto", function (err, root) {

                if (err) {
                    throw err;
                }


                // Obtain a message type
                var allLidarPoints = root.lookupType("lidar_data.AllLidarPoints");

                try {
                    //var buff = new Uint8Array(data); 
                    //var decodedMessage = allLidarPoints.decode(buff);

                    io_lidar.emit('message', data);

                } catch (e) {
                    if (e instanceof protobuf.util.ProtocolError) {


                        // e.instance holds the so far decoded message with missing required fields
                    } else {
                        // wire format is invalid
                    }
                }
            });
        });

        socket.on('close', (data) => {

        });


    }).listen(8001);


    app.listen(port, () => {
        //console.log(`Example app listening on port ${port}`)
    })

    server.listen(3230, () => {
        //console.log('listening on *:3230');
    });

    server_lidar.listen(3233, () => {
        console.log('listening on *:3233');
    });

*/
   

   

    return (
        <div>
           
        </div>
    );
}

