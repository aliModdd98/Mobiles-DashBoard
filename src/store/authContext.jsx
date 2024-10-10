import { createContext, useState, useContext } from "react";

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuthContext = () => useContext(AuthContext);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("John Doe");

  // Handler for login
  const login = () => {
    setIsAuthenticated(true);
  };

  // Handler for logout
  const logout = () => {
    setIsAuthenticated(false);
  };

  // Handler for changing the user name
  const changeUserName = (newName) => {
    setUserName(newName);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, userName, changeUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
};
