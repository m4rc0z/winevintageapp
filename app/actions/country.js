export const SET_SELECTED_COUNTRY = 'SET_SELECTED_COUNTRY';

export function setSelectedCountry(selectedCountry) {
    return {
        type: SET_SELECTED_COUNTRY,
        selectedCountry
    }
}
