import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("@context-contactshub:token");

      if (token) {
        try {
          api.defaults.headers.authorization = `Bearer ${token}`;

          const { data } = await api.get("/profile");

          setUser(data);
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  const login = async (data) => {
    const response = await api.post("/sessions", data);
    const { user: userResponse, token } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    setUser(userResponse);
    localStorage.setItem("@context-contactshub:token", token);

    navigate("/dashboard", { replace: true });
  };

  const registerFunc = async (data) => {
    await api.post("/users", data);

    navigate("/login", { replace: true });
  };

  return (
    <UserContext.Provider
      value={{ user, login, registerFunc, loading, contact, setContact }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
