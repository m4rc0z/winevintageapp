import React, {Component} from 'react';
import SimplePicker from 'react-native-simple-picker';
import {Text, TouchableOpacity, View, Keyboard} from "react-native";
import {FormInput} from 'react-native-elements'

class CommonPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: undefined,
            item: "",
        };
    }

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
        return (
            <View>
                <TouchableOpacity>
                    <View>
                        <FormInput
                            ref={(ref) => { this.selectInput = ref; }}
                            editable={true}
                            placeholder={this.props.placeholder}
                            clearButtonMode="always"
                            onFocus={() => {
                                Keyboard.dismiss();
                                this.refs.picker.show();
                                this.selectInput.blur();
                            }}
                            value={this.state.item.name}
                        />
                    </View>
                </TouchableOpacity>
                <SimplePicker
                    ref={'picker'}
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

export default CommonPicker