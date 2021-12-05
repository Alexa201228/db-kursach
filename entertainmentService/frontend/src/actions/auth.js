import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    USER_LOADED,
    USER_LOADING,
    LOGOUT_USER
} from "./types";
import {API_URL} from "../constants";
import jwtDecode from "jwt-decode";


export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
    const access_token = localStorage.getItem('access_token');
    let curr_user = null;
    if(access_token) {
        curr_user = jwtDecode(access_token);

    axios
        .get(API_URL + `/users/${curr_user.user_id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });

        }).catch(err => {
            console.log(err);
        });
    }
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
            alert('Вы успешно зарегистрировались!')
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
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            alert("Вы успешно авторизировались!")
        })
        .catch(err => {
            dispatch({
                type: LOGIN_FAILED
            })
        })
};

//logout user
export const logout = () => (dispatch, getState) => {
    dispatch({type: LOGOUT_USER})
    const body = JSON.stringify({'access_token': localStorage.getItem('access_token'),
    'refresh_token': localStorage.getItem('refresh_token')})
    axios
        .post(API_URL + '/logout/', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_USER
            })
        })
        .catch(err => {
            console.log(err)
        })
}


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