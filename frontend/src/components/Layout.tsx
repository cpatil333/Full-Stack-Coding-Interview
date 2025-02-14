import { Outlet, Link } from "react-router-dom";
import "../styles/Navbar.css"

const Layout = () => {
  return (
    <div style={{ display: "flex", height: "90vh" }}>
      {/* Sidebar */}
      <nav>
        <h2>Sidebar Menu</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/hero-section" style={{ color: "#ecf0f1", textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/add-notes"
              style={{ color: "#ecf0f1", textDecoration: "none" }}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              style={{ color: "#ecf0f1", textDecoration: "none" }}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem" }}>
        <Outlet /> {/* Dynamic content will be rendered here */}
      </main>
    </div>
  );
};

export default Layout;
