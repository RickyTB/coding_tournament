import React, {Component} from 'react';

import classes from './Home.scss';
import Map from "../../components/Map/Map";
import {Quito} from "../../utils/locations";

class Home extends Component {

    handleMapReady = () => {
        console.log('Map loaded');
    };

    render() {
        return (
            <div className={classes.Home}>
                <Map location={Quito} onMapReady={this.handleMapReady()}/>
            </div>
        );
    }
}

export default Home;