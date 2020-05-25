import React from 'react';
import { useAuth } from '~/hooks/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import LoadingScreen from '~/components/LoadingScreen';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
