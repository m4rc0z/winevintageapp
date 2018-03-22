import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HeaderComponent from "./pages/header/header";
import styled from "styled-components";
import MainPartComponent from "./pages/mainpart/mainpart";

const TextContainer = styled.View`
    flex: 1;
`;
export default class App extends React.Component {
  render() {
    return (
      <View>
        <HeaderComponent />
        <MainPartComponent />
        <TextContainer>
            <Text></Text>
        </TextContainer>
      </View>
    );
  }
}
