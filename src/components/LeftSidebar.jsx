import React from 'react';
import { useDispatch } from 'react-redux';
import { updateMapStyle } from '../redux/actions/mapActions';


const LeftSideBar = () => {

    const dispatch = useDispatch();

    const handleMapStyleChange = (style) => {
        dispatch(updateMapStyle(style));
    };


    return (
        <div id="left-sidebar" className="sidebar-content rounded-rect">
            <div className="filterNav">
                <div id="left-sidebarheader" className="rounded">
                    <img src="/ecodrone_logo.png" className="img-fluid"  alt="ECODRONE" />
                </div>
                
                <ul id="map-menu" className="list-group">
                    <li className="list-group-item">
                        <button
                            type="button"
                            id="satellite-streets-v12"
                            className="btn btn-primary"
                            onClick={() => handleMapStyleChange('mapbox://styles/mapbox/satellite-streets-v12')}
                        />
                        <span>satellite</span>
                    </li>
                    <li className="list-group-item">
                        <button
                            type="button"
                            id="light-v11"
                            className="btn btn-primary"
                            onClick={() => handleMapStyleChange('mapbox://styles/mapbox/light-v11')}
                        />
                        <span>light</span>
                    </li>
                    <li className="list-group-item">
                        <button
                            type="button"
                            id="dark-v11"
                            className="btn btn-primary"
                            onClick={() => handleMapStyleChange('mapbox://styles/mapbox/dark-v11')}
                        />
                        <span>dark</span>
                    </li>
                    <li className="list-group-item">
                        <button
                            type="button"
                            id="streets-v12"
                            className="btn btn-primary"
                            onClick={() => handleMapStyleChange('mapbox://styles/mapbox/streets-v12')}
                        />
                        <span>streets</span>
                    </li>
                </ul>
                <div id="weather-menu" className="list-group">
                    <li className="list-group-item">
                        <input type="checkbox" className="btn-check" name="show-wind" id="show-wind" />
                        <label className="btn btn-light" htmlFor="show-wind"><i className="fa-solid fa-wind"></i></label> wind
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" className="btn-check" name="show-waves" id="show-waves" />
                        <label className="btn btn-light" htmlFor="show-waves"><i className="fa-solid fa-water"></i></label> waves
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" className="btn-check" name="show-temperature" id="show-temperature" />
                        <label className="btn btn-light" htmlFor="show-temperature"><i className="fa-solid fa-temperature-three-quarters"></i></label> temp
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" className="btn-check" name="show-clouds" id="show-clouds" />
                        <label className="btn btn-light" htmlFor="show-clouds"><i className="fa-solid fa-cloud"></i></label> clouds
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" className="btn-check" name="show-precipitations" id="show-precipitations" />
                        <label className="btn btn-light" htmlFor="show-precipitations"><i className="fa-solid fa-cloud-rain"></i></label> rain
                    </li>
                </div>
                <div id="drone-menu" className="list-group">
                    <span style={{ color: 'white', textAlign: 'center' }}>drones</span>
                    <li className="list-group-item">
                        <input type="checkbox" className="btn-check" name="show-reachable" id="show-reachable" />
                        <label className="btn btn-light" htmlFor="show-reachable" data-bs-toggle="tooltip" data-bs-title="online" data-bs-placement="right"><i className="fa-solid fa-sailboat"></i></label> online
                    </li>
                    <li className="list-group-item">
                        <input type="checkbox" className="btn-check" name="show-unreachable" id="show-unreachable" />
                        <label className="btn btn-light" htmlFor="show-unreachable" data-bs-toggle="tooltip" data-bs-title="offline" data-bs-placement="right"><i className="fa-solid fa-sailboat fa-flip-vertical"></i></label> offline
                    </li>
                </div>
            </div>
        </div>
    );
}

export default LeftSideBar;