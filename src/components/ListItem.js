import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';
import { PEPERCORN, STONEGROUND } from '../misc/Colors';

class ListItem extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            scaleValue: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.timing(this.state.scaleValue, {
            toValue: 1,
            duration: 600,
            delay: this.props.index * 100
        }).start();
    }

    render() {
        const textColor = '#D3D3D3';
        //   const textColor = this.props.selected ? 'red' : 'black';
        return (
            <Animated.View style={{ opacity: this.state.scaleValue }}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10 }}>
                        <View style={styles.thumbNail}>
                            <Text style={{ color: 'white', fontSize: 17 }}>{this.props.title.charAt(0)}</Text>
                        </View>
                        <View style={{ flex: 7, flexDirection: 'column', paddingHorizontal: 15 }}>
                            <Text style={{ fontSize: 22 }}>{this.props.title}</Text>
                            <Text style={{}}>{this.props.subtitle}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}
const styles = StyleSheet.create({
    thumbNail: {
        backgroundColor: PEPERCORN,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40, width: 40
    }
});

export default ListItem