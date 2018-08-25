import {reducer as formReducer} from 'redux-form';

import pageReducer from "./pageReducer";
import authReducer from "./authReducer";

export const AUTH = 'AUTH';
export const PAGE = 'PAGE';

const rootReducer = {
    form: formReducer,
    [AUTH]: authReducer,
    [PAGE]: pageReducer,
};

export default rootReducer;