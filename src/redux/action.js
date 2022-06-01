export const POST_DATA = 'POST_DATA'
export const ERROR_POST_DATA = 'ERROR_POST_DATA'
export const ASYNC_POST_DATA_CITY = 'ASYNC_POST_DATA_CITY'
export const ASYNC_POST_DATA_COORDS = 'ASYNC_POST_DATA_COORDS'
export const ASYNC_GET_DATA_CITY = 'ASYNC_GET_DATA_CITY'

export const postDataAction = payload => {
    return {
        type: POST_DATA,
        payload
    }
}

export const errorPostDataAction = payload => {
    return {
        type: ERROR_POST_DATA,
        payload
    }
}

export const asyncPostDataCityAction = payload => {
    return {
        type: ASYNC_POST_DATA_CITY,
        payload
    }
}

export const asyncPostDataCoordsAction = payload => {
    return {
        type: ASYNC_POST_DATA_COORDS,
        payload
    }
}
export const asyncGetDataCityAction = payload => {
    return {
        type: ASYNC_GET_DATA_CITY,
        payload
    }
}
