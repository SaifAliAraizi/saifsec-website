import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../data/Data";
import { useSite } from "../../context/SiteContext";

function NavBar() {
  const { site } = useSite();
  const logoUrl = site?.logo || "/assets/logo.png"; // API already returns full URL
  return (
    <header className="navbar">
      <div className="navbar-logo-container">
        <NavLink to="/"><img src={logoUrl} alt={site?.brand_name || "SaifSec"} className="navbar-logo" /></NavLink>
      </div>
      <nav className="navbar-links">
        {navLinks.map((item) => (
          <NavLink key={item.id} to={item.path} className={({ isActive }) => isActive ? "nav-link active-nav-link" : "nav-link"}>{item.label}</NavLink>
        ))}
      </nav>
    </header>
  );
}
export default NavBar;