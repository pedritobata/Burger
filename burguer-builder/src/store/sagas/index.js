import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth';
import {initIngredientsSaga} from './burgerBuilder';

//estas funciones se comportaran como listeners para las actions de los action creators
//y suscribiran a los sagas para que sean invocados cuando se solicite
export function* watchAuth(){
    //No importa el orden de las invocaciones a takeEvery usando yield porque este metodo solo suscribe no ejecuta
    //asi que asi la suscripcion sea asincrona no pasa nada
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}