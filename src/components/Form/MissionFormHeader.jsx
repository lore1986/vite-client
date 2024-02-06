import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { MapContext } from '../MultiComponents/EcoMap';



const MissionForm = () => {

    const { handleSubmitHeaderMission, handleChangeInHeader, headerData } = useContext(MapContext);
  
  

    const [formData, setFormData] = useState(headerData);

    const handleChange = (e) => {

        const { name, value } = e.target;

        const allFormData = Object.fromEntries(new FormData(e.target.form).entries());
        allFormData[name] = value;
        
        handleChangeInHeader(allFormData)
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();

        handleSubmitHeaderMission(formData)
    
    };

    useEffect(() => { 

        setFormData(headerData);

    }, [headerData/*mapmarkers.features.length*/])

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col xs={3}>
                    <Form.Group  controlId="formIdMission">
                        <Form.Label>IdMission:</Form.Label>
                        <Form.Control
                            type="text"
                            name="IdMission"
                            value={formData.IdMission}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group  controlId="formMissionNumber">
                        <Form.Label>MissionNumber:</Form.Label>
                        <Form.Control
                            type="number"
                            name="MissionNumber"
                            value={formData.MissionNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group  controlId="formTotalWayPoint">
                        <Form.Label>TotalWayPoint:</Form.Label>
                        <Form.Control
                            type="number"
                            name="TotalWayPoint"
                            value={formData.TotalWayPoint}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group  controlId="formWpStart">
                        <Form.Label>WpStart:</Form.Label>
                        <Form.Control
                            type="number"
                            name="WpStart"
                            value={formData.WpStart}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group  controlId="formCycles">
                        <Form.Label>Cycles:</Form.Label>
                        <Form.Control
                            type="number"
                            name="Cycles"
                            value={formData.Cycles}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group  controlId="formWpEnd">
                        <Form.Label>WpEnd:</Form.Label>
                        <Form.Control
                            type="number"
                            name="WpEnd"
                            value={formData.WpEnd}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group  controlId="formNMmode">
                        <Form.Label>NMmode:</Form.Label>
                        <Form.Control
                            type="number"
                            name="NMmode"
                            value={formData.NMmode}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group  controlId="formNMnum">
                        <Form.Label>NMnum:</Form.Label>
                        <Form.Control
                            type="number"
                            name="NMnum"
                            value={formData.NMnum}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group  controlId="formNMstart">
                        <Form.Label>NMstart:</Form.Label>
                        <Form.Control
                            type="number"
                            name="NMstart"
                            value={formData.NMstart}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                <Form.Group  controlId="formIdMissionNext">
                    <Form.Label>IdMissionNext:</Form.Label>
                    <Form.Control
                        type="text"
                        name="IdMissionNext"
                        value={formData.IdMissionNext}
                        onChange={handleChange}
                    />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group  controlId="formStandRadius">
                    <Form.Label>StandRadius:</Form.Label>
                    <Form.Control
                        type="number"
                        name="StandRadius"
                        value={formData.StandRadius}
                        onChange={handleChange}
                    />
                </Form.Group>
                </Col>
            </Row>

            <Button variant="primary" id="sub-form" type="submit">
                Submit
            </Button>
        </Form>

    );
};


export default MissionForm;
