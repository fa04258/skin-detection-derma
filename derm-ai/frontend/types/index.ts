export interface User {
  id: string;
  username: string;
  email: string;
  // Add any other user properties you expect from your backend
}

// Define the structure of your JWT payload
export interface DecodedToken {
  id: string;
  username: string;
  email: string;
  exp: number; // Expiration time
  iat: number; // Issued at time
  // Add any other properties your JWT payload might contain
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}