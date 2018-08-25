import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Dropzone from "react-dropzone";
import {addNotification} from "redux-notification";

import classes from './ImageUpload.scss';
import {MAX_IMG_SIZE, UPLOAD_IMG_ICON} from "../../../utils/resources";

class ImageUpload extends Component {

    state = {
        newImg: this.props.defaultIcon,
        imgSet: false
    };

    onFileSelected = (files) => {
        const file = files[0];
        if (!file) {
            this.props.addNotification({displayType: 'error', text: 'No ha seleccionado una imagen'});
            return;
        }
        const match = ["image/jpeg", "image/png", "image/jpg"];
        if (!((file.type === match[0]) || (file.type === match[1]) || (file.type === match[2]))) {
            this.props.addNotification({
                displayType: 'error',
                text: 'No se encontró una imagen válida. Asegúrate que tenga uno de estos formatos: JPG, JPEG, PNG.'
            });
            return;
        }
        if (file.size > MAX_IMG_SIZE) {
            this.props.addNotification({
                displayType: 'error',
                text: 'El tamaño de la imagen que intentas subir es de ' + (file.size / 1024 / 1024).toFixed(2) + ' MB, el tamaño máximo que puedes subir es de ' + (MAX_IMG_SIZE / 1024 / 1000).toFixed(2) + ' MB'
            });
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            this.setState({newImg: e.target.result, imgSet: true}, () => {
                if (this.props.onChange) this.props.onChange(file, true, this.state.newImg);
            });
        };
        reader.readAsDataURL(file);
    };

    render() {
        return (
            <div className={classes.ImageUpload}>
                <label htmlFor="image">{this.props.label ? this.props.label : 'Imagen:'}</label>
                <Dropzone onDrop={this.onFileSelected} className={classes.FileInput}>
                    <img src={this.state.newImg} alt="Imagen por subir" className="img-fluid" id="image"/>
                </Dropzone>
            </div>
        );
    }

}

ImageUpload.propTypes = {
    defaultIcon: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};

ImageUpload.defaultProps = {
    defaultIcon: UPLOAD_IMG_ICON
};

export default connect(null, {
    addNotification: addNotification
})(ImageUpload);