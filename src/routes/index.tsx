import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AuthNavigator = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthNavigator.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#312e38'
      }
    }}
  >
    <AuthNavigator.Screen name="SignIn" component={SignIn} />
    <AuthNavigator.Screen name="SignUp" component={SignUp} />
  </AuthNavigator.Navigator>
);

export default AuthRoutes;
