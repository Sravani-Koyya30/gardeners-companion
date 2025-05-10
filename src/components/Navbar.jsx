import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebaseConfig";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="logo">🌱 Gardener's Companion</h1>
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      <ul className={`navLinks ${menuOpen ? "show" : ""}`}>
        <li><Link to="/">Home</Link></li>
        {!user ? (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/plant-database">Plant Database</Link></li>
            <li><Link to="/plant-care">Plant Care</Link></li>
            <li><Link to="/seasonal-plants">Seasonal Plants</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;