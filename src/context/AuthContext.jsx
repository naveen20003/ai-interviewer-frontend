"use client";

import {
  useContext,
  createContext,
  useEffect,
  useState,
} from "react";

import { tokenStore } from "@/lib/tokenStore";
import api from "@/lib/api";
import { signOut } from "next-auth/react";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------
  // Refresh access token
  // --------------------------------

  const refreshAccessToken = async () => {
    try {
      const response = await api.post(
        "/users/refresh",
        {},
        {
          withCredentials: true,
        }
      );

      const newAccessToken =
        response.data?.accessToken;

      if (!newAccessToken) {
        throw new Error(
          "No access token returned from refresh"
        );
      }

      tokenStore.setToken(newAccessToken);
      setAccessToken(newAccessToken);

      return newAccessToken;

    } catch (error) {
      tokenStore.clearToken();
      setAccessToken(null);

      return null;
    }
  };


  // --------------------------------
  // Login using backend access token
  // --------------------------------

  const loginWithAccessToken = (newAccessToken) => {
    if (!newAccessToken) {
      return false;
    }

    tokenStore.setToken(newAccessToken);
    setAccessToken(newAccessToken);

    return true;
  };


  // --------------------------------
  // Restore existing backend session
  // --------------------------------

  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      try {
        const token = await refreshAccessToken();

        if (!mounted) {
          return;
        }

        if (token) {
          console.log("Backend session restored");
        } else {
          console.log("No backend session found");
        }

      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      mounted = false;
    };
  }, []);


  // --------------------------------
  // Logout
  // --------------------------------

  const logOut = async () => {
    try {
      await api.post(
        "/users/logout",
        {},
        {
          withCredentials: true,
        }
      );

    } catch (error) {
      console.error(
        "Logout error:",
        error
      );

    } finally {
        // Clear frontend access token
        tokenStore.clearToken();
        setAccessToken(null);

        // Logout from NextAuth
        await signOut({
            redirect: false,
        });
    }

  };


  return (
    <AuthContext.Provider
      value={{
        accessToken,
        loading,
        refreshAccessToken,
        loginWithAccessToken,
        logOut,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}

