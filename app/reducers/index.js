import { combineReducers } from 'redux';
import countryReducer from "./country";
import fetchCountriesReducer from "./fetchCountries";
import regionReducer from "./region";

const rootReducer = combineReducers({
    countryState: fetchCountriesReducer,
    selectedCountryState: countryReducer,
    selectedRegionState: regionReducer,
});

export default rootReducer;