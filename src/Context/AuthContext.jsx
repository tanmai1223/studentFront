import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Call this after successful login to instantly update context
  const loginUser = (userData) => {
    setRole(userData.role);
    setUser(userData);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRole(res.data.role);
        setUser(res.data);
      } catch (err) {
        console.log("Auth error:", err);
        setRole(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ role, user, loading, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
