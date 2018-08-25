import {NOT_FOUND} from 'redux-first-router';

import * as routeTypes from '../router/routeTypes';

export default (state = routeTypes.HOME, action = {}) => components[action.type] || state

const components = {
    ...routeTypes,
    [NOT_FOUND]: NOT_FOUND
};

export const getPage = state => state;