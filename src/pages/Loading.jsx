import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const Loading = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Force 3-second loading with ads
    const timer = setTimeout(() => {
      navigate('/results', { state: location.state });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>

      
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
          🤖 AI is Working Its Magic...
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Analyzing millions of high-performing titles to create yours
        </p>
      </div>

      {/* Loading Animation */}
      <div style={{ marginBottom: '40px' }}>
        <div className="ai-loader">
          <div className="brain">🧠</div>
          <div className="dots">
            <span>.</span><span>.</span><span>.</span>
          </div>
        </div>
      </div>



      {/* Progress Steps */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          padding: '20px',
          background: 'var(--success)',
          color: 'white',
          borderRadius: '12px'
        }}>
          ✓ Analyzing Topic
        </div>
        <div style={{
          padding: '20px',
          background: 'var(--primary)',
          color: 'white',
          borderRadius: '12px'
        }}>
          🔄 Generating Titles
        </div>
        <div style={{
          padding: '20px',
          background: 'var(--border)',
          color: 'var(--text-secondary)',
          borderRadius: '12px'
        }}>
          ⏳ Optimizing Results
        </div>
      </div>



      <style jsx>{`
        .ai-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          font-size: 2rem;
        }
        
        .brain {
          animation: pulse 1.5s infinite;
        }
        
        .dots span {
          animation: bounce 1.4s infinite;
          animation-delay: calc(var(--i) * 0.2s);
        }
        
        .dots span:nth-child(1) { --i: 0; }
        .dots span:nth-child(2) { --i: 1; }
        .dots span:nth-child(3) { --i: 2; }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Loading;