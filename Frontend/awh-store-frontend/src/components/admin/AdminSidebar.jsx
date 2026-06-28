import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminSidebar() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">AWH Admin</div>

      <nav className="admin-menu">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/products">Products</Link>
      </nav>

      <button className="admin-logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;
