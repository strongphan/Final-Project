import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const RequiredAuth = (props) => {
  const { children } = props;
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default RequiredAuth;
