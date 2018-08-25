import React, {Component} from 'react';
import {connect} from "react-redux";

import classes from './Main.scss';
import Map from "../../components/Map/Map";
import {Quito} from "../../utils/locations";
import FAB from "../../components/UI/FAB/FAB";
import * as actions from '../../store/actions';
import * as routeTypes from '../../store/router/routeTypes';
import Switcher from "../../components/Navigation/Switcher/Switcher";
import {getPage} from "../../store/selectors";

class Main extends Component {

    handleMapReady = () => {
        console.log('Map loaded');
    };

    handlePlusButton = () => {
        this.props.changePage(routeTypes.REPORT);
    };

    handleMessage = (state) => {
        this.setState({...state});
    };

    render() {
        return (
            <div className={classes.Main}>
                <Map location={Quito} onMapReady={this.handleMapReady} page={this.props.page}/>
                <FAB title="Reportar" onClick={this.handlePlusButton}>
                    <i className="fa fa-plus"/>
                </FAB>
                <Switcher mainListener={this.handleMessage}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        page: getPage(state)
    };
};
export default connect(mapStateToProps, {changePage: actions.changePage})(Main);