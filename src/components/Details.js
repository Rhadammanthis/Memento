import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { PEPERCORN, SALMON, PUMPKIN } from '../misc/Colors';
import { deleteEntry } from '../actions';


class Details extends Component {

    componentWillMount() {

    }

    _onPress = () => {
        Alert.alert(
            'Alert',
            'Are you sure you want to delete this task?',
            [
                { text: 'Yes, delete', onPress: () => this.props.deleteEntry(this.props.selected.id, this.props.navigation) },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ],
            { cancelable: false },
        );
    }

    render() {
        const { selected, ...otherProps } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.thumbNail}>
                        <Text style={{ color: 'white', fontSize: 50 }}>{this.props.selected.title.charAt(0)}</Text>
                    </View>
                    <Text style={{ fontSize: 35 }}>{this.props.selected.title}</Text>
                    <Text style={{ fontSize: 20 }}>{this.props.selected.subtitle}</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={() => this._onPress()}>
                        <View style={styles.deleteButton}>
                            <Text style={{ color: 'white' }}>
                                DELETE
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbNail: {
        backgroundColor: PEPERCORN,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150, width: 150
    },
    deleteButton: {
        backgroundColor: PUMPKIN,
        paddingHorizontal: 24,
        paddingVertical: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
    }
});

const mapStateToProps = ({ list }) => {

    const { selected } = list;

    return {
        selected
    };
};

export default connect(mapStateToProps, { deleteEntry })(Details);