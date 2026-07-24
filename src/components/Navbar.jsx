import { useState } from "react";
import { generateResumePDF } from "./utils/generateResume";

const links = ["Home", "Projects", "Certifications", "Contact Me"];

export default function Navbar({ active = "Home" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="logo">{"</>"}</div>

        <ul className="navbar-links">
          {links.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase().replace(/\s/g, "")}`} className={active === link ? "active" : ""}>
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn btn-primary resume-btn" onClick={generateResumePDF}>
            Resume<span className="dl-icon">⬇</span>
          </button>
          <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(/\s/g, "")}`}
            onClick={() => setOpen(false)}
            style={{ color: active === link ? "#7c74f1" : "#f2f2f5", textDecoration: "none", fontWeight: 600 }}
          >
            {link}
          </a>
        ))}
      </div>
    </>
  );
}