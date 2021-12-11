import axios from "axios";
import {API_URL} from "../constants";
import {tokenConfig} from "./auth";
import {
    GET_ACTORS, GET_COMPANIES,
    GET_DIRECTORS,
    GET_FILMS_LIST,
    GET_GAMES_LIST,
    GET_GENRES,
    GET_SERIES_LIST
} from "./types";

export const getDirectors = () => (dispatch) => {
    axios
        .get(`${API_URL}/directors/`)
        .then(res => {
            dispatch({
                type: GET_DIRECTORS,
                payload: res.data.results
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const get_film_list = () => (dispatch, getState) =>{
    axios.get(API_URL + '/film/detail/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_FILMS_LIST,
                payload: res.data.results
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const get_genres = () => (dispatch) => {
    axios
        .get(API_URL + '/genres/')
        .then(res => {
            dispatch({
                type: GET_GENRES,
                payload: res.data.results
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const get_series_list = () => (dispatch, getState) => {
    axios
        .get(API_URL + '/series/detail/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SERIES_LIST,
                payload: res.data.results
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const get_games_list = () => (dispatch, getState) => {
    axios
        .get(API_URL + '/game/detail/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_GAMES_LIST,
                payload: res.data.results
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const get_actors = () => (dispatch, getState) => {
    axios
        .get(API_URL + '/actors/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ACTORS,
                payload: res.data.results
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const get_companies = () => (dispatch, getState) => {
    axios
        .get(API_URL + '/companies/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_COMPANIES,
                payload: res.data.results
            })
        })
        .catch(err => {
            console.log(err)
        })
}