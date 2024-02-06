import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Col, Form, Button, Row } from 'react-bootstrap';
import { MapContext } from '../components/MultiComponents/EcoMap';

export function ChangeAppState({ changeState }) {


    const [selectedOption, setSelectedOption] = useState('');
   


    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => { console.log('Selected option:', selectedOption) }, [selectedOption]);

    const handleSubmit = () => {

        /*if (selectedOption != "WPY") {
            ResetMarkers()
        }*/
        changeState(selectedOption);
    };

    return (
        <Col xs={2}>
            <Row>
                <Col xs={10}>
                    <Form.Select value={selectedOption} onChange={handleSelectChange}>
                        <option value="STD">Standard Mode</option>
                        <option value="MEM">Memory Mode</option>
                        <option value="WPY">WayPoint Mode</option>
                        <option value="VID">Video</option>
                        <option value="MAP">MapMode</option>
                    </Form.Select>
                </Col>
                <Col xs={2}>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Col>
            </Row>
        </Col>
    );
}

ChangeAppState.propTypes = {
    changeState: PropTypes.func.isRequired,
};