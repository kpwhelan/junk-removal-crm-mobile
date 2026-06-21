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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!accessToken;

  useEffect(() => {
    async function loadStoredAuth() {
      const storedAccessToken = await getAccessToken();
      const storedRefreshToken = await getRefreshToken();

      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);

      setIsLoading(false);
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