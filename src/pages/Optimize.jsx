import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLightbulb, FaRocket, FaDownload, FaArrowLeft, FaCog, FaChartLine } from 'react-icons/fa';
import AdSlot from '../components/features/AdSlot';
import TitleCard from '../components/features/TitleCard';

const Optimize = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]);
  const [optimizedTitles, setOptimizedTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');

  useEffect(() => {
    if (location.state?.titles) {
      setTitles(location.state.titles);
      setSelectedTitle(location.state.selectedTitle || location.state.titles[0]);
      generateOptimizations(location.state.selectedTitle || location.state.titles[0]);
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  const generateOptimizations = (title) => {
    setLoading(true);
    // Simulate AI optimization
    setTimeout(() => {
      const optimizations = [
        `${title} - Complete Guide 2025`,
        `${title} (Step-by-Step Tutorial)`,
        `${title} + Free Bonus Tips`,
        `REVEALED: ${title}`,
        `${title} - What Experts Don't Tell You`
      ];
      setOptimizedTitles(optimizations);
      setLoading(false);
    }, 2000);
  };

  const optimizationTips = [
    {
      icon: <FaLightbulb />,
      title: 'Add Numbers',
      description: 'Titles with numbers get 36% more clicks',
      example: '"5 Ways to..." or "Top 10..."'
    },
    {
      icon: <FaRocket />,
      title: 'Use Power Words',
      description: 'Words like "Ultimate", "Secret", "Proven" boost engagement',
      example: '"Ultimate Guide" or "Secret Method"'
    },
    {
      icon: <FaLightbulb />,
      title: 'Create Urgency',
      description: 'Time-sensitive language increases click rates',
      example: '"Before 2025" or "Right Now"'
    },
    {
      icon: <FaRocket />,
      title: 'Ask Questions',
      description: 'Question-based titles spark curiosity',
      example: '"Why Do..." or "What If..."'
    }
  ];

  const handleExport = () => {
    navigate('/export', { state: { titles: [...titles, ...optimizedTitles] } });
  };

  if (!titles.length) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>No titles to optimize</h2>
        <button onClick={() => navigate('/')} className="btn-primary">
          Generate New Titles
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>

      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <FaCog style={{ color: 'var(--primary)' }} /> Title Optimization Lab
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Transform your titles into click magnets with AI-powered optimization
        </p>
      </div>

      {/* Original Title */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '16px' }}>Original Title:</h3>
        <div style={{
          padding: '20px',
          background: 'var(--bg-card)',
          border: '2px solid var(--border)',
          borderRadius: '12px',
          fontSize: '1.2rem',
          fontWeight: '600'
        }}>
          {selectedTitle}
        </div>
      </div>



      {/* Optimization Tips */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaLightbulb style={{ color: 'var(--primary)' }} /> Optimization Strategies
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px' 
        }}>
          {optimizationTips.map((tip, index) => (
            <div
              key={index}
              style={{
                padding: '20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                textAlign: 'center'
              }}
            >
              <div style={{ 
                fontSize: '2rem', 
                color: 'var(--primary)',
                marginBottom: '12px'
              }}>
                {tip.icon}
              </div>
              <h4 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>
                {tip.title}
              </h4>
              <p style={{ 
                color: 'var(--text-secondary)', 
                marginBottom: '8px',
                fontSize: '0.9rem'
              }}>
                {tip.description}
              </p>
              <code style={{
                background: 'var(--bg-dark)',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                color: 'var(--primary)'
              }}>
                {tip.example}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Optimized Titles */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaRocket style={{ color: 'var(--primary)' }} /> AI-Optimized Versions
        </h3>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="spinner"></div>
            <p>AI is optimizing your title...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {optimizedTitles.map((title, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <TitleCard title={title} />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'var(--success)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  +{Math.floor(Math.random() * 40 + 20)}% CTR
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Performance Comparison */}
      {!loading && optimizedTitles.length > 0 && (
        <div style={{
          padding: '24px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          marginBottom: '40px'
        }}>
          <h4 style={{ marginBottom: '16px', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaChartLine style={{ color: 'var(--primary)' }} /> Expected Performance Boost
          </h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: '700',
                color: 'var(--success)',
                marginBottom: '8px'
              }}>
                +35%
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                Click-Through Rate
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: '700',
                color: 'var(--primary)',
                marginBottom: '8px'
              }}>
                +28%
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                Engagement Rate
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: '700',
                color: 'var(--secondary)',
                marginBottom: '8px'
              }}>
                +42%
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                Social Shares
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        <button 
          onClick={handleExport}
          style={{
            padding: '16px 24px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <FaDownload /> Export All Titles
        </button>

        <button 
          onClick={() => generateOptimizations(selectedTitle)}
          disabled={loading}
          style={{
            padding: '16px 24px',
            background: 'var(--success)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'transform 0.2s',
            opacity: loading ? 0.6 : 1
          }}
          onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <FaRocket /> Re-optimize
        </button>

        <button 
          onClick={() => navigate('/analysis', { state: { titles } })}
          style={{
            padding: '16px 24px',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '2px solid var(--border)',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <FaArrowLeft /> Back to Analysis
        </button>
      </div>



      <style jsx>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--border);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Optimize;