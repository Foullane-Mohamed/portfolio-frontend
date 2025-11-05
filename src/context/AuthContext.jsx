import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("jwtToken") || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("jwtToken", token);
    } else {
      sessionStorage.removeItem("jwtToken");
    }
  }, [token]);

  const login = (jwt) => {
    setToken(jwt);
    navigate("/admin/AdminDashboard");
  };

  const logout = () => {
    setToken(null);
    navigate("/admin/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
