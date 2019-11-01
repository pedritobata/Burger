import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFail = (error) => {
    return {
        type:actionTypes.FECTH_ORDERS_FAIL,
        error: error
    }
};

export const authLogout = () => {
    //Toda la logica de side effects pasa a los sagas!!

   /*  localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId'); */
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

//Otro approach mejor para usar los sagas con los actions
//hacemos que el action retorne la accion tal cual siempre se usó
//y el saga llamará al action creator para que retorne esa accion
//en vez de que el saga despache la accion
export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
}

export const auth = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email:email,
        password:password,
        isSignup:isSignup
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
   
}