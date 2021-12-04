import {LOGIN_SUCCESS, LOGOUT_USER, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED} from "../actions/types";

const initialState = {
    access_token: localStorage.getItem('access_token'),
    refresh_token: localStorage.getItem('refresh_token'),
    user: null,
    isAuthenticated: false
};

export default function (state = initialState, action){
    switch (action.type){
        case REGISTER_SUCCESS:
            localStorage.setItem('access_token', action.payload.access_token);
            localStorage.setItem('refresh_token', action.payload.refresh_token);

            return{
                ...state,
                ...action.payload
            }
        case USER_LOADED:

            return{
                ...state,
                user: action.payload,
                isAuthenticated: true
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('access_token', action.payload.access);
            localStorage.setItem('refresh_token', action.payload.refresh);

            return{
                ...state,
                isAuthenticated: true
            }
        case LOGOUT_USER:
        case REGISTER_FAIL:
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return {
                ...state,
                isAuthenticated: false
            }

        default:
            return state;
    }
}