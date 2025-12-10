import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaChartBar, FaEye, FaClock, FaArrowRight } from 'react-icons/fa';
import AdSlot from '../components/features/AdSlot';

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(0);

  useEffect(() => {
    if (location.state?.titles) {
      setTitles(location.state.titles);
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  const analysisData = [
    {
      metric: 'Click-Through Rate',
      score: 8.5,
      description: 'Strong emotional trigger words increase engagement',
      icon: <FaEye />
    },
    {
      metric: 'SEO Potential',
      score: 7.2,
      description: 'Good keyword density for search visibility',
      icon: <FaChartBar />
    },
    {
      metric: 'Readability',
      score: 9.1,
      description: 'Easy to read and understand at first glance',
      icon: <FaClock />
    }
  ];

  const handleOptimize = () => {
    navigate('/optimize', { state: { titles, selectedTitle: titles[selectedTitle] } });
  };

  const handleExport = () => {
    navigate('/export', { state: { titles } });
  };

  if (!titles.length) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>No titles to analyze</h2>
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
          📊 Title Performance Analysis
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Deep dive into what makes your titles effective
        </p>
      </div>

      {/* Title Selector */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px' }}>Select a title to analyze:</h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {titles.map((title, index) => (
            <div
              key={index}
              onClick={() => setSelectedTitle(index)}
              style={{
                padding: '16px',
                background: selectedTitle === index ? 'var(--primary)' : 'var(--bg-card)',
                color: selectedTitle === index ? 'white' : 'var(--text-primary)',
                border: '2px solid',
                borderColor: selectedTitle === index ? 'var(--primary)' : 'var(--border)',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {title}
            </div>
          ))}
        </div>
      </div>



      {/* Analysis Results */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '1.8rem' }}>
          Analysis for: "{titles[selectedTitle]}"
        </h3>
        
        <div style={{ display: 'grid', gap: '20px', marginBottom: '30px' }}>
          {analysisData.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '24px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}
            >
              <div style={{ 
                fontSize: '2rem', 
                color: 'var(--primary)',
                minWidth: '60px',
                textAlign: 'center'
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '8px', fontSize: '1.3rem' }}>
                  {item.metric}
                </h4>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: '100px',
                    height: '8px',
                    background: 'var(--border)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${item.score * 10}%`,
                      height: '100%',
                      background: item.score > 8 ? 'var(--success)' : item.score > 6 ? '#f59e0b' : '#ef4444',
                      borderRadius: '4px'
                    }} />
                  </div>
                  <span style={{ 
                    fontWeight: '600',
                    color: item.score > 8 ? 'var(--success)' : item.score > 6 ? '#f59e0b' : '#ef4444'
                  }}>
                    {item.score}/10
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Insights */}
        <div style={{
          padding: '24px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          marginBottom: '30px'
        }}>
          <h4 style={{ marginBottom: '16px', fontSize: '1.4rem' }}>
            💡 Key Insights
          </h4>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            display: 'grid',
            gap: '12px'
          }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: 'var(--success)', marginTop: '2px' }}>✓</span>
              <span>Strong emotional words like "ultimate" and "secrets" drive clicks</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: 'var(--success)', marginTop: '2px' }}>✓</span>
              <span>Number-based titles (like "10 ways") perform 73% better</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: '#f59e0b', marginTop: '2px' }}>⚠</span>
              <span>Consider adding year "2025" for better SEO performance</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: '#f59e0b', marginTop: '2px' }}>⚠</span>
              <span>Title length could be optimized for better mobile display</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        <button 
          onClick={handleOptimize}
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
          <FaArrowRight /> Optimize This Title
        </button>

        <button 
          onClick={handleExport}
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
          Export Analysis
        </button>

        <button 
          onClick={() => navigate('/results', { state: { titles } })}
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
          Back to Results
        </button>
      </div>


    </div>
  );
};

export default Analysis;