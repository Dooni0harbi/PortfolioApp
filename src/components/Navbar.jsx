import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // <-- make sure you create this file

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <div className="bubble"><Link to="/"><li>Home</li></Link></div>
        <div className="bubble"><Link to="/About"><li>About</li></Link></div>
        <div className="bubble"><Link to="/MyProjects"><li>My Projects</li></Link></div>
        <div className="bubble"><Link to="/Contact"><li>Contact</li></Link></div>
        
      </ul>
    </nav>
  );
};

export default Navbar;
