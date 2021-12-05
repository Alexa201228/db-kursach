import axios from "axios";
import {ADD_SERVICE, GET_SERVICE, GET_SERVICES, SERVICE_ITEM_DELETED} from "./types";
import {API_URL} from "../constants";
import {tokenConfig} from "./auth";

export const get_services = () => (dispatch, getState) =>{
    axios.get(API_URL + '/service/detail/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SERVICES,
                payload: res.data.results
            })
        })
        .catch(err => {
            console.log(err);

        })
}

export const delete_service_item = (item_id) => (dispatch, getState) =>{
    axios
        .delete(`${API_URL}/service/detail/${item_id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: SERVICE_ITEM_DELETED,
                payload: item_id
            })
        })
        .catch(err =>{
            console.log(err)
        })
}

export const add_service = (data) => (dispatch, getState) => {
    const body = JSON.stringify(data);
    console.log(body)
    axios
        .post(API_URL + '/service/detail/', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_SERVICE,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const getServiceById = (service_id) => (dispatch, getState) => {
    axios
        .get(`${API_URL}/service/detail/${service_id.id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SERVICE,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}