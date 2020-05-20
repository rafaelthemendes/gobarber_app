// NOTE: This should be the first import, or the app might crash in production
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar, View } from 'react-native';
import Routes from './routes';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar backgroundColor="#312e38" barStyle="light-content" />
    <Routes />
  </NavigationContainer>
);

export default App;
