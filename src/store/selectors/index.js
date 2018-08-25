import {
    CATEGORIES,
    PAGE,
    LOADING
} from '../reducers';
import * as FromPage from "../reducers/pageReducer";
import * as FromCategories from "../reducers/categoriesReducer";
import * as FromLoading from "../reducers/loadingReducer";

export const getPage = state => FromPage.getPage(state[PAGE]);

export const getCategories = state => FromCategories.getCategories(state[CATEGORIES]);
export const getCategory = (state, id) => FromCategories.getCategory(state[CATEGORIES], id);

export const isLoading = state => FromLoading.isLoading(state[LOADING]);
