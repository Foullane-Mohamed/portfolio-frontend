import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
