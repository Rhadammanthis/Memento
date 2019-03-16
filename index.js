/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


import React, { Component } from 'react';
import { AppRegistry, UIManager } from 'react-native';

import App from './src/App';

class MementoApp extends Component {

    render() {
        return (
            <App/>
        );
    }
}

AppRegistry.registerComponent('Memento', () => MementoApp);
