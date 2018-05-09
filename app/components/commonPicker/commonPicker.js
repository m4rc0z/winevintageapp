import React, {Component} from 'react';
import SimplePicker from 'react-native-simple-picker';
import {Text, TouchableOpacity, View, Keyboard, ScrollView, TouchableWithoutFeedback} from "react-native";
import {FormInput, Icon} from 'react-native-elements'
import styled from "styled-components";

class CommonPicker extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitState();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pickerData !== nextProps.pickerData) {
            this.setState({
                options: this.getOptions(nextProps),
                labels: this.getLabels(nextProps),
                pickerData: nextProps && nextProps.pickerData
            });
        }
        if (this.props.item !== nextProps.item) {
            this.setState({
                item: nextProps && nextProps.item
            });
        }
    }

    getInitState(){
        return {
            selectedOption: undefined,
            item: this.props.item || "",
            options: this.getOptions(this.props),
            labels: this.getLabels(this.props),
            pickerData: this.props.pickerData
        };
    }

    getOptions(props) {
        return props.pickerData && props.pickerData.map((item, index) => (index));
    }

    getLabels(props) {
        return props.pickerData && props.pickerData.map((item) => item.name);
    }

    clearTextSelect = () => {
        this.setState(this.getInitState());
        this.props.updateData(undefined);
    };

    updateState(option) {
        const item = this.state.pickerData[option];
        this.setState({
            selectedOption: option,
            item: item
        });
        this.props.updateData(item);
    }

    render() {
        const icon = this.state.item ?
            (<IconContainer>
                <Icon name={'close'} size={20} onPress={() => {this.clearTextSelect()}}/>
            </IconContainer>) : null;

        return (
            <View>
                <PickerContainer>
                    <InputContainer>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.refs.picker.show();
                            }}
                        >
                            <View pointerEvents="box-only">
                                <FormInput
                                    ref={(ref) => { this.selectInput = ref; }}
                                    editable={true}
                                    placeholder={this.props.placeholder}
                                    clearButtonMode="never"
                                    value={this.state.item && this.state.item.name}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </InputContainer>
                    {icon}
                </PickerContainer>
                {this.state.options && <SimplePicker
                    ref={'picker'}
                    supportedOrientations={['portrait', 'landscape']}
                    options={this.state.options}
                    labels={this.state.labels}
                    onSubmit={(option) => {
                        this.updateState(option);
                    }}
                />}
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
    flex:none;
    margin-left: -80; 
    width: 50;
`; //TODO: fix this ugly styling

const InputContainer = styled.TouchableWithoutFeedback`
    flex: 1;
`;
export default CommonPicker