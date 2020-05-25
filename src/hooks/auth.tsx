import AsyncStorage from '@react-native-community/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

export const AuthContextProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData(): Promise<void> {
      const [user, token] = await Promise.all([
        AsyncStorage.getItem('@GoBarberWeb:user'),
        AsyncStorage.getItem('@GoBarberWeb:token'),
      ]);
      if (token && user) {
        setData({
          token,
          user: JSON.parse(user),
        });
      }
      setLoading(false);
    }
    loadUserData();
  });

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    const {
      data: { token, user },
    } = await api.post<AuthState>('sessions', credentials);

    await AsyncStorage.multiSet([
      ['@GoBarberWeb:token', token],
      ['@GoBarberWeb:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarberWeb:token', '@GoBarberWeb:user']);
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext({} as AuthContextData);

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
}
