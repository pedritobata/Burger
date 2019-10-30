import {put} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

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
    yield put(
        {
            type: actionTypes.AUTH_LOGOUT
        }
    ); 
}