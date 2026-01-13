import { Link } from 'react-router-dom';
import { IoFlash } from 'react-icons/io5';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <IoFlash className="footer-logo-icon" />
              <span className="footer-logo-text">TitleBolt</span>
            </div>
            <p>The ultimate AI-powered title generator for content creators worldwide.</p>
            <div className="social-links">
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="GitHub"><FaGithub /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Platforms</h4>
            <Link to="/youtube-title-generator">YouTube Titles</Link>
            <Link to="/tiktok-hook-generator">TikTok Hooks</Link>
            <Link to="/book-chapter-title-ideas">Book Titles</Link>
          </div>
          <div className="footer-section">
            <h4>Tools</h4>
            <Link to="/">Quick Generator</Link>
            <Link to="/generator">Advanced Generator</Link>
            <Link to="/analysis">Title Analysis</Link>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TitleBolt. All rights reserved. Made with ❤️ for creators.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
