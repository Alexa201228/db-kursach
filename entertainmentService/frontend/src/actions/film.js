import axios from "axios";
import {GET_FILMS_LIST, GET_FILM, ADD_FILM, DELETE_FILM} from "./types";
import {API_URL} from "../constants";
import {tokenConfig} from "./auth";

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

export const delete_film = (item_id) => (dispatch, getState) =>{
    axios
        .delete(`${API_URL}/film/detail/${item_id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_FILM,
                payload: item_id
            })
        })
        .catch(err =>{
            console.log(err)
        })
}

export const add_film = (data) => (dispatch, getState) => {
    const body = JSON.stringify(data);
    axios
        .post(API_URL + '/film/detail/', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_FILM,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const getFilmById = (film_id) => (dispatch, getState) => {
    axios
        .get(`${API_URL}/service/detail/${film_id.id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_FILM,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}