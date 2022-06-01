import {put, takeEvery} from "redux-saga/effects"
import {asyncPostDataCityAction} from "../action";
import {
    ASYNC_POST_DATA_CITY,
    postDataAction,
    ASYNC_POST_DATA_COORDS,
    errorPostDataAction,
    ASYNC_GET_DATA_CITY
} from "../action";

const apiKey = '73806142a4cad9bd05f37bb512727273'

function* postWeatherCityWorker(action) {

    const request = yield fetch('http://tessweintraub.ddns.net:5000/api/weather', {
        method: 'POST',
        body: JSON.stringify({"link": `https://api.openweathermap.org/data/2.5/weather?q=${action.payload}&units=metric&appid=${apiKey}`}),
        headers: { 'Content-Type': 'application/json'}
    })
        .then((res) => res.json())
    try {
        yield put(postDataAction(request))
    } catch {
        yield put(errorPostDataAction({}))
    }
}

function* postWeatherCoordsWorker(action) {
    const request = yield fetch('http://tessweintraub.ddns.net:5000/api/weather', {
        method: 'POST',
        body: JSON.stringify({"link": `https://api.openweathermap.org/data/2.5/weather?lat=${action.payload.latitude}&lon=${action.payload.longitude}&units=metric&&appid=${apiKey}`}),
        headers: { 'Content-Type': 'application/json' }
    })
        .then((res) => res.json())
    try {
        yield put(postDataAction(request))
    } catch {
        yield put(errorPostDataAction({}))
    }

}

function* getLocationCityWorker() {
    console.log(true)
    const request = yield fetch(`http://ipwho.is/`)
        .then((res) => res.json())
    try {
        yield put(asyncPostDataCityAction(request.city))
    } catch {
        yield put(asyncPostDataCityAction('Moscow'))
    }
}

export function* getDataCityWatcher() {
    yield takeEvery(ASYNC_GET_DATA_CITY, getLocationCityWorker)
}

export function* postWeatherCityWatcher() {
    yield takeEvery(ASYNC_POST_DATA_CITY, postWeatherCityWorker)
}

export function* postWeatherCoordsWatcher() {
    yield takeEvery(ASYNC_POST_DATA_COORDS, postWeatherCoordsWorker)
}