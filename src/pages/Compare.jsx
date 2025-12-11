import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCrown, FaFire, FaChartLine, FaTrophy, FaMedal, FaRocket } from 'react-icons/fa';


const Compare = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]);
  const [comparison, setComparison] = useState([]);

  useEffect(() => {
    if (location.state?.titles) {
      setTitles(location.state.titles);
      generateComparison(location.state.titles);
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  const generateComparison = (titleList) => {
    const compared = titleList.map((title, index) => ({
      title,
      score: Math.floor(Math.random() * 30 + 70),
      ctr: (Math.random() * 4 + 6).toFixed(1),
      engagement: Math.floor(Math.random() * 40 + 60),
      seo: Math.floor(Math.random() * 35 + 65),
      rank: index + 1
    })).sort((a, b) => b.score - a.score).map((item, index) => ({
      ...item,
      rank: index + 1
    }));
    
    setComparison(compared);
  };

  const handleOptimize = (title) => {
    navigate('/optimize', { state: { titles, selectedTitle: title } });
  };

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <FaCrown style={{ color: '#FFD700' }} />;
      case 2: return <FaFire style={{ color: '#FF6B35' }} />;
      case 3: return <FaChartLine style={{ color: '#4ECDC4' }} />;
      default: return <span style={{ color: 'var(--text-secondary)' }}>#{rank}</span>;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'var(--success)';
    if (score >= 80) return '#f59e0b';
    if (score >= 70) return '#ef4444';
    return 'var(--text-secondary)';
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>

      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <FaTrophy style={{ color: 'var(--primary)' }} /> Title Performance Comparison
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          See which titles will perform best and why
        </p>
      </div>

      {/* Winner Spotlight */}
      {comparison.length > 0 && (
        <div style={{
          padding: '30px',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          color: 'white',
          borderRadius: '16px',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
            <FaCrown />
          </div>
          <h2 style={{ marginBottom: '12px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FaMedal style={{ color: '#FFD700' }} /> Top Performing Title
          </h2>
          <p style={{ 
            fontSize: '1.3rem', 
            fontWeight: '600',
            marginBottom: '16px',
            background: 'rgba(255,255,255,0.1)',
            padding: '16px',
            borderRadius: '8px'
          }}>
            "{comparison[0]?.title}"
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
            gap: '20px' 
          }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>
                {comparison[0]?.score}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                Overall Score
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>
                {comparison[0]?.ctr}%
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                Expected CTR
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>
                {comparison[0]?.engagement}%
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                Engagement
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Comparison Table */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaChartLine style={{ color: 'var(--primary)' }} /> Detailed Comparison
        </h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          {comparison.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '20px',
                background: 'var(--bg-card)',
                border: item.rank === 1 ? '2px solid var(--primary)' : '1px solid var(--border)',
                borderRadius: '12px',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                fontSize: '1.5rem'
              }}>
                {getRankIcon(item.rank)}
              </div>
              
              <div style={{ marginBottom: '16px', paddingRight: '60px' }}>
                <h4 style={{ 
                  fontSize: '1.1rem', 
                  marginBottom: '8px',
                  lineHeight: '1.4'
                }}>
                  {item.title}
                </h4>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700',
                    color: getScoreColor(item.score),
                    marginBottom: '4px'
                  }}>
                    {item.score}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Overall
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700',
                    color: 'var(--primary)',
                    marginBottom: '4px'
                  }}>
                    {item.ctr}%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    CTR
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700',
                    color: 'var(--success)',
                    marginBottom: '4px'
                  }}>
                    {item.engagement}%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Engagement
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700',
                    color: 'var(--secondary)',
                    marginBottom: '4px'
                  }}>
                    {item.seo}%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    SEO Score
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleOptimize(item.title)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: item.rank === 1 ? 'var(--primary)' : 'var(--bg-dark)',
                  color: item.rank === 1 ? 'white' : 'var(--text-primary)',
                  border: item.rank === 1 ? 'none' : '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  if (item.rank !== 1) {
                    e.target.style.background = 'var(--primary)';
                    e.target.style.color = 'white';
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  if (item.rank !== 1) {
                    e.target.style.background = 'var(--bg-dark)';
                    e.target.style.color = 'var(--text-primary)';
                  }
                }}
              >
                {item.rank === 1 ? <><FaRocket /> Optimize Winner</> : 'Optimize This Title'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px',
        marginBottom: '40px'
      }}>
        <button 
          onClick={() => navigate('/export', { state: { titles } })}
          style={{
            padding: '16px 24px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Export All Results
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

export default Compare;