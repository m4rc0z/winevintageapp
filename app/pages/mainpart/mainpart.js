import React from 'react';
import {ScrollView, View, Picker, Text, ActivityIndicator} from "react-native";
import CommonPicker from "../../components/commonPicker/commonPicker";
import RatingComponent from "../../components/ratingComponent/ratingComponent";
import styled from "styled-components";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchCountries} from "../../actions/fetchCountries";

class MainPartComponent extends React.Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        const region = params ? params.region : undefined;
        const country = params ? params.country : undefined;
        this.state = {
            country: country,
            countries: undefined,
            region: region,
            regions: undefined
        };
    }

    componentDidMount() {
        if (this.props.countryState.countries.length === 0) {
            this.props.fetchCountries();
        }
        this.setState({countries: this.props.countryState.countries});
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.countries !== nextProps.countryState.countries) {
            this.setState({countries: nextProps.countryState.countries});
        }
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
        const { isFetching } = this.props.countryState;

        let renderYearRatingContainer = this.state.region && this.state.region.years.map(year => {
            return (
                <YearRatingContainer key={year.year}>
                    {this.state.country && this.state.region && <YearContainer><Text>{year.year}</Text></YearContainer>}
                    {this.state.country && this.state.region && <RatingContainer><RatingComponent ratingvalue={year.rating}/></RatingContainer>}
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
                                      item={this.state.country}
                        />
                        {this.state.country &&
                        <CommonPicker ref={instance => {this.regionPicker = instance;}}
                                      placeholder={"Region auswählen"}
                                      pickerData={this.state.regions}
                                      updateData={this.updateRegion}
                                      item={this.state.region}
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
        countryState: state.countryState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetchCountries }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPartComponent)