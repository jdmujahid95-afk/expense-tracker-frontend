import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-primary px-4">
      <span className="navbar-brand">Expense Tracker</span>
      <div>
        {user ? (
          <button className="btn btn-light btn-sm" onClick={logout}>Logout</button>
        ) : (
          <>
            <Link className="btn btn-light btn-sm me-2" to="/login">Login</Link>
            <Link className="btn btn-light btn-sm" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;