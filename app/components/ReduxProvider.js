import React from 'react';
import GlobalState from './../reducers/reducers';

import CRM from './CRM';
import AppNavigator from './../navigators/AppNavigator';

import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';

export default class ReduxProvider extends React.Component {
    constructor(props) {
        super(props); 
        this.initialState = {
            data: [],
            favourites: [],
            isLoaded: false,
            error: false,
        };
        this.store = this.configureStore();
    }

    render() {
        return (
            <Provider store={this.store}>
		        <AppNavigator /> 
            </Provider>
        );
    }

    configureStore() {
        const store = createStore(GlobalState, this.initialState);
        if (module.hot) {
            module.hot.accept('./../reducers/reducers', () => {
                const nextRootReducer = require('./../reducers/reducers').default;
                store.replaceReducer(nextRootReducer);
            });
        }
        return store;
    }
}
