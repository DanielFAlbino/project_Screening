import React, { createContext, useCallback, useState } from "react";
import PropTypes from "prop-types";
import AuthService from "../Services/auth";
import { clearJwt, setJwt } from "../Utils/jwt";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null,
  });

  const login = useCallback(async (payload) => {
    const { token, user } = await AuthService.login(payload);

    if (token && user) {
      setJwt(token);
      setUserInfo({
        isUserLoggedIn: true,
        user,
      });
    }
  }, []);

  const logout = useCallback(() => {
    clearJwt();
    setUserInfo({
      isUserLoggedIn: false,
      user: null,
    });
  }, []);

  const updateUserInfo = async () => {
    const user = await AuthService.me();

    if (!user) {
      return logout();
    }

    setUserInfo({
      isUserLoggedIn: true,
      user,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        userInfo,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
