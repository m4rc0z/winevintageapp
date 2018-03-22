import React, {Component} from 'react';
import SimplePicker from 'react-native-simple-picker';
import {Text, TouchableOpacity, View, Keyboard} from "react-native";
import {FormInput, Icon} from 'react-native-elements'
import styled from "styled-components";

class CommonPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: undefined,
            item: "",
        };
    }

    clearTextSelect = () => {
        this.setState({selectedOption: undefined, item: ""});
    };

    updateState(option) {
        const item = this.props.pickerData.find(element => element.value === option);
        this.setState({
            selectedOption: option,
            item: item
        });
        this.props.updateData(item);
    }
    options = this.props.pickerData.map((item) => item.value);
    labels = this.props.pickerData.map((item) => item.name);

    render() {
        const icon = this.state.item ?
            (<IconContainer>
                <Icon name={'close'} size={20} onPress={() => {this.clearTextSelect()}}/>
            </IconContainer>) : null;

        return (
            <View>
                <PickerContainer>
                    <InputContainer>
                        <FormInput
                            ref={(ref) => { this.selectInput = ref; }}
                            editable={true}
                            placeholder={this.props.placeholder}
                            clearButtonMode="never"
                            onFocus={() => {
                                Keyboard.dismiss();
                                this.refs.picker.show();
                                this.selectInput.blur();
                            }}
                            value={this.state.item.name}
                        />
                    </InputContainer>
                    {icon}
                </PickerContainer>
                <SimplePicker
                    ref={'picker'}
                    supportedOrientations={['portrait', 'landscape']}
                    options={this.options}
                    labels={this.labels}
                    onSubmit={(option) => {
                        this.updateState(option);
                    }}
                />
            </View>
        )
    }
}

const PickerContainer = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
`;
const IconContainer = styled.TouchableHighlight`
    display: flex;
    justify-content: center;
    flex:none
    margin-left: -62;
    margin-right: 12;
    width: 50;
`;

const InputContainer = styled.View`
    flex: 1;
`;
export default CommonPicker