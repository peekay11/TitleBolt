import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlay, FaEye, FaThumbsUp, FaShare } from 'react-icons/fa';


const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTitle, setSelectedTitle] = useState('');
  const [previewData, setPreviewData] = useState({});

  useEffect(() => {
    if (location.state?.title) {
      setSelectedTitle(location.state.title);
      // Simulate preview data
      setPreviewData({
        views: Math.floor(Math.random() * 500000) + 100000,
        likes: Math.floor(Math.random() * 25000) + 5000,
        comments: Math.floor(Math.random() * 2500) + 500,
        shares: Math.floor(Math.random() * 1000) + 200,
        ctr: (Math.random() * 5 + 8).toFixed(1)
      });
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleContinue = () => {
    navigate('/analysis', { state: { titles: [selectedTitle] } });
  };

  const mockPlatforms = [
    { name: 'YouTube', color: '#FF0000', icon: '📺' },
    { name: 'TikTok', color: '#000000', icon: '🎵' },
    { name: 'Instagram', color: '#E4405F', icon: '📸' },
    { name: 'Twitter', color: '#1DA1F2', icon: '🐦' }
  ];

  return (
    <div className="container" style={{ padding: '40px 20px' }}>

      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
          👀 Title Preview Simulator
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          See how your title performs across different platforms
        </p>
      </div>

      {/* Platform Previews */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        {mockPlatforms.map((platform, index) => (
          <div
            key={platform.name}
            style={{
              padding: '20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              marginBottom: '16px',
              color: platform.color,
              fontWeight: '600'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{platform.icon}</span>
              {platform.name}
            </div>
            
            <div style={{
              background: '#000',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '12px',
              position: 'relative',
              minHeight: '120px'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '2rem'
              }}>
                <FaPlay />
              </div>
            </div>
            
            <h4 style={{ 
              fontSize: '0.9rem', 
              marginBottom: '8px',
              lineHeight: '1.3'
            }}>
              {selectedTitle}
            </h4>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)'
            }}>
              <span><FaEye /> {(previewData.views / 1000).toFixed(0)}K</span>
              <span><FaThumbsUp /> {(previewData.likes / 1000).toFixed(0)}K</span>
              <span><FaShare /> {previewData.shares}</span>
            </div>
          </div>
        ))}
      </div>



      {/* Performance Metrics */}
      <div style={{
        padding: '24px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        marginBottom: '40px'
      }}>
        <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>
          📈 Predicted Performance
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '20px' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: '700',
              color: 'var(--primary)',
              marginBottom: '8px'
            }}>
              {previewData.ctr}%
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Click-Through Rate
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: '700',
              color: 'var(--success)',
              marginBottom: '8px'
            }}>
              {Math.floor(previewData.views / 1000)}K
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Expected Views
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: '700',
              color: 'var(--secondary)',
              marginBottom: '8px'
            }}>
              {Math.floor(previewData.likes / 1000)}K
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Engagement
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <button 
          onClick={handleContinue}
          style={{
            padding: '20px 40px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Continue to Analysis →
        </button>
      </div>


    </div>
  );
};

export default Preview;