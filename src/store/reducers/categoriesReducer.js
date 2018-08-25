import * as actionTypes from '../actions/actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CATEGORIES_SUCCESS: return setCategories(state, action);
        default: return state;
    }
};

const setCategories = (state, action) => action.categories;

export default reducer;

export const getCategory = (state, id) => state[id];

export const getCategories = state => state;