import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const savedInfo = localStorage.getItem('userInfo');
    return savedInfo ? JSON.parse(savedInfo) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Sync with local storage
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      setUserInfo(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      setUserInfo(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };
  const logout = () => {
    setUserInfo(null);
    setError(null);
  };
  return (
    <AuthContext.Provider
      value={{
        userInfo,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
