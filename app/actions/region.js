export const SET_SELECTED_REGION = 'SET_SELECTED_REGION';

export function setSelectedRegion(selectedRegion) {
    return {
        type: SET_SELECTED_REGION,
        selectedRegion
    }
}
