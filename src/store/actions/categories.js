import axios from "../../lib/axios";
import * as actionTypes from './actionTypes';

export const fetchCategoriesSuccess = (categories) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_SUCCESS,
        categories
    };
};

export const fetchCategoriesFail = (error) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_FAIL,
        error
    };
};

export const fetchCategories = () => {
    return dispatch => {
        axios.get('/categories')
            .then(response => response.data)
            .then(categories => dispatch(fetchCategoriesSuccess(categories)))
            .catch(err => dispatch(fetchCategoriesFail(err.response.data.error)));
    }
};
