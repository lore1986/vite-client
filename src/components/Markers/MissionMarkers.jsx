// EcoMap.jsx
import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapContext } from '../MultiComponents/EcoMap';


const MissionMarker = ({ map, stateapp }) => {

    const { mapmarkers, handleRemoveMarker, handlePositionChangeMarker } = useContext(MapContext);

  
    const temp_points = useRef([]);
    var startIndex = useRef(0);
    var endIndex = useRef(0);


    const removeLineFromMap = (_mapp, layerId, sourceId) => {
        if (_mapp.getLayer(layerId)) {
            _mapp.removeLayer(layerId);
        }
        if (_mapp.getSource(sourceId)) {
            _mapp.removeSource(sourceId);
        }
    };

    const clearMapp = useCallback(() => {

        if (mapmarkers.features.length > 0) {

            mapmarkers.features.forEach((el, i) => {

                removeLineFromMap(map, `markerbase-${i.toString()}`, `markerbase-${i.toString()}`);
                removeLineFromMap(map, `circle-${i.toString()}`, `circle-${i.toString()}`);
                removeLineFromMap(map, 'circleline', 'circleline');

                const sourceId = `line-source-${i}`;
                const layerId = `line-layer-${i}`;
                removeLineFromMap(map, layerId, sourceId);

                //el.remove();
            });

        }

        if (temp_points.current.length > 0) {

            temp_points.current.forEach((el) => {
                el.remove();
            });

        }

        temp_points.current = [];

    }, [map, mapmarkers.features]);


    useEffect(() => {

        clearMapp();

        mapmarkers.features.forEach(function (marker, i) {

            var el = document.createElement('div');
            el.className = 'marker';
            el.innerHTML = '<span><b>' + (i) + '</b></span>';

            const mark_new = new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(map)
                .setDraggable(true)
                .setPopup(
                    new mapboxgl.Popup()
                        .setHTML(`
                    <h3>Hello, Marker ${marker.properties.id.toString()} and ${marker.properties.description} +}</h3>
                    <button id="removeMarkerBtn-${marker.properties.id.toString()}">X</button>
                `)
                );

            mark_new.getPopup().on('open', () => {
                const customId = `removeMarkerBtn-${marker.properties.id.toString()}`;

                document.getElementById(customId).addEventListener('click', () => {
                    mark_new.getPopup().remove();
                    mark_new.remove();

                    handleRemoveMarker(marker.properties.id.toString());                    
                });
            });

            mark_new.on('dragend', (e) => {
                handlePositionChangeMarker(marker.properties.id.toString(), e.target.getLngLat());
            });


            map.addLayer({
                id: `markerbase-${marker.properties.id.toString()}`,
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: marker.geometry.coordinates,
                        },
                    },
                },
                paint: {
                    'circle-radius': 14,
                    'circle-color': '#F0E100',
                    'circle-opacity': 1,
                },
            });


            let rad = parseFloat(marker.extra.wrad);
            const valueScale = 10000;
            const scaledValue = rad * valueScale;

            const zoom = map.getZoom();
            const zoomScale = 0.01;
            const scaledZoom = Math.pow(2, zoom) * zoomScale;

            rad = scaledValue * scaledZoom;

            map.addLayer({
                id: `circle-${marker.properties.id.toString()}`,
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: marker.geometry.coordinates,
                        },
                    },
                },
                paint: {
                    'circle-radius': rad,
                    'circle-color': '#731963',
                    'circle-opacity': 1,
                },
            });

            temp_points.current.push(mark_new);
        });

        if (temp_points.current.length > 1) {
            const lineCoordinates = [];

            for (let i = 0; i < mapmarkers.features.length - 1; i++) {
                const index_plus_minus = (i + 1) % mapmarkers.features.length;

                const arr1 = [mapmarkers.features[i].geometry.coordinates[0], mapmarkers.features[i].geometry.coordinates[1]];
                const arrPlus1 = [mapmarkers.features[index_plus_minus].geometry.coordinates[0], mapmarkers.features[index_plus_minus].geometry.coordinates[1]];

                const obj_line = {
                    coords: [arr1, arrPlus1],
                    id: i,
                };

                lineCoordinates.push(obj_line);
            }

            for (let i = 0; i <= mapmarkers.features.length - 1; i++) {
                if (mapmarkers.features[i].header.startWaypoint) {
                    startIndex.current = i;
                }
                if (mapmarkers.features[i].header.endwaypoint) {
                    endIndex.current = i;
                }
            }

            var valid_points = [];

            if (startIndex.current !== 0 || endIndex.current !== 0) {

                for (let i = startIndex.current; i <= endIndex.current; i++) {
                    valid_points.push(i);
                }

                if (valid_points.length > 0) {
                    const coord_start = mapmarkers.features[valid_points[0]].geometry.coordinates;
                    const coord_end = mapmarkers.features[valid_points[valid_points.length - 1]].geometry.coordinates;

                    const obj_line = {
                        coords: [coord_start, coord_end],
                        id: 'circleline',
                    };

                    const ind = lineCoordinates.findIndex((x) => x.id === valid_points[0]);

                    if (ind !== -1) {
                        lineCoordinates.push(obj_line);
                    }
                }

                mapmarkers.features.forEach((mm) => {
                    var color = '#F0E100';
                    var id = parseInt(mm.properties.id);

                    if (valid_points.includes(id)) {

                        removeLineFromMap(map, `markerbase-${id.toString()}`, `markerbase-${id.toString()}`);
                        color = '#000FFF';

                        map.addLayer({
                            id: `markerbase-${id.toString()}`,
                            type: 'circle',
                            source: {
                                type: 'geojson',
                                data: {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: mm.geometry.coordinates,
                                    },
                                },
                            },
                            paint: {
                                'circle-radius': 14,
                                'circle-color': color,
                                'circle-opacity': 1,
                            },
                        });
                    }
                });
            }


            const last_p = valid_points.pop();

            lineCoordinates.forEach((line, k) => {
                const sourceId = `line-source-${k}`;
                const layerId = `line-layer-${k}`;


                map.addSource(sourceId, {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {
                                    id: line.id,
                                },
                                geometry: {
                                    type: 'LineString',
                                    coordinates: line.coords,
                                },
                            },
                        ],
                    },
                });

                var color_line_circle = '#888';

                if (valid_points.includes(parseInt(line.id)) || line.id === 'circleline') {
                    color_line_circle = '#c4c4fc';
                }

                map.addLayer({
                    id: layerId,
                    type: 'line',
                    source: sourceId,
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': color_line_circle,
                        'line-width': 8,
                    },
                });
            });
        }

        return () => {
            
        };

    }, [mapmarkers, map, handleRemoveMarker, handlePositionChangeMarker, clearMapp]);


};


MissionMarker.propTypes = {
    stateapp: PropTypes.string.isRequired,
    map: PropTypes.instanceOf(mapboxgl.Map),
}

/*MarkerList.propTypes = {
    markers: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    onSingleChange: PropTypes.func.isRequired
};*/

export default MissionMarker;
