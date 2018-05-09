import {Icon, SearchBar} from 'react-native-elements';
import React from 'react';
import {View} from "react-native";
import styled from "styled-components";
import NavigationService from "../../services/navigation/NavigationService";

class HeaderComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <HeaderContainer>
                <SearchIconContainer><Icon name="search" onPress={() => NavigationService.navigate('SearchBar')}/></SearchIconContainer>
            </HeaderContainer>
        )
    }
}

const HeaderContainer = styled.View`
  background: blue;
  padding-top: 25px;
  height: 60px;
`;
const SearchIconContainer = styled.View`
  width: 100%;
`;

export default HeaderComponent;