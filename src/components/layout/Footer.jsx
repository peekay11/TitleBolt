import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>TitleBolt</h3>
              <p>AI-powered title generation for creators</p>
            </div>
            <div className="footer-section">
              <h4>Platforms</h4>
              <Link to="/youtube-title-generator">YouTube</Link>
              <Link to="/tiktok-hook-generator">TikTok</Link>
              <Link to="/book-chapter-title-ideas">Books</Link>
            </div>
            <div className="footer-section">
              <h4>Tools</h4>
              <Link to="/">Quick Generator</Link>
              <Link to="/generator">Advanced Generator</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date(Date.now()).getFullYear()} TitleBolt. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
