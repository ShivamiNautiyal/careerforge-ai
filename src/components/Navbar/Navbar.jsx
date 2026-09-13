import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>CareerForge AI</h2>
      </div>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/resume-builder">Resume Builder</Link>
        <Link to="/portfolio-builder">Portfolio Builder</Link>
        <Link to="/resume-analyzer">Resume Analyzer</Link>
        <Link to="/portfolio-analyzer">Portfolio Analyzer</Link>
        <Link to="/interview-prep">Interview Prep</Link>
        <Link to="/code-explainer">Code Explainer</Link>
      </div>
    </nav>
  );
}

export default Navbar;