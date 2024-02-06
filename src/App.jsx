import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import { WebSocketMonitoring } from './components/WebSocketMonitoring';
import { WebSocketProvider } from '../src/context/Websockets';
import { Row, Col, Container } from 'react-bootstrap';
import { ImuDataMessage } from './components/ImuDataMessage';
import { Missions } from './components/Missions/Missions';
import { LoginForm } from './components/Login/LoginForm'
import { EcoMap } from './components/MultiComponents/EcoMap';
import { ChangeAppState } from './components/StateMonitoring';
import MapboxMap from './components/MapBox/Mapbox';
import MissionForm from './components/Form/MissionFormHeader';
import MarkerList from './components/Markers/MarkersList';
import { ClientWebRtcComponent } from './components/WebRtc/ClientWebRtcComponent';


//Define state cannot be done so here is my list
// STD (STANDARD MDOE) -> display blocks for data continously
// MEM (MEMORY MODE) -> ACCESS FLASH MEMORY
// WPY (WAYPOINT) -> CREATE WAYPOINT MODE
// MAP (MAPMODE) -> BOH
// VID

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tocktock: "NNN",
            mapMode: "NNN",
            appst: "STD",
        };
    }

    handleLoginSuccess = (ticktock) => {
        // Perform actions after successful login
        this.setState({ tocktock: ticktock });
    };

    render() {
        const { tocktock, appst } = this.state;

        const setAppState = (newState) => {
            this.setState({ appst: newState }, () => {
                console.log("main: " + this.state.appst);
            });
        };


        return (
            <Container fluid>
                {/* {tocktock == "NNN" ? (
                    // Render login form if not logged in
                    <LoginForm onLoginSuccess={this.handleLoginSuccess} />
                ) : ( */}
                    // Render components after successful login
                    <div>
                        <WebSocketProvider tockid={tocktock} >
                            <EcoMap stateapp={appst}>
                                <Row>
                                    <Col xs={1}></Col>
                                    <WebSocketMonitoring />
                                    <ChangeAppState changeState={setAppState} />
                                    <Col xs={1}></Col>
                                </Row>
                                <Row>
                                    {this.state.appst === "WPY" ? (
                                        <>
                                            <Col>
                                                <MissionForm stateapp={appst} />
                                            </Col>
                                        </>
                                    ): (null)}
                                </Row>
                                <Row>
                                    <Col  xs={8}>
                                        <MapboxMap stateapp={appst} />
                                    </Col>
                                    {this.state.appst === "STD" ? (<ImuDataMessage />) : (null)}
                                    {this.state.appst === "MEM" ? (<Missions stateapp={appst} />) : (null)}
                                    {this.state.appst === "WPY" ? (
                                        <>
                                            <Col xs={4}>
                                                <MarkerList />
                                            </Col>
                                        </>
                                    ) : (null)}
                                </Row>
                                <Row>
                                    {this.state.appst === "VID" ? (<ClientWebRtcComponent />) : (null)}
                                </Row>
                            </EcoMap>
                        </WebSocketProvider>
                    </div>
                {/* )} */}
            </Container>
        );
    }
}
