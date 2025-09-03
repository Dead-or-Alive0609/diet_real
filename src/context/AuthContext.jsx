import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // localStorage에 토큰 있으면 자동 로그인 처리
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token) {
      setIsAuthenticated(true);
      setUser({ email });
    }
  }, []);

  // 로그인 API
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      setIsAuthenticated(true);
      setUser({ email: data.email, username: data.username });
      alert("로그인 성공");
      return true;
    } catch (err) {
      alert("로그인 실패: " + (err.response?.data?.message || err.message));
      return false;
    }
  };

  // 회원가입 API
  const signup = async (username, email, password) => {
    try {
      await api.post("/auth/signup", { username, email, password });
      alert("회원가입 성공! 로그인해주세요.");
      return true;
    } catch (err) {
      alert("회원가입 실패: " + (err.response?.data?.message || err.message));
      return false;
    }
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
