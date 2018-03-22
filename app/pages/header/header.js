import {Header} from 'react-native-elements';
import React from 'react';

class HeaderComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Header
                centerComponent={{ text: 'Wine Vintage', style: { color: '#fff' } }}
            />
        )
    }
}


export default HeaderComponent;