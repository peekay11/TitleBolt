import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { IoFlash } from 'react-icons/io5';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import './Header.css';

const Header = () => {
  const { isSignedIn } = useUser();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="header">
        <div className="container">
          <nav className="nav">
            <Link to="/" className="logo">
              <IoFlash className="logo-icon" />
              <span className="logo-text">TitleBolt</span>
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              {isSignedIn && <Link to="/generator" className="nav-link">Advanced</Link>}
              <Link to="/youtube-title-generator" className="nav-link">YouTube</Link>
              <Link to="/tiktok-hook-generator" className="nav-link">TikTok</Link>
              <Link to="/book-chapter-title-ideas" className="nav-link">Books</Link>
              <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                {theme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
              </button>
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <button className="auth-btn">Sign In</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="auth-btn auth-btn-primary">Sign Up</button>
                  </SignUpButton>
                </>
              ) : (
                <UserButton afterSignOutUrl="/" />
              )}
            </div>
          </nav>
        </div>
      </header>
  );
};

export default Header;
