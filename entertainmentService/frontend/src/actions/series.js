import axios from "axios";
import {GET_SERIES, DELETE_SERIES, CHANGE_SERIES, ADD_SERIES} from "./types";
import {API_URL} from "../constants";
import {tokenConfig} from "./auth";


export const delete_series = (item_id) => (dispatch, getState) =>{
    axios
        .delete(`${API_URL}/series/detail/${item_id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_SERIES,
                payload: item_id
            })
        })
        .catch(err =>{
            console.log(err)
        })
}

export const add_series = (data) => (dispatch, getState) => {
    const body = JSON.stringify(data);
    axios
        .post(API_URL + '/series/detail/', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_SERIES,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const getSeriesById = (series_id) => (dispatch, getState) => {
    axios
        .get(`${API_URL}/series/detail/${series_id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SERIES,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const change_series = (data, series_id) => (dispatch, getState) => {
    const body = JSON.stringify(data)
    axios
        .put(`${API_URL}/film/detail/${series_id}/`, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CHANGE_SERIES,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}
