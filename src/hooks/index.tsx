import React from 'react';
import { AuthContextProvider } from './auth';

const AppProvider: React.FC = ({ children }) => (
  <AuthContextProvider>{children}</AuthContextProvider>
);

export default AppProvider;
