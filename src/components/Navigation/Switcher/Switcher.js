import React from 'react'
import {connect} from 'react-redux'

import NotFound from "../../../containers/NotFound/NotFound";
import {getPage} from "../../../store/selectors";
import * as routeTypes from "../../../store/router/routeTypes";
import Home from "../../../containers/Home/Home";

const Components = {
    [routeTypes.HOME]: Home
};

const Switcher = ({page}) => {
    const RouteComponent = Components[page] || NotFound;
    return <RouteComponent/>;
};

const mapStateToProps = state => ({
    page: getPage(state)
});

export default connect(mapStateToProps)(Switcher);
