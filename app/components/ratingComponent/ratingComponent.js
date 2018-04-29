import {Rating} from 'react-native-elements';
import React from 'react';
import {View} from "react-native";

class RatingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.ratingvalue
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.ratingvalue !== nextProps.ratingvalue) {
            this.setState({
                rating: nextProps.ratingvalue,
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("" + this.ratingElement);
        this.ratingElement.setCurrentRating(nextState.rating);
    }


    render() {
        return (
            <View>
                <Rating
                    ref={(ref) => {this.ratingElement = ref}}
                    imageSize={20}
                    readonly
                    startingValue={Number(this.state.rating)}
                />
            </View>
        )
    }
}


export default RatingComponent;