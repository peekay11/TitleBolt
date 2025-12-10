import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { platforms } from '../utils/titleGenerator';
import { generateTitlesWithAI } from '../utils/groqApi';
import { checkRateLimit, incrementUsage, getTimeUntilReset } from '../utils/rateLimiter';
import PlatformIcon from '../components/ui/PlatformIcon';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

import './Home.css';

const Home = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const rateLimit = checkRateLimit(isSignedIn);
    if (!rateLimit.allowed) {
      setError(`Free limit reached (${rateLimit.remaining}/5). Sign in for unlimited generations or try again in ${getTimeUntilReset(rateLimit.resetTime)} hours.`);
      setLoading(false);
      return;
    }
    
    try {
      const generated = await generateTitlesWithAI(topic);
      if (!isSignedIn) incrementUsage();
      // Redirect to Loading page first for maximum ad exposure
      navigate('/loading', { state: { titles: generated } });
    } catch (err) {
      setError('Failed to generate titles. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="container">
        <section className="hero">
          <h1 className="hero-title">
            Generate Click-Worthy Titles in <span className="gradient-text">Seconds</span>
          </h1>
          <p className="hero-subtitle">
            AI-powered title generation for YouTube, TikTok, Instagram, Books, Blogs & More
          </p>
          
          <div className="platforms-showcase">
            {platforms.map(platform => (
              <PlatformIcon key={platform.id} platform={platform} />
            ))}
          </div>

          <form onSubmit={handleGenerate} className="quick-generator">
            <Input 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your topic or keyword..."
              required
            />
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Titles'}
            </Button>
          </form>
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
        </section>


        
        <section className="features">
          <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.2rem' }}>
            🚀 Maximize Your Content's Potential
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px',
            marginBottom: '40px'
          }}>
            <div style={{
              padding: '30px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📊</div>
              <h3 style={{ marginBottom: '12px', color: 'var(--primary)' }}>Performance Analysis</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Get detailed insights on why your titles work and how to improve them</p>
            </div>
            <div style={{
              padding: '30px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎯</div>
              <h3 style={{ marginBottom: '12px', color: 'var(--success)' }}>AI Optimization</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Transform good titles into click magnets with AI-powered suggestions</p>
            </div>
            <div style={{
              padding: '30px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📥</div>
              <h3 style={{ marginBottom: '12px', color: 'var(--secondary)' }}>Export & Share</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Download your titles in multiple formats or share them instantly</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
