import { OPEN_DETAILS, CLOSE_DETAILS } from './types';

import { returnErrors } from './messageActions';
import axios from 'axios';
// RETURN Errors
export const openDetails = (sketchID) => (dispatch) => {
    const config = {
        success: res => {
            const sketch_details = res.data;
            if (sketch_details) {
                dispatch({
                    type: OPEN_DETAILS,
                    payload: sketch_details
                });
            } else {
                dispatch(returnErrors("There was no data in your project", res.status, 'SKETCH_DETAIL_EMPTY'));
            }
        },
        error: err => {
            if (err.response) {
                dispatch(returnErrors(err.response.data.message, err.response.status, 'OPEN_SKETCH_DETAIL_FAIL'));
            }
        }
    }
    if (process.env.React_APP_SAME_SERVER === "true") {
        axios.get(`${window.location.origin}/api/sketch/${sketchID}`, {
            headers: {
                deviceID: localStorage.getItem("deviceID").toString(),
            },
        })
            .then(res => {
                config.success(res);
            })
            .catch(err => {
                config.error(err);
            });
    } else {
        axios.get(`${process.env.REACT_APP_REMOTE_BACKEND}/api/sketch/${sketchID}`, {
            headers: {
                deviceID: localStorage.getItem("deviceID").toString(),
            },
        })
            .then(res => {
                config.success(res);
            })
            .catch(err => {
                config.error(err);
            });
    }
};

export const closeDetails = () => (dispatch) => {
    dispatch({
        type: CLOSE_DETAILS
    });
};
