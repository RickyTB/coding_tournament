import {reducer as formReducer} from 'redux-form';
import {NOTIFICATIONS, notificationsReducer as nr} from "redux-notification";

import pageReducer from "./pageReducer";
import categoriesReducer from "./categoriesReducer";
import loadingReducer from "./loadingReducer";
import reportReducer from "./reportReducer";

export const PAGE = 'PAGE';
export const CATEGORIES = 'CATEGORIES';
export const LOADING = 'LOADING';
export const REPORT = 'REPORT';

const rootReducer = {
    form: formReducer,
    [PAGE]: pageReducer,
    [CATEGORIES]: categoriesReducer,
    [LOADING]: loadingReducer,
    [NOTIFICATIONS]: nr(),
    [REPORT]: reportReducer
};

export default rootReducer;