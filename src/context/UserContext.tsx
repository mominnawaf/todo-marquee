/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from 'react';

interface User {
  email: string;
  token: string;
}

interface UserContext {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContext>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children } : {children:  React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
