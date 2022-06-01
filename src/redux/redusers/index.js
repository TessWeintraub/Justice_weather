import {POST_DATA, ERROR_POST_DATA} from "../action";

const initialState = []

export function reducer(state = initialState, action) {
    switch (action.type) {

        case POST_DATA:
            return action.payload

        case ERROR_POST_DATA:
            return action.payload

        default:
            return state
    }
}