// NOTE: gesture handler should be the first import, or the app might crash in
// production. Be careful with tools that auto organize imports
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar backgroundColor="#312e38" barStyle="light-content" />
    <AppProvider>
      <Routes />
    </AppProvider>
  </NavigationContainer>
);

export default App;
