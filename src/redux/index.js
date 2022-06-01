import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import {reducer} from "./redusers";
import {all} from "redux-saga/effects"
import {postWeatherCoordsWatcher, postWeatherCityWatcher, getDataCityWatcher} from "./sagas";

export default function* rootSaga() {
    yield all([postWeatherCityWatcher(), postWeatherCoordsWatcher(),getDataCityWatcher()])
}

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)