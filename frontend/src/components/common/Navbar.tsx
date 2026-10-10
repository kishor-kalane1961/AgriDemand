import { Link, NavLink } from 'react-router-dom'
import { Sprout, Menu, X } from 'lucide-react'
import { useState } from 'react'
import './Navbar.css'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="agri-navbar">
      <div className="agri-navbar-container">
        <Link to="/" className="agri-navbar-brand" onClick={closeMenu}>
          <span className="agri-navbar-logo">
            <Sprout size={27} />
          </span>

          <span className="agri-navbar-brand-text">
            <span className="agri-navbar-title">
              AgriDemand <span className="agri-navbar-ai">AI</span>
            </span>
            <span className="agri-navbar-subtitle">
              Smart Demand Intelligence
            </span>
          </span>
        </Link>

        <button
          type="button"
          className="agri-navbar-menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <nav className={`agri-navbar-links ${menuOpen ? 'is-open' : ''}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <a href="/#features" onClick={closeMenu}>
            Features
          </a>

          <a href="/#how-it-works" onClick={closeMenu}>
            How It Works
          </a>

          <a href="/#about" onClick={closeMenu}>
            About
          </a>

          <a href="/#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>

        <div className={`agri-navbar-actions ${menuOpen ? 'is-open' : ''}`}>
          <Link to="/login" className="agri-navbar-login" onClick={closeMenu}>
            Login
          </Link>

          <Link
            to="/register"
            className="agri-navbar-cta"
            onClick={closeMenu}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
