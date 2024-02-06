import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
/*import MapboxMap from '../MapBox/Mapbox'
import MissionForm from '../Form/MissionFormHeader';
import MarkerList from '../Markers/MarkersList';*/
import { WebSocketContext } from '../../context/Websockets';
import { CMD_RW } from '../../config/BaseConfig';


const MapContext = React.createContext();
const MapContextConsumer = MapContext.Consumer;



export const EcoMap = ({ children, appst }) => {

    const [mapmarkers, setMapMarkers] = useState({
        type: 'FeatureCollection',
        features: []
    });

    const missionlist = useRef(null);
    const { skMessage, sendMessage } = useContext(WebSocketContext);


    const [headerData, setHeaderData] = useState(
    {
        IdMission: 'NNN',
        MissionNumber: 0,
        TotalWayPoint: 0,
        WpStart: 0,
        Cycles: 0,
        WpEnd: 0,
        NMmode: -1,
        NMnum: -1,
        NMstart: 0,
        IdMissionNext: 'NNN',
        StandRadius: 0.00002,
    });

    const createNewFeature = (coordinates = [], title = -1 , description = '', inavmode = 0, ipointtype = 0, imoni = 0, iamode = 0, iwrad = 0 ) => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: coordinates,
            },
            properties: {
                id: title,
                description: description
            },
            extra:
            {
                navmode: inavmode,
                pointype: ipointtype,
                mon: imoni,
                amode: iamode,
                wrad: iwrad,
            },
            header: {
                startWaypoint: false,
                endwaypoint: false,
            }
        };
    };

    const ResetMarkers = () => {

        

        setMapMarkers({
            type: 'FeatureCollection',
            features: []
        });

        //setClearMap(false)
    }



    const handleAddMarker = (latLng, eventline = false, id = -1) => {

        var lngLat = [latLng.lng, latLng.lat];

        var counter = mapmarkers.features.length;

        const featureInstance = createNewFeature(lngLat, counter.toString(), "world");

        setMapMarkers(prevState => {
            const newFeatures = [...prevState.features];

            if (eventline) {
                newFeatures.splice(id + 1, 0, featureInstance);
            } else {
                newFeatures.push(featureInstance);
            }

            newFeatures.forEach((el, indx) => {
                el.properties.id = indx.toString();
            })

            return { ...prevState, features: newFeatures };
        });

        if (headerData.WpStart <= id && id <= headerData.WpEnd) {

            var newEnd = parseInt(headerData.WpEnd) + 1;

            setHeaderData({ ...headerData, WpEnd: newEnd.toString() });

        }

    };

    const handleSubmitFormPoints = (formdata) => {

        missionlist.current = formdata;

        var standard_rad = 0.000002

        missionlist.current.forEach((way) => {
            if (way.wrad == 0) {
                way.wrad = standard_rad.toString();
            }
        })


    }

    const handleChangeInHeader = (allformdata) => {

        mapmarkers.features.forEach((mm) => {
            mm.header.startWaypoint = false;
            mm.header.endwaypoint = false;
        })

        const indexs = mapmarkers.features.findIndex(marker => marker.properties.id === allformdata.WpStart);
        if (indexs != -1) {
            mapmarkers.features[indexs].header.startWaypoint = true;
        }

        const indexe = mapmarkers.features.findIndex(marker => marker.properties.id === allformdata.WpEnd);
        if (indexe != -1) {
            mapmarkers.features[indexe].header.endwaypoint = true;
        }

        setMapMarkers({
            type: 'FeatureCollection',
            features: [...mapmarkers.features]
        });

        setHeaderData(allformdata);
    }


    const handleSubmitHeaderMission = (fdata) => {

        const obj = {
            missionparam: fdata,
            pointslist: missionlist.current
        }

        const jsonString = JSON.stringify(obj);
        const encoder = new TextEncoder();
        const bytes_payload = encoder.encode(jsonString);

        const bytes_command = new Uint8Array([CMD_RW.ID_WEBAPP, CMD_RW.ID_MODULO_BASE, CMD_RW.ID_MODULO_BASE, CMD_RW.REQUEST_CMD1, CMD_RW.SAVE_MISSION_CMD2, CMD_RW.SAVE_MISSION_PARAM_CMD3]);

        const tByteMessage = new Uint8Array(bytes_command.length + bytes_payload.length);
        tByteMessage.set(bytes_command, 0);
        tByteMessage.set(bytes_payload, bytes_command.length);

        sendMessage(tByteMessage);

        
    }


    const handleRemoveMarker = (oldMarkerid) => {

        if (headerData.WpStart <= oldMarkerid && oldMarkerid <= headerData.WpEnd) {

            var newEnd = parseInt(headerData.WpEnd) - 1;

            setHeaderData({ ...headerData, WpEnd: newEnd.toString() });

        }

        setMapMarkers(prevState => {

            const newFeatures = [...mapmarkers.features.filter(marker => marker.properties.id !== oldMarkerid)];

            newFeatures.forEach((el, indx) => {
                el.properties.id = indx.toString();
            })

            return { ...prevState, features: newFeatures };
        });


    };


    const handlePositionChangeMarker = (oldMarkerid, eventcoordinates) => {
        const index = mapmarkers.features.findIndex(marker => marker.properties.id === oldMarkerid);

        if (index !== -1) {
            const lng = parseFloat(eventcoordinates.lng);
            const lat = parseFloat(eventcoordinates.lat);

            setMapMarkers(prevState => {
                const newFeatures = [...prevState.features];
                newFeatures[index] = {
                    ...newFeatures[index],
                    geometry: {
                        ...newFeatures[index].geometry,
                        coordinates: [lng, lat]
                    }
                };
                return {
                    ...prevState,
                    features: newFeatures
                };
            });
        } else {
            console.log("Marker not found in mapmarkers");
        }
    };

    const handleSinglePointSingleValueChange = (idmarker, typeevent, dataevent) => {

        const index = mapmarkers.features.findIndex(marker => marker.properties.id == idmarker);

        if (index !== -1) {

            switch (typeevent) {
                case "lng":
                case "lat":
                    var lng = parseFloat(dataevent[0]);
                    var lat = parseFloat(dataevent[1]);
                    mapmarkers.features[index].geometry.coordinates = [lng, lat];
                    break;
                case "wrad":
                    mapmarkers.features[index].extra[typeevent] = parseFloat(dataevent[0]);
                    break;
                default:
                    mapmarkers.features[index].extra[typeevent] = parseInt(dataevent[0]);
                    break;
            }

            setMapMarkers({
                type: 'FeatureCollection',
                features: [...mapmarkers.features]
            });

        } else {
            console.log("Marker not found in mapmarkers");
        }

    };


    useEffect(() => {
        console.log("effect ECOMAP", mapmarkers);

        setHeaderData(prevHead => {
            const newHeader = { ...prevHead, TotalWayPoint: mapmarkers.features.length };
            return newHeader;
        });

    }, [mapmarkers]); 

    return (
        <MapContext.Provider value={{
            handleSinglePointSingleValueChange, handlePositionChangeMarker, handleRemoveMarker, handleSubmitHeaderMission, handleSubmitFormPoints,
            handleAddMarker, mapmarkers, handleChangeInHeader, headerData, ResetMarkers
        }}>
            {children}
        </MapContext.Provider>
    );
}


EcoMap.propTypes = {
    children: PropTypes.node,
    appst: PropTypes.string,
};

export { MapContext, MapContextConsumer };
