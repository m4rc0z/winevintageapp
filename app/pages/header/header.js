import {Header} from 'react-native-elements';
import React from 'react';
import SearchComponent from "../../components/searchComponent/searchComponent";
import {SearchBar} from 'react-native-elements';
import {View} from "react-native";
import styled from "styled-components";

class HeaderComponent extends React.Component {
    constructor() {
        super();
    }
    changeText() {
        console.log('change')
    }

    clearText() {
        console.log('clear')
    }

    render() {
        return (
            <HeaderContainer>
                <SearchComponent />
            </HeaderContainer>
        )
    }
}

const HeaderContainer = styled.View`
  background: blue;
  padding-top: 25px;
`;

export default HeaderComponent;