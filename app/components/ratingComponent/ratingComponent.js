import {Rating} from 'react-native-elements';
import React from 'react';

class RatingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.ratingValue
        }
    }

    render() {
        return (
            <Rating
                imageSize={20}
                readonly
                startingValue={this.props.ratingValue}
            />
        )
    }
}


export default RatingComponent;