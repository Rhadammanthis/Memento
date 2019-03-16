import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { loadEntries, addEntry, clearList, addRandomEntry, selectEntry } from '../actions';
import ListItem from './ListItem';
import CustomTextInput from './CustomTextInput'
import Modal from "react-native-modal";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { PUMPKIN, LAPIS } from '../misc/Colors';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

class Main extends Component {

    state = {
        toggleModal: false,
        modalTextTitle: "",
        modalTextSubtitle: "",
        refres: false
    };

    componentDidMount() {
        this.props.loadEntries();
    }

    componentDidUpdate(prevProps) {
        //Checks if the list should be updated
        if (this.props.updated !== prevProps.updated) {
            this.props.loadEntries();
        }
    }


    _renderList() {
        //Check which content to present. Either a loading screen, a message to the user or the list
        if (this.props.entries == null)
            return (
                <View style={styles.container}>
                    <Text style={styles.title} >
                        Loading tasks...
                    </Text>
                    <ActivityIndicator
                        style={styles.centering}
                        size="large"
                        color={PUMPKIN}
                    />
                </View>
            )
        else {
            if (this.props.entries.length <= 0)
                return (
                    <View style={styles.container}>
                        <Text style={styles.title} >
                            Add some new tasks!
                        </Text>
                    </View>
                )
            else {
                return (
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.props.entries}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item }) => <ListItem index={item.index} title={item.title} subtitle={item.subtitle} onPress={() => this._onItemPressed(item.id)} />}
                    />
                )
            }
        }

    }

    //Navigates to the detail's page
    _onItemPressed = (id) => {
        this.props.selectEntry(id, this.props.navigation)
    }

    //Shows or hides the modal view
    _toggleModal = () => {
        this.setState({ toggleModal: !this.state.toggleModal })
    }

    //Triggers the 'adding a random entry' flow
    _addRandom = () => {
        if (this.props.entries != null && this.props.entries.length > 0) {
            this.props.addRandomEntry();
        }
        else
            alert('No tasks to copy!');
    }

    validInputBoxes = () =>{
        return !(this.state.modalTextTitle.length == 0 || this.state.modalTextSubtitle.length == 0)
    }

    //Modal view to add new entry to the list
    renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text style={{ fontSize: 20, marginBottom: 5 }}>Add new task</Text>
            <CustomTextInput
                placeholder={"Title"}
                onChangeText={(text) => this.setState({ modalTextTitle: text })}
                value={this.state.modalTextTitle}
            />
            <CustomTextInput
                placeholder={"Subtitle"}
                onChangeText={(text) => this.setState({ modalTextSubtitle: text })}
                value={this.state.modalTextSubtitle}
            />
            <TouchableOpacity 
            disabled={!this.validInputBoxes()}
            onPress={() => {
                this.props.addEntry({ title: this.state.modalTextTitle, subtitle: this.state.modalTextSubtitle })
                this.setState({
                    modalTextTitle: "",
                    modalTextSubtitle: "",
                })
                this._toggleModal()
            }}>
                <View style={styles.button}>
                    <Text style={{ color: 'white' }}>Add new</Text>
                </View>
            </TouchableOpacity>

        </View>
    );


    render() {

        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor={LAPIS}
                    barStyle="light-content"
                />
                {this._renderList()}
                <ActionButton buttonColor="rgba(246,80,40,1)" bgColor="rgba(0,0,0,0.6)" offsetX={20} offsetY={20} spacing={15} fixNativeFeedbackRadius={true}>
                    <ActionButton.Item buttonColor='rgba(246,80,40,1)' title="New Task" onPress={this._toggleModal} textStyle={{ color: "white", fontSize: 15 }}
                        textContainerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}>
                        <Icon name="md-book" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='rgba(246,80,40,1)' title="Random!" onPress={this._addRandom} textStyle={{ color: "white", fontSize: 15 }}
                        textContainerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}>
                        <Icon name="md-document" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
                <Modal
                    isVisible={this.state.toggleModal}
                    onBackButtonPress={this._toggleModal}
                    onBackdropPress={this._toggleModal}
                    animationIn="slideInUp"
                    animationOut="slideOutDown">
                    {this.renderModalContent()}
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    button: {
        backgroundColor: PUMPKIN,
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
});

const mapStateToProps = ({ list }) => {

    const { entries, updated } = list;

    return {
        entries, updated
    };
};

export default connect(mapStateToProps, { loadEntries, addEntry, clearList, addRandomEntry, selectEntry })(Main);