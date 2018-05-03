import {Icon, List, ListItem, SearchBar} from 'react-native-elements';
import React from 'react';
import {View, StyleSheet, Text, Alert} from "react-native";
import styled from "styled-components";
import CountryService from "../../services/api/countryService";

class SearchComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            searchValue: undefined,
            content: undefined,
        };
        this.initCountries();
    }

    async initCountries() {
        this.setState({countriesArray: await CountryService.getCountries()});
    }

    openSearchBar() {
        if(!this.state.isOpen) {
            this.setState({
                isOpen: true,
                searchValue: undefined,
                content: undefined,
            });
        }
    }

    changeText(text) {
        this.setState({
            content: this.state.countriesArray.map(country => country.regions.find(region => region.name.includes(text)))
            }
        );

    }

    clearText() {
        console.log('clear')
    }

    render() {
        return (
            this.state.isOpen ? (
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
                        <List containerStyle={{marginBottom: 20}}>
                            {
                                this.state.content && this.state.content.map((l, i) => (
                                    <ListItem
                                        key={i}
                                        title={(l && l.name)}
                                        rightIcon={<DummyRightElement></DummyRightElement>}
                                        onPress={() => Alert.alert(`${l.name} clicked`)}
                                    />
                                ))
                            }
                        </List>
                    </SearchResultContainer>
                </View>
            ) : <SearchIconContainer><Icon name="search" onPress={() => this.openSearchBar()}/></SearchIconContainer>
        )
    }
}

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

const SearchIconContainer = styled.View`
  height: 40px;
  width: 100%;
`;
const SearchBarContainer = styled.View`
  height: 40px;
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

export default SearchComponent;