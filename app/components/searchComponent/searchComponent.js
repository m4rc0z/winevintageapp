import {ListItem, SearchBar} from 'react-native-elements';
import React from 'react';
import {Alert, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import styled from "styled-components";
import NavigationService from "../../services/navigation/NavigationService";
import {connect} from "react-redux";
import {setSelectedCountry} from "../../actions/country";
import {setSelectedRegion} from "../../actions/region";
import {bindActionCreators} from "redux";

Array.prototype.flatMap = function(lambda) {
    return Array.prototype.concat.apply([], this.map(lambda));
};

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            searchValue: undefined,
            content: undefined,
        };
    }

    componentDidMount() {
        this.setState({countries: this.props.countryState.countries});
    }

    changeText(text) {
        const searchResult = text == '' ?
            undefined
            : this.state.countries.flatMap(country => country.regions.filter(region => region.name.includes(text)));
        this.setState({
                content: searchResult
            }
        );
    }

    clearText() {
        console.log('clear')
    }

    setRegionAndNavigate(region) {
        this.props.setSelectedCountry(this.state.countries.find(country => country.regions.find(regionPar => regionPar == region)));
        this.props.setSelectedRegion(region);
        NavigationService.goBack();
        // NavigationService.navigate('Home', {
        //     country: this.state.countries.find(country => country.regions.find(regionPar => regionPar == region)),
        //     region: region,
        // });
    }

    render() {
        return (
                <DismissKeyboard>
                    <View>
                        <SearchBarContainer>
                            <SearchBar
                                clearIcon
                                containerStyle={styles.searchBar}
                                inputStyle={styles.searchInput}
                                onChangeText={(text) => this.changeText(text)}
                                onClear={this.clearText()}
                                value={this.state.searchValue}
                                placeholder='Type Here...' />
                        </SearchBarContainer>
                        <SearchResultContainer>
                                {
                                    this.state.content && this.state.content.map((l, i) =>
                                        l ?
                                            (<ListItem
                                                key={i}
                                                title={(l && l.name)}
                                                rightIcon={<DummyRightElement></DummyRightElement>}
                                                onPress={() => this.setRegionAndNavigate(l)}
                                            />)
                                            : null)
                                }
                        </SearchResultContainer>
                    </View>
                </DismissKeyboard>

        )
    }
}

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: 'blue',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        height: 40,
    },
    searchInput: {
        backgroundColor: 'blue',
        borderWidth: 0,
    }
});

const SearchBarContainer = styled.View`
  width: 100%;
`;
const SearchResultContainer = styled.View`
  height: 100%;
  width: 100%;
  background-color: white;
`;
const DummyRightElement = styled.View`
  height: 0;
  width: 0;
`;

function mapStateToProps(state) {
    return {
        countryState: state.countryState,
        selectedCountryState: state.selectedCountryState,
        selectedRegionState: state.selectedCountryState,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ setSelectedCountry, setSelectedRegion }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);