import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HeaderComponent from "./pages/header/header";
import MainPartComponent from "./pages/mainpart/mainpart";
import Loader from "./components/loader/loader";
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import SearchComponent from "./components/searchComponent/searchComponent";
import NavigationService from "./services/navigation/NavigationService";
import store from "./store";
import {Provider} from "react-redux";
import {ThemeProvider} from "styled-components";

const TopLevelNavigator = createStackNavigator({
    SplashScreen: {screen: Loader},
    MainNavigator: {screen: MainPartComponent},
    Search: {
        screen: createBottomTabNavigator({
            SearchBar: {screen: SearchComponent},
            Home: {screen: MainPartComponent},
        })
    },
}, {
    headerMode: 'screen',
    cardStyle: {backgroundColor: 'white'},
    navigationOptions: {
        header: <HeaderComponent/>
    }
});

class App extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <TopLevelNavigator
                        ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef)
                        }}/>
                </Provider>
            </ThemeProvider>
        )
    };
}

const theme = {
    colors: {
        navigationColor: '#733626',
        backgroundColor: '#FFFFFF',
        textColor: '#2B2C28',
    }
};

export default App;