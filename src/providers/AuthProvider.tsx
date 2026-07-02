import { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User } from '../types/auth';
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
} from '../auth/authStorage';
import { registerLogoutHandler } from '../auth/authEvents';
import { api } from '../api/client';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!accessToken && !!refreshToken && !!user;

  useEffect(() => {
    async function loadStoredAuth() {
      try {
        const storedAccessToken = await getAccessToken();
        const storedRefreshToken = await getRefreshToken();

        if (!storedAccessToken || !storedRefreshToken) {
          return;
        }

        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);

        const response = await api.get<User>('/auth/me');

        setUser(response.data);
      } catch (error) {
        await clearTokens();

        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadStoredAuth();

    registerLogoutHandler(() => {
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
    });
  }, []);

  async function login(
    accessToken: string,
    refreshToken: string,
    user: User
  ) {
    await saveTokens(accessToken, refreshToken);

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);
  }

  async function logout() {
    await clearTokens();

    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
