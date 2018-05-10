import {SET_SELECTED_COUNTRY} from "../actions/country";

const initialState = {
    selectedCountry: undefined,
};

export default function countryReducer(state = initialState, action) {

    switch(action.type) {
        case SET_SELECTED_COUNTRY:
            return {
                ...state,
                selectedCountry: action.selectedCountry
            };
        default:
            return state
    }
}