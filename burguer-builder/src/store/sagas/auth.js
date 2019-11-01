import {put} from 'redux-saga/effects';

import * as actions from '../actions/index';
import { delay } from 'redux-saga/effects';
import axios from 'axios';

//redux saga es una alternativa a redux thunk para manejar el dispatching de acciones
//inviertiendo el control de esto.
//ademas usa funciones especiales que son en realidad "generators" (ES6 o mas?), las cuales
//pueden ejecutarse porcion por porcion de acuerdo a los "yields" que especifique
//AL final esto sirve para manejar el codigo que producía side effects en los action creators.
export function* logoutSaga(action){
    //yield hace que la instruccion que afecta se ejecute sincronamente y 
    //el siguiente yield esperará a que termine el anterior
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');

    //put hace el dispatch del action
    yield put(actions.logoutSucceed()); 
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000);
    yield put(actions.authLogout());
   
}

export function* authUserSaga(action){
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQxosPzM7CX2PDIKolc7PPM-S5K6WZ8uo';
    if(!action.isSignup){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQxosPzM7CX2PDIKolc7PPM-S5K6WZ8uo';
    }
    try{
        //con yield , la promesa solo devuelve el valor , parecido a await
        const response = yield axios.post(url,authData)
   
        console.log(response);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate',expirationDate);
        yield localStorage.setItem('userId',response.data.localId);
        //console.log('token retreived', response.data.idToken);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    }catch(err){
        //console.log(err);
        //axios envuelve el error que le retorne el endpoint en un objeto error
        //hay que bucear en ese objeto hasta llegar al mensaje de error que trae el endpoint
        yield put(actions.authFail(err.response.data.error));
    }
   
}

export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem('token');
    //console.log('token', token);
    if(!token){
        yield put(actions.authLogout());
    }else{
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if(expirationDate < new Date()){
            yield put(actions.authLogout());
        }else{
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token,userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
        }
    }
}