import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import { LAPIS } from "../misc/Colors";


const LIGHT_GRAY = "#D3D3D3";

class CustomTextInput extends React.Component {
    state = {
        isFocused: false
    };

    handleFocus = event => {
        this.setState({ isFocused: true });
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    handleBlur = event => {
        this.setState({ isFocused: false });
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    };

    render() {
        const { isFocused } = this.state;
        const { onFocus, onBlur, placeholder, ...otherProps } = this.props;
        return (
            <TextInput
                placeholder={placeholder}
                selectionColor={LAPIS}
                underlineColorAndroid={
                    isFocused ? LAPIS : LIGHT_GRAY
                }
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                style={styles.textInput}
                {...otherProps}
            />
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        paddingLeft: 6
    }
});

export default CustomTextInput;