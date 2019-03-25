// https://goshakkk.name/floating-label-input-rn-animated/

import React from 'react';

import {
    View,
    TextInput,
    Animated,
} from 'react-native';

export class FloatingLabelInput extends React.Component {
    state = {
        isFocused: false,
    };

    componentWillMount() {
        this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    }

    handleFocus = () => {
        this.setState({isFocused: true});
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    };

    handleBlur = () => {
        this.setState({isFocused: false});
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    };

    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
            toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
            duration: 200,
        }).start();
    }

    render() {
        const {label, ...props} = this.props;
        const labelStyle = {
            position: 'absolute',
            left: 0,
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 0],
            }),
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 14],
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['#aaa', '#000'],
            }),
        };
        return (
            <View style={{paddingTop: 18}}>
                <Animated.Text style={labelStyle}>
                    {label}
                </Animated.Text>
                <TextInput
                    {...props}
                    style={{height: 26, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555'}}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    blurOnSubmit
                />
            </View>
        );
    }
}