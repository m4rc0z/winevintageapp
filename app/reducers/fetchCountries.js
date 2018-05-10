import {FETCH_COUNTRIES, FETCH_COUNTRIES_FAIL, FETCH_COUNTRIES_SUCCESS} from "../actions/fetchCountries";

const initialState = {
    countries: [],
    isFetching: false,
    error: false
};

export default function fetchCountriesReducer(state = initialState, action) {

    switch(action.type) {
        case FETCH_COUNTRIES:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_COUNTRIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                countries: action.data
            };
        case FETCH_COUNTRIES_FAIL:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state
    }
}