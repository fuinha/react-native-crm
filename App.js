import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import ReduxProvider from './app/components/ReduxProvider';

export default class App extends React.Component {
  render() {
    return (
        <ReduxProvider/>
    );
  }
}
