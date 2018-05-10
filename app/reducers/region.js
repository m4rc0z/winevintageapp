import {SET_SELECTED_REGION} from "../actions/region";

const initialState = {
    selectedRegion: undefined,
};

export default function regionReducer(state = initialState, action) {

    switch(action.type) {
        case SET_SELECTED_REGION:
            console.log(action.selectedRegion);
            return {
                ...state,
                selectedRegion: action.selectedRegion
            };
        default:
            return state
    }
}