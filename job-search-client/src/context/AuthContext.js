import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

  const isMatch =
    router.pathname.startsWith("/signin") ||
    router.pathname.startsWith("/signup") ||
    router.pathname.startsWith("/search") ||
    router.pathname.startsWith("/jobs");

  const isTokenExpired = (token) => {
    const user = jwt.decode(token);
    const expirationTime = user.exp * 1000;
    const currentTime = new Date().getTime();

    return currentTime > expirationTime;
  };

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (!token || isTokenExpired(token)) {
      Cookies.remove("jwt");
      setUser(null);
      setIsAuthenticated(false);

      !isMatch && router.push("/jobs"); // Redirect to jobs page if not on public pages
    } else {
      setUser(jwt.decode(token));
      setIsAuthenticated(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, router]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
