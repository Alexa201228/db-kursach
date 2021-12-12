import axios from "axios";
import {
    GET_SUBSCRIPTION,
    ADD_SUBSCRIPTION,
    DELETE_SUBSCRIPTION,
    CHANGE_SUBSCRIPTION,
    GET_SUBSCRIPTIONS_LIST
} from "./types";
import {API_URL} from "../constants";
import {tokenConfig} from "./auth";


export const get_subscriptions_list = () => (dispatch, getState) => {
    console.log('subscription call')
    axios
        .get(API_URL + '/subscriptions/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SUBSCRIPTIONS_LIST,
                payload: res.data.results
            })
        })
        .catch(err => {
            console.log(err)
        })
}


export const delete_subscription = (item_id) => (dispatch, getState) =>{
    axios
        .delete(`${API_URL}/subscriptions/${item_id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_SUBSCRIPTION,
                payload: item_id
            })
        })
        .catch(err =>{
            console.log(err)
        })
}

export const add_subscription = (data) => (dispatch, getState) => {
    const body = JSON.stringify(data);

    axios
        .post(API_URL + '/subscriptions/', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_SUBSCRIPTION,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const getSubscriptionById = (subscription_id) => (dispatch, getState) => {
    axios
        .get(`${API_URL}/subscriptions/${subscription_id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SUBSCRIPTION,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const change_subscription = (data, subscription_id) => (dispatch, getState) => {
    const body = JSON.stringify(data)
    console.log(body)
    axios
        .put(`${API_URL}/subscriptions/${subscription_id}/`, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CHANGE_SUBSCRIPTION,
                payload: res.data
            })
            alert('Изменения применены')
        })
        .catch(err => {
            console.log(err)
        })
}
