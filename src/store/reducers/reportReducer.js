import * as actionTypes from '../actions/actionTypes';

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_REPORT_SUCCESS: return setReport(state, action);
        default: return state;
    }
};

const setReport = (state, action) => action.report;

export default reducer;

export const getReport = state => state;
