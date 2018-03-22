import React from 'react';
import {ScrollView, View, Picker, Text} from "react-native";
import CommonPicker from "../commonPicker/commonPicker";
import RatingComponent from "../ratingComponent/ratingComponent";

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
        {name: "Piemont", value: 0, rating: 5},
        {name: "Rioja", value: 1, rating: 4}
    ];

    updateCountry = (country) => {
        this.setState({
            country: country
        });
    };
    updateRegion = (region) => {
        this.setState({
            region: region
        });
    };

    render() {
        const regionPicker = this.state.country ?
            (<CommonPicker placeholder={"Region auswählen"} pickerData={this.regions} updateData={this.updateRegion}/>) : null;

        const rating = this.state.region ?
            (<RatingComponent ratingValue={this.state.region.rating}/>) : null;

        return(<View>
                <CommonPicker placeholder={"Land auswählen"} pickerData={this.countries} updateData={this.updateCountry}/>
                {regionPicker}
                {rating}
            </View>);
    }
}


export default MainPartComponent;