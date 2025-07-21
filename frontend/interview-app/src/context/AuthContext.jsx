import React, { createContext, useReducer, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 > Date.now()) {
                dispatch({ type: 'LOGIN', payload: { user, token } });
            } else {
                logout(); // Token expired
            }
        } catch (error) {
            console.error("Invalid token:", error);
            logout();
        }
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    // Store everything except the token in the user object
    const { token, ...user } = userData;
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN', payload: { user, token: userData.token } });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;