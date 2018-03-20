import React, {Component} from 'react';
import SimplePicker from 'react-native-simple-picker';
import {Text, TouchableOpacity, View, Keyboard} from "react-native";
import {Button, FormInput} from 'react-native-elements'
import Icon from "react-native-elements/src/icons/Icon";

class CountryPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
        };
    }

    state = {country: ""};

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
                            value={
                                this.props.pickerData.find(element => element.value === this.state.selectedOption) ?
                                this.props.pickerData.find(element => element.value === this.state.selectedOption).name : ""
                            }
                        />
                    </View>
                </TouchableOpacity>
                <SimplePicker
                    ref={'picker'}
                    options={this.options}
                    labels={this.labels}
                    onSubmit={(option) => {
                        this.setState({
                            selectedOption: option,
                        });
                    }}
                />
            </View>
        )
    }
}

export default CountryPicker