// Ecomap.jsx
import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapContext } from '../MultiComponents/EcoMap';
import { map } from 'jquery';
import MissionMarker from '../Markers/MissionMarkers'

mapboxgl.accessToken = 'pk.eyJ1IjoiZWNvZHJvbmUiLCJhIjoiY2xnZjYzZzRxMDFjMzNkbW43Z3BsbW1yNSJ9.S2dYTcn4i6myxzNVxWmxgQ';

const MapboxMap = ({ stateapp }) => {

    const { handleAddMarker, mapmarkers, clearMap } = useContext(MapContext);

    const mapContainer = useRef(null);

    const map = useRef(null)

    const [lng, setLng] = useState(10.369610831036084);
    const [lat, setLat] = useState(42.937242433545975);
    const [zoom, setZoom] = useState(9);
   

    var mapStyle = 'mapbox://styles/mapbox/streets-v12';



    const funcOnMove = () => {

        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));

    }

    const funcOnClick = useCallback((e) => {

        if (stateapp === 'WPY') {

            if (e.originalEvent.target.closest('.mapboxgl-marker')) {
                return;
            }

            const features = map.current.queryRenderedFeatures(e.point);
            const waterFeatures = features.filter(feature => feature.layer.id === 'water');

            if (waterFeatures.length == 0) {
                return;
            }


            const { lngLat } = e;

            if (features.length > 0) {
                const clickedFeature = features[0];
                const featureType = clickedFeature.layer.type;

                if (featureType === 'line') {
                    const lineProperties = clickedFeature.properties;

                    if (lineProperties.id !== 'circleline') {
                        handleAddMarker(lngLat, true, lineProperties.id);
                    }
                } else {
                    handleAddMarker(lngLat);
                }
            }
        }
    }, [stateapp, handleAddMarker, map]);




    useEffect(() => {

        if (!map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: mapStyle,
                center: [10.369610831036084, 42.937242433545975],
                zoom: 9,
            });

            map.current.on('move', funcOnMove);
        }

        if (stateapp === 'WPY') {
            
            map.current.on('click', funcOnClick);
        } else {
            map.current.off('click', funcOnClick);
        }

        return () => {
            map.current.off('click', funcOnClick);
        };

    }, [stateapp, handleAddMarker, funcOnClick, mapStyle, clearMap]);

    return (
        <div>
            <div className="sidebar">
                create new component for this Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>

            <div ref={mapContainer} className="map-container" style={{ minHeight: '1000px' }} />
            {stateapp == 'WPY' && <MissionMarker map={map.current} stateapp={stateapp} />}
        </div>
    );

};

MapboxMap.propTypes = {
    stateapp: PropTypes.string.isRequired
}
/*MarkerList.propTypes = {
    markers: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    onSingleChange: PropTypes.func.isRequired
};*/

export default MapboxMap;
