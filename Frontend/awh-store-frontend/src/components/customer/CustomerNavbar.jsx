import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function CustomerNavbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <nav className="customer-navbar">
      <Link to="/" className="navbar-logo">
        AWH Store
      </Link>

      <div className="navbar-menu">
        <Link to="/">Products</Link>

        {isAuthenticated && user?.role === "customer" && (
          <Link to="/orders">My Orders</Link>
        )}

        {isAuthenticated && user?.role === "admin" && (
          <Link to="/admin/dashboard">Admin Dashboard</Link>
        )}

        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-primary">
              Register
            </Link>
          </>
        ) : (
          <button className="btn-primary" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default CustomerNavbar;
