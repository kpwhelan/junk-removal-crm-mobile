import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context/AuthContext";
import { User } from "../types/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!accessToken;

  useEffect(() => {
    async function loadStoredToken() {
      const storedToken = await SecureStore.getItemAsync("accessToken");

      if (storedToken) {
        setAccessToken(storedToken);
      }

      setIsLoading(false);
    }

    loadStoredToken();
  }, []);

  async function login(token: string, user: User) {
    await SecureStore.setItemAsync("accessToken", token);

    setAccessToken(token);
    setUser(user);
  }

  async function logout() {
    await SecureStore.deleteItemAsync("accessToken");

    setAccessToken(null);
    setUser(null);
  }

  return (
    <>
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
    </>
  );
}
