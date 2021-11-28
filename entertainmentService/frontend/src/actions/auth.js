import axios from "axios";
import {REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAILED, USER_LOADED, USER_LOADING} from "./types";
import {API_URL} from "../constants";


export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
    axios
        .get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });

        }).catch(err => {
            console.log(err);
        });
};

// register function
export const register = ({ email, password, is_manager }) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password, is_manager });
    axios
        .post(API_URL + '/register/', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            console.log(err)
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

// login function
export const login = ({email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({email, password});

    axios.post(API_URL+'/login/', body, config)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            console.log(localStorage)
            alert("Вы успешно авторизировались!")
        })
        .catch(err => {
            console.log(err.data);
            dispatch({
                type: LOGIN_FAILED
            })
        })
};


export const tokenConfig = getState => {
    const token = getState().auth.access_token;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
}