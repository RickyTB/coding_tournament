import React, {Component} from 'react';
import {connect} from "react-redux";

import classes from './Main.scss';
import Map from "../../components/Map/Map";
import {Quito} from "../../utils/locations";
import FAB from "../../components/UI/FAB/FAB";
import * as actions from '../../store/actions';
import * as routeTypes from '../../store/router/routeTypes';
import Switcher from "../../components/Navigation/Switcher/Switcher";

class Main extends Component {

    handleMapReady = () => {
        console.log('Map loaded');
    };

    handlePlusButton = () => {
        this.props.changePage(routeTypes.REPORT);
    };

    render() {
        return (
            <div className={classes.Main}>
                <Map location={Quito} onMapReady={this.handleMapReady}/>
                <FAB title="Reportar" onClick={this.handlePlusButton}>
                    <i className="fa fa-plus"/>
                </FAB>
                <Switcher/>
            </div>
        );
    }
}

export default connect(null, {changePage: actions.changePage})(Main);