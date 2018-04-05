import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HeaderComponent from "./pages/header/header";
import styled from "styled-components";
import MainPartComponent from "./pages/mainpart/mainpart";
import Loader from "./components/loader/loader";

const TextContainer = styled.View`
    flex: 1;
`;

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            appReady: false,
        };
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                appReady: true,
            });
        }, 1000);
    }

    render() {
    return (
        <View>
            <Loader
                isLoaded={this.state.appReady}
            >
                    <HeaderComponent />
                    <MainPartComponent />
                    <TextContainer>
                        <Text></Text>
                    </TextContainer>
            </Loader>
        </View>
    );
  }
}