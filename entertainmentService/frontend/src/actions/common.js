import axios from "axios";
import {API_URL} from "../constants";
import {tokenConfig} from "./auth";
import {GET_FILMS_LIST, GET_GENRES} from "./types";

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