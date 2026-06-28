import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function GuestRoute({ children }) {
  const { user, authLoading, isAuthenticated } = useAuth();

  if (authLoading) {
    return <div className="page-loading">Loading...</div>;
  }

  if (isAuthenticated) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default GuestRoute;
