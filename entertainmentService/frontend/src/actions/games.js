import axios from "axios";
import {GET_GAME, ADD_GAME, DELETE_GAME, CHANGE_GAME} from "./types";
import {API_URL} from "../constants";
import {tokenConfig} from "./auth";


export const delete_game = (item_id) => (dispatch, getState) =>{
    axios
        .delete(`${API_URL}/game/detail/${item_id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_GAME,
                payload: item_id
            })
        })
        .catch(err =>{
            console.log(err)
        })
}

export const add_game = (data) => (dispatch, getState) => {
    const body = JSON.stringify(data);
    console.log(body)
    axios
        .post(API_URL + '/game/detail/', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_GAME,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const getGameById = (game_id) => (dispatch, getState) => {
    axios
        .get(`${API_URL}/game/detail/${game_id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_GAME,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const change_game = (data, game_id) => (dispatch, getState) => {
    const body = JSON.stringify(data)
    console.log(body)
    axios
        .put(`${API_URL}/game/detail/${game_id}/`, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CHANGE_GAME,
                payload: res.data
            })
            alert('Изменения применены')
        })
        .catch(err => {
            console.log(err)
        })
}
