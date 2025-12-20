import { createContext, useContext, useState, ReactNode } from 'react';

interface UserInfo {
  name: string;
  birthdate: string;
  phone: string;
  email: string;
}

interface UserContextType {
  isLoggedIn: boolean;
  userInfo: UserInfo;
  login: (info: UserInfo) => void;
  logout: () => void;
  updateUserInfo: (info: UserInfo) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    birthdate: '',
    phone: '',
    email: ''
  });

  const login = (info: UserInfo) => {
    setIsLoggedIn(true);
    setUserInfo(info);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserInfo({
      name: '',
      birthdate: '',
      phone: '',
      email: ''
    });
  };

  const updateUserInfo = (info: UserInfo) => {
    setUserInfo(info);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, userInfo, login, logout, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
