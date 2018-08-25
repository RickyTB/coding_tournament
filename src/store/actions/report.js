import axios from '../../lib/axios';
import * as actionTypes from './actionTypes';

export const createReportSuccess = report => {
    return {
        type: actionTypes.CREATE_REPORT_SUCCESS,
        report
    }
};

export const createReportFail = error => {
    return {
        type: actionTypes.CREATE_REPORT_FAIL,
        error
    }
};

export const createReportStart = () => {
    return {
        type: actionTypes.CREATE_REPORT_START
    }
};

export const createReport = (model, image) => {
    return dispatch => {
        dispatch(createReportStart());
        const formData = new FormData();
        formData.append('values', JSON.stringify(model));
        formData.append('image', image);
        axios.post('/reports', formData)
            .then(response => response.data)
            .then(report => dispatch(createReportSuccess(report)))
            .catch(err => dispatch(createReportFail(err)));
    }
};

