import * as actionTypes from '../actions/actionTypes';
import * as routeTypes from '../router/routeTypes';

const initialState = false;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case routeTypes.REPORT:
            return true;
        case actionTypes.FETCH_CATEGORIES_SUCCESS:
        case actionTypes.FETCH_CATEGORIES_FAIL:
            return false;
        default:
            return state;
    }
};

export default reducer;

export const isLoading = state => state;