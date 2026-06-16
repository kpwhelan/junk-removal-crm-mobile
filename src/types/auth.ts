export type User = {
    id: number;
    email: string;
    name?: string;
}

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
};