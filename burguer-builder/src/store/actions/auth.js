import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData:authData
    }
};

export const authFail = (error) => {
    return {
        type:actionTypes.FECTH_ORDERS_FAIL,
        error: error
    }
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQxosPzM7CX2PDIKolc7PPM-S5K6WZ8uo',
        authData)
        .then(response => {
            dispatch(authSuccess(response.data));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail());
        })
    }
}