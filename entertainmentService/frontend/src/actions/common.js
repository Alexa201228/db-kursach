import axios from "axios";
import {GET_SERVICES} from "./types";
import {API_URL} from "../constants";
import {tokenConfig} from "./auth";

export const greeting = () => (dispatch, getState) =>{
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