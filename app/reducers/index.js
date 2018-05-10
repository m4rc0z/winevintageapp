import { combineReducers } from 'redux';
import countries from "./countries";

const rootReducer = combineReducers({
    countryState: countries
});

export default rootReducer;