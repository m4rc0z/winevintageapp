export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_FAIL = 'FETCH_COUNTRIES_FAIL';

export function fetchCountries(){
    return (dispatch) => {
        dispatch(getCountries());

        return(fetch('https://winevintageapp.firebaseio.com/country.json?auth=0S0M8K7etZ6pu0khQYNEtGxtWf1OB3OuYdgW87ck'))
            .then(res => res.json())
            .then(json => {
                return(dispatch(getCountriesSuccess(json)))
            })
            .catch(err => dispatch(getCountriesFailure(err)))
    }
}

function getCountries() {
    return {
        type: FETCH_COUNTRIES
    }
}

function getCountriesSuccess(data) {
    return {
        type: FETCH_COUNTRIES_SUCCESS,
        data
    }
}

function getCountriesFailure() {
    return {
        type: FETCH_COUNTRIES_FAIL
    }
}
