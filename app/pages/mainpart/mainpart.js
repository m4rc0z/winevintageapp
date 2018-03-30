import React from 'react';
import {ScrollView, View, Picker, Text} from "react-native";
import CommonPicker from "../../components/commonPicker/commonPicker";
import RatingComponent from "../../components/ratingComponent/ratingComponent";
import CountryService from "../../services/api/countryService";
import styled from "styled-components";

class MainPartComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            country: undefined,
            countriesArray: undefined,
            region: undefined,
            regions: undefined
        };
        this.initCountries();
    }

    async initCountries() {
        this.setState({countriesArray: await CountryService.getCountries()});
    }

    updateCountry = (country) => {
        this.setState({
            country: country,
            region: undefined,
            regions: country && country.regions
        });
        if (this.regionPicker) {
            this.regionPicker.clearTextSelect();
        }
    };
    updateRegion = (region) => {
        this.setState({
            region: region
        });
    };

    render() {
        let renderYearRatingContainer = this.state.region && this.state.region.years.map(year => {
            return (
                <View key={year.year}>
                    {this.state.country && this.state.region && <YearContainer>{year.year}</YearContainer>}
                    {this.state.country && this.state.region && <RatingComponent ratingvalue={year.rating}/>}
                </View>
            );
        });

        return(
            <View>
                <CommonPicker placeholder={"Land auswählen"} pickerData={this.state.countriesArray} updateData={this.updateCountry}/>
                {this.state.country && <CommonPicker ref={instance => { this.regionPicker = instance; }} placeholder={"Region auswählen"} pickerData={this.state.regions} updateData={this.updateRegion}/>}
                {renderYearRatingContainer}
            </View>);
    }
}

const YearContainer = styled.Text`
`;
export default MainPartComponent;