import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { IoFlash } from 'react-icons/io5';
import { MdLightMode, MdDarkMode, MdMenu, MdClose } from 'react-icons/md';
import './Header.css';

const Header = () => {
  const { isSignedIn } = useUser();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo" onClick={closeMenu}>
            <IoFlash className="logo-icon" />
            <span className="logo-text">TitleBolt</span>
          </Link>
          
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <MdClose /> : <MdMenu />}
          </button>
          
          <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
            {isSignedIn && <Link to="/generator" className="nav-link" onClick={closeMenu}>Advanced</Link>}
            <Link to="/youtube-title-generator" className="nav-link" onClick={closeMenu}>YouTube</Link>
            <Link to="/tiktok-hook-generator" className="nav-link" onClick={closeMenu}>TikTok</Link>
            <Link to="/book-chapter-title-ideas" className="nav-link" onClick={closeMenu}>Books</Link>
            
            <div className="nav-actions">
              <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
              </button>
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <button className="auth-btn" onClick={closeMenu}>Sign In</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="auth-btn auth-btn-primary" onClick={closeMenu}>Sign Up</button>
                  </SignUpButton>
                </>
              ) : (
                <UserButton afterSignOutUrl="/" />
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
