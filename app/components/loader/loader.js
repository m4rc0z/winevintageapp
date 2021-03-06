import * as React from 'react';
import {
    Animated,
    StatusBar,
    View,
    StyleSheet,
    MaskedViewIOS, Text, Image,
} from 'react-native';
import styled from "styled-components";
import {StackActions, NavigationActions} from "react-navigation";

export default class Loader extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            loadingProgress: new Animated.Value(0),
            animationDone: false,
        };
        this.animatedValue1 = new Animated.Value(0);
        this.animatedValue2 = new Animated.Value(1);
    }

    _navigateTo = (routeName: string) => {
        const actionToDispatch = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
        });
        this.props.navigation.dispatch(actionToDispatch);
    };

    static defaultProps = {
        isLoaded: false,
    };

    componentDidMount() {
        setTimeout(() => {
            Animated.sequence([
                Animated.parallel(
                    [
                        Animated.timing(this.animatedValue1, {
                            duration: 3000,
                        }),
                        Animated.spring(this.animatedValue2, {
                            toValue: 3,
                        }),
                        Animated.timing(this.animatedValue1, {
                            duration: 3000,
                        }),
                        Animated.spring(this.animatedValue2, {
                            toValue: 0.5,
                        }),
                        Animated.timing(this.animatedValue1, {
                            duration: 3000,
                        }),
                        Animated.spring(this.animatedValue1, {
                            toValue: -250,
                        })

                    ]
                )
                    .start()
            ])
        }, 10);
        setTimeout(() => {
            Animated.timing(this.state.loadingProgress, {
                toValue: 100,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => {
                this.setState({
                    animationDone: true,
                });
                this._navigateTo('MainNavigator');
            });
        }, 500)
    }

    render() {
        const animatedStyle = {
            transform: [
                {
                    translateY: this.animatedValue1
                },
                {
                    scale: this.animatedValue2
                }
            ]
        };

        const opacityClearToVisible = {
            opacity: this.state.loadingProgress.interpolate({
                inputRange: [0, 15, 30],
                outputRange: [0, 0, 1],
                extrapolate: 'clamp',
            }),
        };

        const appScale = {
            transform: [
                {
                    scale: this.state.loadingProgress.interpolate({
                        inputRange: [0, 7, 100],
                        outputRange: [1.1, 1.03, 1],
                    }),
                },
            ],
        };

        const fullScreenBackgroundLayer = this.state.animationDone ? null : (
            <FullscreenLayer>
                <Animated.Image
                    source={require("../../assets/logos/winevintage_logo_small.png")}
                    style={animatedStyle}
                />
            </FullscreenLayer>
        );
        return (
            <View>
                <StatusBar animated={true} hidden={!this.state.animationDone} />
                {fullScreenBackgroundLayer}
                <Animated.View style={[opacityClearToVisible, appScale]}>
                    {this.props.children}
                </Animated.View>
            </View>
        );
    }
}

const FullscreenLayer = styled.View`
  flex: 1;
  flex-basis: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;