import { Link } from "react-router-dom";

function AdminFooter() {
  return (
    <footer className="admin-footer">
      <p>Admin Tasks:</p>
      <Link to="/admin/album" className="footer-link-1">
        Add Album
      </Link>
      <Link to="/admin/users" className="footer-link-2">
        All Users
      </Link>
    </footer>
  );
}

export default AdminFooter;
