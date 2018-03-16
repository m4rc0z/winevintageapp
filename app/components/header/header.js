import {Header} from 'react-native-elements';
import React from 'react';

class HeaderComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
            />
        )
    }
}


export default HeaderComponent;