import { useState } from 'react';
import { FaGoogle, FaYoutube, FaWordpress } from 'react-icons/fa';

const PlatformPreview = ({ title }) => {
  const [activePreview, setActivePreview] = useState('google');
  
  const previews = {
    google: {
      icon: <FaGoogle />,
      name: 'Google Search',
      component: (
        <div className="google-preview">
          <div className="google-url">https://example.com/article</div>
          <div className="google-title">{title}</div>
          <div className="google-description">
            This comprehensive guide covers everything you need to know about the topic...
          </div>
        </div>
      )
    },
    youtube: {
      icon: <FaYoutube />,
      name: 'YouTube',
      component: (
        <div className="youtube-preview">
          <div className="youtube-thumbnail">
            <div className="youtube-duration">10:24</div>
          </div>
          <div className="youtube-info">
            <div className="youtube-title">{title}</div>
            <div className="youtube-meta">
              <div className="youtube-channel">Your Channel</div>
              <div className="youtube-stats">1.2M views • 2 days ago</div>
            </div>
          </div>
        </div>
      )
    },
    wordpress: {
      icon: <FaWordpress />,
      name: 'WordPress',
      component: (
        <div className="wordpress-preview">
          <div className="wordpress-header">
            <h1 className="wordpress-title">{title}</h1>
            <div className="wordpress-meta">
              <span>By Author Name</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )
    }
  };
  
  return (
    <div className="platform-preview">
      <div className="preview-tabs">
        {Object.entries(previews).map(([key, preview]) => (
          <button
            key={key}
            className={`preview-tab ${activePreview === key ? 'active' : ''}`}
            onClick={() => setActivePreview(key)}
          >
            {preview.icon}
            {preview.name}
          </button>
        ))}
      </div>
      
      <div className="preview-content">
        {previews[activePreview].component}
      </div>
    </div>
  );
};

export default PlatformPreview;