import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: { role: "user", name: "", id: "" },
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = (props) => {
  const token = localStorage.getItem("token");

  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [user, setUser] = useState({ role: "user", name: "", id: "" });

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = jwtDecode(token);
      setUser({
        name: decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ],
        id: decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ],
        role: decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      });
    } else {
      setIsAuthenticated(false);
      setUser({ role: "user", name: "", id: "" });
    }
  }, [isAuthenticated, token]);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
