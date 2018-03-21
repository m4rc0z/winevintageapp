import React from 'react';
import {ScrollView, View, Picker, Text} from "react-native";
import CommonPicker from "../commonPicker/commonPicker";

class MainPartComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            country: undefined,
            region: undefined
        }
    }

    countries = [
        {name: "Italien", value: 0},
        {name: "Spanien", value: 1}
    ];

    regions = [
        {name: "Piemont", value: 0},
        {name: "Rioja", value: 1}
    ];

    updateCountry = (country) => {
        console.log(country);
        this.setState({
            item: country
        });
    };
    updateRegion = (region) => {
        this.setState({
            region: region
        });
    };

    render() {
        const regionPicker = this.state.item ?
            (<CommonPicker placeholder={"Region auswählen"} pickerData={this.regions} updateData={this.updateRegion}/>) : null;

        return(<View>
                <CommonPicker placeholder={"Land auswählen"} pickerData={this.countries} updateData={this.updateCountry}/>
                {regionPicker}
            </View>);
    }
}


export default MainPartComponent;