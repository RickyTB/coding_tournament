import * as routeTypes from './routeTypes';
import axios from "../../lib/axios";
import {fetchCategoriesFail, fetchCategoriesSuccess} from "../actions/categories";

export default {
    [routeTypes.HOME]: '/',
    [routeTypes.REPORT]: {
        path: '/report',
        thunk: async (dispatch) => {
            try {
                const response = await axios.get('/categories');
                dispatch(fetchCategoriesSuccess(response.data));
            } catch (err) {
                dispatch(fetchCategoriesFail(err.response ? err.response.data.error : err));
            }
        }
    },
}