import React from 'react';
import {ScrollView, View, Picker, Text} from "react-native";
import CommonPicker from "../../components/commonPicker/commonPicker";
import RatingComponent from "../../components/ratingComponent/ratingComponent";

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
        return(
            <View>
                <CommonPicker placeholder={"Land auswählen"} pickerData={this.countries} updateData={this.updateCountry}/>
                {this.state.country && <CommonPicker placeholder={"Region auswählen"} pickerData={this.regions} updateData={this.updateRegion}/>}
                {this.state.country && this.state.region && <RatingComponent ratingValue={this.state.region.rating}/>}
            </View>);
    }
}


export default MainPartComponent;