import { ReactNode, createContext, useContext } from 'react';
import { useAppwrite } from '../lib/useAppWrite';
import { getCurrentUser } from '../lib/appwrite';
interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const isLoggedIn = !!user;

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const userGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context)
    throw new Error('userGlobalContext must be used within a GlobalProvider');

  return context;
};

export default GlobalProvider;
