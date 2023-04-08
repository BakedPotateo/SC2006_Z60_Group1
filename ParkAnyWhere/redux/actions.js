export const SET_LOCATION = 'SET_LOCATION';

export const setLocation = ( latitude, longitude ) => dispatch => {
    dispatch ({
        type: SET_LOCATION,
        payload: ( latitude, longitude )
    })
};