import React from 'react'
import {connect} from 'react-redux'

import {getPage} from "../../../store/selectors";
import * as routeTypes from "../../../store/router/routeTypes";
import ReportForm from "../../ReportForm/ReportForm";
import NotFound from "../../../containers/NotFound/NotFound";

const Components = {
    [routeTypes.REPORT]: ReportForm
};

const Switcher = ({page}) => {
    const RouteComponent = Components[page] || NotFound;
    return <RouteComponent/>;
};

const mapStateToProps = state => ({
    page: getPage(state)
});

export default connect(mapStateToProps)(Switcher);
