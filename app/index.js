import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HeaderComponent from "./pages/header/header";
import MainPartComponent from "./pages/mainpart/mainpart";
import Loader from "./components/loader/loader";
import {createStackNavigator} from 'react-navigation';

const App = createStackNavigator({
    SplashScreen: { screen: Loader },
    MainNavigator: { screen: MainPartComponent }
}, {
    headerMode: 'screen',
    navigationOptions: {
        header: <HeaderComponent/>
    }
});

export default App;