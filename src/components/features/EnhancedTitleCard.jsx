import { useState } from 'react';
import { FaCopy, FaShare, FaHeart, FaRegHeart, FaEdit } from 'react-icons/fa';
import SEOScoreAnalyzer from './SEOScoreAnalyzer';
import PlatformPreview from './PlatformPreview';
import RefineToolkit from './RefineToolkit';

const EnhancedTitleCard = ({ 
  title: initialTitle, 
  onCopy, 
  onShare, 
  onFavorite, 
  isFavorite, 
  platform,
  category 
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [showPreview, setShowPreview] = useState(false);
  const [showRefineTools, setShowRefineTools] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(title);
    onCopy?.(title);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this title idea',
        text: title
      });
    }
    onShare?.(title);
  };
  
  const handleFavorite = () => {
    onFavorite?.(title);
  };
  
  const handleTitleUpdate = (newTitle) => {
    setTitle(newTitle);
  };
  
  return (
    <div className="enhanced-title-card">
      <div className="title-header">
        <div className="title-content">
          <h3 className="title-text">{title}</h3>
          <div className="title-meta">
            <span className="title-length">{title.length} chars</span>
            <span className="title-platform">{platform}</span>
          </div>
        </div>
        
        <div className="title-score">
          <SEOScoreAnalyzer title={title} />
        </div>
      </div>
      
      <div className="title-actions">
        <div className="primary-actions">
          <button 
            className="action-btn copy-btn" 
            onClick={handleCopy}
            title="Copy to clipboard"
          >
            <FaCopy />
            Copy
          </button>
          
          <button 
            className="action-btn share-btn" 
            onClick={handleShare}
            title="Share title"
          >
            <FaShare />
            Share
          </button>
          
          <button 
            className={`action-btn favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={handleFavorite}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
            {isFavorite ? 'Saved' : 'Save'}
          </button>
        </div>
        
        <div className="secondary-actions">
          <button 
            className={`action-btn preview-btn ${showPreview ? 'active' : ''}`}
            onClick={() => setShowPreview(!showPreview)}
            title="Preview on platforms"
          >
            Preview
          </button>
          
          <button 
            className={`action-btn refine-btn ${showRefineTools ? 'active' : ''}`}
            onClick={() => setShowRefineTools(!showRefineTools)}
            title="Refine this title"
          >
            <FaEdit />
            Refine
          </button>
        </div>
      </div>
      
      {showPreview && (
        <div className="title-preview-section">
          <PlatformPreview title={title} />
        </div>
      )}
      
      {showRefineTools && (
        <div className="title-refine-section">
          <RefineToolkit 
            title={title}
            onTitleUpdate={handleTitleUpdate}
            platform={platform}
            category={category}
          />
        </div>
      )}
    </div>
  );
};

export default EnhancedTitleCard;