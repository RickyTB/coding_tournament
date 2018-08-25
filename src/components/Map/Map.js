import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GoogleApiWrapper, Map as GoogleMap} from "google-maps-react";

class Map extends Component {

    static propTypes = {
        location: PropTypes.object.isRequired
    };

    state = {
        mapReady: false
    };

    mapReady = () => {
        this.setState({mapReady: true});
    };

    render() {
        return (
            <GoogleMap google={this.props.google}
                       zoom={14}
                       onReady={this.mapReady}
                       disableDefaultUI={true}
                       initialCenter={this.props.location}>
                {this.props.children}
            </GoogleMap>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCg20KeKqDDdwJZr0ij_TIpdIqgveEdqOE',
    language: 'es'
})(Map);