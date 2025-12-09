import { useState } from 'react';
import { MdStar, MdStarBorder, MdContentCopy, MdCheck, MdShare } from 'react-icons/md';
import Button from '../ui/Button';
import { saveFavorite, removeFavorite, isFavorite } from '../../utils/storage';
import './TitleCard.css';

const TitleCard = ({ title }) => {
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite(title));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(title);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TitleBolt - Generated Title',
          text: title,
          url: window.location.href
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      handleCopy();
    }
  };

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(title);
      setFavorite(false);
    } else {
      saveFavorite(title);
      setFavorite(true);
    }
  };

  return (
    <div className="title-card">
      <div className="title-text">{title}</div>
      <div className="title-meta">
        <span className="char-count">{title.length} chars</span>
        <div className="title-actions">
          <Button variant="secondary" size="sm" onClick={handleFavorite}>
            {favorite ? <MdStar /> : <MdStarBorder />}
          </Button>
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            {copied ? <><MdCheck /> Copied</> : <><MdContentCopy /> Copy</>}
          </Button>
          <Button variant="secondary" size="sm" onClick={handleShare}>
            <MdShare />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
