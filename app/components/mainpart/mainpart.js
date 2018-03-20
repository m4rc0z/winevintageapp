import React from 'react';
import {ScrollView, View, Picker} from "react-native";
import CountryPicker from "../countryPicker/countryPicker";

class MainPartComponent extends React.Component {
    constructor() {
        super();
    }

    countries = [
        {name: "Italien", value: 0},
        {name: "Spanien", value: 1}
    ];


    render() {
        return (
            <CountryPicker placeholder={"Land auswählen"} pickerData={this.countries}/>
        )
    }
}


export default MainPartComponent;