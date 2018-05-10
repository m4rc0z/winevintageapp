import React from 'react';
import {ScrollView, View, Picker, Text, ActivityIndicator} from "react-native";
import CommonPicker from "../../components/commonPicker/commonPicker";
import RatingComponent from "../../components/ratingComponent/ratingComponent";
import styled from "styled-components";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchCountries} from "../../actions/fetchCountries";
import {setSelectedCountry} from "../../actions/country";
import {setSelectedRegion} from "../../actions/region";

class MainPartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: undefined,
            regions: undefined,
            selectedCountry: undefined,
            selectedRegion: undefined,
        };
    }

    componentDidMount() {
        if (this.props.countryState.countries.length === 0) {
            this.props.fetchCountries();
        }
        this.setState({
            countries: this.props.countryState.countries,
            selectedCountry: this.props.selectedCountryState.selectedCountry,
            selectedRegion: this.props.selectedRegionState.selectedRegion,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.countries !== nextProps.countryState.countries) {
            this.setState({countries: nextProps.countryState.countries});
        }
        if (this.state.selectedCountry !== (nextProps.selectedCountryState && nextProps.selectedCountryState.selectedCountry)) {
            this.setState({
                selectedCountry: nextProps.selectedCountryState.selectedCountry,
                regions: nextProps.selectedCountryState.selectedCountry && nextProps.selectedCountryState.selectedCountry.regions,
            });
        }

        if (this.state.selectedRegion !== (nextProps.selectedRegionState && nextProps.selectedRegionState.selectedRegion)) {
            this.setState({selectedRegion: nextProps.selectedRegionState.selectedRegion});
        }
    }

    updateCountry = (country) => {
        this.props.setSelectedCountry(country);
        this.setState({
            selectedCountry: country,
            selectedRegion: undefined,
            regions: country && country.regions,
        });
        if (this.regionPicker) {
            this.regionPicker.clearTextSelect();
        }
    };
    updateRegion = (region) => {
        this.props.setSelectedRegion(region);
        this.setState({
            selectedRegion: region,
        });
    };

    render() {
        const { isFetching } = this.props.countryState;

        let renderYearRatingContainer = this.state.selectedRegion && this.state.selectedRegion.years.map(year => {
            return (
                <YearRatingContainer key={year.year}>
                    {this.state.selectedCountry && this.state.selectedRegion && <YearContainer><Text>{year.year}</Text></YearContainer>}
                    {this.state.selectedCountry && this.state.selectedRegion && <RatingContainer><RatingComponent ratingvalue={year.rating}/></RatingContainer>}
                </YearRatingContainer>
            );
        });

        if (isFetching) {
            return(
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size={'large'} />
                </View>
            )
        } else {
            return(
                <View>
                    <View>
                        <CommonPicker placeholder={"Land auswählen"}
                                      pickerData={this.state.countries}
                                      updateData={this.updateCountry}
                                      item={this.state.selectedCountry}
                        />
                        {this.state.selectedCountry &&
                        <CommonPicker ref={instance => {this.regionPicker = instance;}}
                                      placeholder={"Region auswählen"}
                                      pickerData={this.state.regions}
                                      updateData={this.updateRegion}
                                      item={this.state.selectedRegion}
                        />}
                        <ScrollViewContainer>{renderYearRatingContainer}</ScrollViewContainer>
                    </View>
                </View>
            )
        }
    }
}

const YearContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const RatingContainer = styled.View`
  flex: 1
`;
const YearRatingContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
`;

const ScrollViewContainer = styled.ScrollView`
  flex-basis: 75%;
`;

function mapStateToProps(state) {
    return {
        countryState: state.countryState,
        selectedCountryState: state.selectedCountryState,
        selectedRegionState: state.selectedRegionState,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchCountries, setSelectedCountry, setSelectedRegion }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPartComponent)