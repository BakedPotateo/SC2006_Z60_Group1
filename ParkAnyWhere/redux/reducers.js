import { SET_LOCATION } from "./actions";

const initialState = {
    latitude: 0,
    longitude: 0
};

function userReducer ( state = initialState, action)