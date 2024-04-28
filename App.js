import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainScreen from './src/Screen/MainScreen';
import {Provider} from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <MainScreen />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
