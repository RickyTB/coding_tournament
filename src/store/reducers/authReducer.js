import * as actionTypes from "../actions/actionTypes";
import {updateObject} from '../utility';

const initialState = {
    loading: false,
    token: null,
    userId: null,
    error: null,
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.PURGE_AUTH: return authLogout(state, action);
        default: return state;
    }
};

export default authReducer;

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.sessionData.id,
        userId: action.sessionData.userId,
        user: action.sessionData.user,
        loading: false
    });
};

const authFail = (state, action) => updateObject(state, {loading: false, error: action.error});

const authStart = (state) => updateObject(state, {loading: true, error: null});

const authLogout = () => initialState;

export const isLoading = (state) => state.loading;

export const getToken = (state) => state.token;

export const getUser = (state) => state.user;

export const getError = (state) => state.error;

export const getPartialUser = (state) => state.partialUser;