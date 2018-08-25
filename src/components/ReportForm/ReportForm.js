import React, {Component} from 'react';
import {connect} from "react-redux";
import Moment from "moment";
import "moment/locale/es";

import Panel from "../UI/Panel/Panel";
import classes from './ReportForm.scss';
import {Field, reduxForm} from "redux-form";
import ImageUpload from "../UI/ImageUpload/ImageUpload";
import TextArea from "../Forms/TextArea/TextArea";
import Select from "../Forms/Select/Select";
import DateInput from "../Forms/DateInput/DateInput";
import {mapObject} from "../../utils/helpers";
import {getCategories} from "../../store/selectors";
import * as actions from '../../store/actions';
import * as routeTypes from "../../store/router/routeTypes";

class ReportForm extends Component {

    state = {
        backdropActive: true,
        locationSelected: false
    };

    onImageChange = (img) => {
        this.image = img;
    };

    getCategoryOptions = () => {
        return mapObject(this.props.categories, (category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
        ));
    };

    handleBackdropClick = () => {
        this.props.changePage(routeTypes.HOME);
    };

    onCreate = values => {
        this.props.createReport(values, this.image);
    };

    handleLocationClick = () => {
        this.setState({backdropActive: false});
    };

    render() {
        return (
            <div className={classes.Container}>
                {this.state.backdropActive && <div className={classes.Backdrop} onClick={this.handleBackdropClick}/>}
                <Panel className={classes.ReportForm}>
                    <h2 className="text-center">Reportar crimen</h2>
                    <form onSubmit={this.props.handleSubmit(this.onCreate)}>
                        <Field name="categoryId"
                               component={Select}
                               id="category"
                               label="Categoría:"
                               required
                               images={this.props.categories.map(category => category.iconUrl)}
                               normalize={v => parseInt(v, 10)}
                               alt="Categoría">
                            <option value="0">Elige una categoría...</option>
                            {this.getCategoryOptions()}
                        </Field>
                        <div className="form-group">
                            <ImageUpload label="Imagen:" onChange={this.onImageChange}/>
                        </div>
                        <Field name="description"
                               label="Descripción:"
                               id="description"
                               placeholder="Describe los detalles del crimen"
                               component={TextArea}
                               required
                               rows="6"/>
                        <Field name="date"
                               label="Fecha y Hora:"
                               id="fecha"
                               placeholder="Fecha y hora del crimen."
                               component={DateInput}/>
                        <Field name="location.lat"
                               component="input"
                               type="hidden"/>
                        <Field name="location.lng"
                               component="input"
                               type="hidden"/>
                        <div className="form-group">
                            <span>Selecciona la ubicación en el mapa:</span>&nbsp;
                            <button className="btn btn-secondary" type="button" title="Elige una ubicación en el mapa"
                                    onClick={this.handleLocationClick}>
                                <i className={`fa ${!this.state.locationSelected ? 'fa-map-marker' : 'fa-check'}`}/>
                            </button>
                        </div>
                        <button type="submit" className="btn btn-default btn-block btn-lg" disabled={!this.props.valid}>
                            Enviar Reporte
                        </button>
                    </form>
                </Panel>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: getCategories(state)
    }
};

ReportForm = connect(mapStateToProps, {
    changePage: actions.changePage,
    createReport: actions.createReport
})(ReportForm);

const validate = (values) => {
    const errors = {};
    const {categoryId, description, date, location} = values;

    if (!description) {
        errors.description = "Debes ingresar una descripción del crimen."
    } else if (description.length < 3) {
        errors.description = "La descripción es muy corta"
    }

    if (!categoryId) {
        errors.categoryId = "Elige una categoría."
    } else if (categoryId < 1 || categoryId > 20) {
        errors.categoryId = "Categoría incorrecta."
    }

    if (date && !(date instanceof Moment)) {
        errors.date = "Formato de fecha incorrecto.";
    }

    if (!location) {
        errors.location = {lat: "Debes elegir la ubicación en el mapa.", lng: "Debes elegir la ubicación en el mapa."};
    }

    return errors;
};

export default reduxForm({form: 'reportForm', validate})(ReportForm);