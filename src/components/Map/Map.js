import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GoogleApiWrapper, Map as GoogleMap, Marker} from "google-maps-react";

import * as routeTypes from '../../store/router/routeTypes';

class Map extends Component {

    static propTypes = {
        location: PropTypes.object.isRequired,
        onClick: PropTypes.func
    };

    state = {
        mapReady: false,
        content: null
    };

    mapReady = () => {
        this.setState({mapReady: true});
    };

    handleMapClick = (mapProps, map, clickEvent) => {
        if (this.props.page === routeTypes.REPORT) {
            this.setState({
                content: <Marker
                    name="Ubicación"
                    position={{lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng()}}
                    icon={{
                        url: "/categories/0.png"
                    }}/>
            });
        }
    };

    render() {
        return (
            <GoogleMap google={this.props.google}
                       zoom={14}
                       onReady={this.mapReady}
                       disableDefaultUI={true}
                       onClick={this.handleMapClick}
                       initialCenter={this.props.location}>
                {this.state.content}
            </GoogleMap>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCg20KeKqDDdwJZr0ij_TIpdIqgveEdqOE',
    language: 'es'
})(Map);