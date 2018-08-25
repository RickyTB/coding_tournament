import {
    AUTH,
    PAGE
} from '../reducers';
import * as FromPage from "../reducers/pageReducer";

export const getPage = state => FromPage.getPage(state[PAGE]);