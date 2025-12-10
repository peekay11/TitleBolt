import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaChartLine, FaDownload, FaRefresh } from 'react-icons/fa';
import TitleCard from '../components/features/TitleCard';
import AdSlot from '../components/features/AdSlot';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.titles) {
      setTitles(location.state.titles);
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  const handlePreview = (title) => {
    navigate('/preview', { state: { title } });
  };

  const handleAnalyze = () => {
    navigate('/analysis', { state: { titles } });
  };

  const handleCompare = () => {
    navigate('/compare', { state: { titles } });
  };

  const handleOptimize = () => {
    navigate('/optimize', { state: { titles } });
  };

  const handleExport = () => {
    navigate('/export', { state: { titles } });
  };

  const generateMore = () => {
    setLoading(true);
    // Simulate generating more titles
    setTimeout(() => {
      const moreTitles = [
        "10 Secrets That Will Change Your Life Forever",
        "The Ultimate Guide to Success in 2025",
        "Why Everyone is Talking About This Trend"
      ];
      setTitles([...titles, ...moreTitles]);
      setLoading(false);
    }, 1500);
  };

  if (!titles.length && !loading) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>No titles found</h2>
        <button onClick={() => navigate('/')} className="btn-primary">
          Generate New Titles
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>

      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
          🎯 Your Generated Titles
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Here are your AI-powered titles ready to boost engagement
        </p>
      </div>



      <div style={{ display: 'grid', gap: '20px', marginBottom: '40px' }}>
        {titles.map((title, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <TitleCard title={title} />
            <button
              onClick={() => handlePreview(title)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                padding: '8px 12px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              👀 Preview
            </button>
          </div>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div className="spinner"></div>
          <p>Generating more titles...</p>
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
          onClick={handleAnalyze}
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
          <FaChartLine /> Analyze Performance
        </button>

        <button 
          onClick={handleCompare}
          style={{
            padding: '16px 24px',
            background: 'var(--success)',
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
          🏆 Compare Titles
        </button>

        <button 
          onClick={handleOptimize}
          style={{
            padding: '16px 24px',
            background: 'var(--primary-dark)',
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
          <FaArrowRight /> Optimize Titles
        </button>

        <button 
          onClick={generateMore}
          disabled={loading}
          style={{
            padding: '16px 24px',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '2px solid var(--border)',
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
          <FaRefresh /> Generate More
        </button>

        <button 
          onClick={handleExport}
          style={{
            padding: '16px 24px',
            background: 'var(--primary-dark)',
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
          <FaDownload /> Export & Save
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

export default Results;