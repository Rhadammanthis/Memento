import React from 'react';
import { UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const AppContainer = createAppContainer(AppNavigator);

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default () => (
    <Provider store={store}>
        <AppContainer />
    </Provider>
);