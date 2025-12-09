import { FaYoutube, FaTiktok, FaInstagram, FaBook, FaBlog, FaXTwitter } from 'react-icons/fa6';
import './PlatformIcon.css';

const icons = {
  youtube: FaYoutube,
  tiktok: FaTiktok,
  instagram: FaInstagram,
  book: FaBook,
  blog: FaBlog,
  twitter: FaXTwitter
};

const PlatformIcon = ({ platform, selected, onClick }) => {
  const Icon = icons[platform.id];
  
  return (
    <div 
      className={`platform-icon ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <Icon className="platform-icon-svg" />
      <span className="platform-name">{platform.name}</span>
    </div>
  );
};

export default PlatformIcon;
